from fastapi import FastAPI
import joblib
import sklearn
import pandas as pd
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble._forest import RandomForestClassifier  # Importing for type hint
from typing import Type
import uvicorn
from pydantic import BaseModel
import contextlib

output_mapped=['low risk', 'mid risk', 'high risk']

class DataInput(BaseModel):
    Age: int
    SystolicBP: int
    DiastolicBP: int
    BS: float
    BodyTemp: float
    HeartRate: int

def load_model() -> Type[RandomForestClassifier]:
    if not (os.path.exists('./models/maternal-health-risk.joblib')):
        raise FileNotFoundError('Model not found')
    return joblib.load('./models/maternal-health-risk.joblib')
    
    
@contextlib.asynccontextmanager
async def lifespan(app: FastAPI) -> None:
    app.state.model = load_model()
    yield 


app = FastAPI(title="Maternal Health Risk Prediction API", lifespan=lifespan)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/predict")
async def predict(data: DataInput ) -> dict:
    model = app.state.model
    result =  model.predict(pd.DataFrame(data.dict(), index=[0]))[0]
    return {"result": int(result)}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5000)
