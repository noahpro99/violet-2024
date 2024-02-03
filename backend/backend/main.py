from datetime import date
from enum import Enum
import secrets
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasicCredentials
import joblib
import pandas as pd
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble._forest import RandomForestClassifier  # Importing for type hint
from typing import Annotated, Type
import uvicorn
from pydantic import BaseModel
import contextlib
import shap

from pymongo.database import Database

from auth import get_user
from db import get_mongo_db

MEAN_DATA_VALUES = {
    "AGE": 50,
    "SystolicBP": 100,
    "DiastolicBP": 100,
    "BS": 100,
    "BodyTemp": 100,
    "HeartRate": 100,
}


def load_model() -> Type[RandomForestClassifier]:
    if not (os.path.exists("./models/maternal-health-risk.joblib")):
        raise FileNotFoundError("Model not found")
    return joblib.load("./models/maternal-health-risk.joblib")


@contextlib.asynccontextmanager  # type: ignore
async def lifespan(app: FastAPI) -> None:  # type: ignore
    app.state.model = load_model()
    app.state.explainer = shap.TreeExplainer(app.state.model)
    yield  # type: ignore


app = FastAPI(
    title="Maternal Health Risk Prediction API", lifespan=lifespan, docs_url="/"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class DataInput(BaseModel):
    Age: int
    SystolicBP: int
    DiastolicBP: int
    BS: float
    BodyTemp: float
    HeartRate: int


class InputResultOutcome(str, Enum):
    low = "low"
    high = "high"
    normal = "normal"


class InputResult(BaseModel):
    inputResultOutcome: InputResultOutcome
    recommendation: str  # from gpt


class MaternityRecord(BaseModel):
    id: str
    user_id: str
    Age: int
    SystolicBP: int
    DiastolicBP: int
    BS: float
    BodyTemp: float
    HeartRate: int

    res_age: InputResult
    res_systolic_bp: InputResult
    res_diastolic_bp: InputResult
    res_bs: InputResult
    res_body_temp: InputResult
    res_heart_rate: InputResult
    date: str
    result: int


@app.post("/predict")
async def predict(
    data: DataInput,
    user: Annotated[dict, Depends(get_user)],
    db: Annotated[Database, Depends(get_mongo_db)],
) -> MaternityRecord:
    model = app.state.model
    explainer = app.state.explainer
    result = int(model.predict(pd.DataFrame(data.model_dump(), index=[0]))[0])
    shap_values = explainer.shap_values(pd.DataFrame(data.model_dump(), index=[0]))

    input_vars = []

    for i, (mean_value, input_value) in enumerate(
        zip(MEAN_DATA_VALUES.values(), data.model_dump().values())
    ):
        if shap_values[result][0][i] > 0:
            if input_value > int(mean_value):
                input_result_outcome = InputResultOutcome.high
            else:
                input_result_outcome = InputResultOutcome.low
        else:
            input_result_outcome = InputResultOutcome.normal
        # gpt call
        input_vars.append(
            InputResult(
                inputResultOutcome=input_result_outcome, recommendation="recommendation"
            )
        )

    record = MaternityRecord(
        id=secrets.token_urlsafe(16),
        user_id=user["id"],
        Age=data.Age,
        SystolicBP=data.SystolicBP,
        DiastolicBP=data.DiastolicBP,
        BS=data.BS,
        BodyTemp=data.BodyTemp,
        HeartRate=data.HeartRate,
        res_age=input_vars[0],
        res_systolic_bp=input_vars[1],
        res_diastolic_bp=input_vars[2],
        res_bs=input_vars[3],
        res_body_temp=input_vars[4],
        res_heart_rate=input_vars[5],
        date=date.today().strftime("%Y-%m-%d"),
        result=result,
    )

    # add to database
    results = db["results"]
    results.insert_one(record.model_dump())
    return record


class SignupRequest(BaseModel):
    email: str
    username: str
    password: str


class LoginResponse(BaseModel):
    token: str


@app.post("/signup")
async def signup(
    signup_data: SignupRequest, db: Annotated[Database, Depends(get_mongo_db)]
) -> LoginResponse:
    users = db["users"]
    user = users.find_one({"username": signup_data.username}, {"_id": 0})
    if user:
        raise HTTPException(status_code=400, detail="User already exists")
    else:
        id = secrets.token_urlsafe(16)
        token = secrets.token_urlsafe(16)
        users.insert_one(
            {
                "id": id,
                "username": signup_data.username,
                "email": signup_data.email,
                "password": signup_data.password,
                "token": token,
            }
        )
        return LoginResponse(token=token)


@app.post("/login")
async def login(
    credentials: HTTPBasicCredentials, db: Annotated[Database, Depends(get_mongo_db)]
) -> LoginResponse:
    users = db["users"]
    user = users.find_one(
        {"username": credentials.username, "password": credentials.password}, {"_id": 0}
    )
    if user:
        return LoginResponse(token=user["token"])
    else:
        raise HTTPException(status_code=400, detail="Invalid credentials")


@app.get("/results")
async def get_results(
    user: Annotated[dict, Depends(get_user)],
    db: Annotated[Database, Depends(get_mongo_db)],
) -> list[MaternityRecord]:
    results = db["results"]
    user_results = results.find({"user_id": user["id"]}, {"_id": 0})
    return list(user_results)


@app.post("/notification_token")
async def add_notification_token(
    token: str,
    user: Annotated[dict, Depends(get_user)],
    db: Annotated[Database, Depends(get_mongo_db)],
):
    users = db["users"]
    users.update_one({"id": user["id"]}, {"$set": {"notification_token": token}})
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8080, reload=True)
