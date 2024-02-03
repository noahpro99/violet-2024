# Testing file for shap module

import joblib
import sklearn
import pandas as pd
import shap

input_data = {
    "Age": 1,
    "SystolicBP": 1,
    "DiastolicBP": 1,
    "BS": 1.0,
    "BodyTemp": 1.0,
    "HeartRate": 1,
}
model = joblib.load('./models/maternal-health-risk.joblib')

print(type(model))
print(model.predict(pd.DataFrame(input_data, index=[0])))

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(pd.DataFrame(input_data, index=[0]))
print(shap_values)