# (For reference only, not used in the project)
# import joblib
# import sklearn
# import pandas as pd
# import shap

# input_data = {
#     "Age": 35,
#     "SystolicBP": 85,
#     "DiastolicBP": 60,
#     "BS": 6.0,
#     "BodyTemp": 102,
#     "HeartRate": 86,
# }
# model = joblib.load('./models/maternal-health-risk.joblib')

# print(type(model))
# print(model.predict(pd.DataFrame(input_data, index=[0])))

# explainer = shap.TreeExplainer(model)
# shap_values = explainer.shap_values(pd.DataFrame(input_data, index=[0]))
# print(shap_values)