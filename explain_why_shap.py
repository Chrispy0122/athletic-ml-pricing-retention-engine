import pandas as pd
import joblib
import shap
import numpy as np

# 1. Load the data and the trained model pipeline
print("Loading data and model...")
pipeline = joblib.load('propensity_model_xgb.pkl')
df_raw = pd.read_csv('usuarios_athletic_masivo.csv')
vip_list = pd.read_csv('vip_marketing_list.csv')

# 2. Get the ID of the #1 user most likely to subscribe
top_user_id = vip_list.iloc[0]['user_id']
top_user_score = vip_list.iloc[0]['subscription_probability_percent']

print(f"\nAnalyzing User: {top_user_id} (Propensity Score: {top_user_score:.1f}%)")

# 3. Find this user's raw data in the massive dataset
user_data = df_raw[df_raw['user_id'] == top_user_id].drop(columns=['is_subscribed', 'user_id'])

# 4. SHAP needs the data to be processed (scaled and encoded) just like XGBoost likes it
preprocessor = pipeline.named_steps['preprocessor']
xgb_model = pipeline.named_steps['classifier']

# Transform the raw data using our pipeline's preprocessor
user_data_transformed = preprocessor.transform(user_data)

# Get the names of the columns after transformation (to know what we are looking at)
# This handles the OneHotEncoded categorical variables
feature_names = preprocessor.get_feature_names_out()

# 5. Initialize the SHAP TreeExplainer
explainer = shap.TreeExplainer(xgb_model)

# 6. Calculate SHAP values for our specific user
shap_values = explainer.shap_values(user_data_transformed)

# 7. Create a DataFrame to see the exact impact of each variable
impact_df = pd.DataFrame({
    'Feature': feature_names,
    'Raw_Value_Impact': shap_values[0] # The SHAP impact values
})

# Sort by absolute impact (both massive positive and massive negative impacts)
impact_df['Absolute_Impact'] = impact_df['Raw_Value_Impact'].abs()
top_impacts = impact_df.sort_values(by='Absolute_Impact', ascending=False).head(5)

print("\n--- TOP 5 REASONS WHY THIS USER HAS THIS SCORE ---")
for index, row in top_impacts.iterrows():
    direction = "INCREASED" if row['Raw_Value_Impact'] > 0 else "DECREASED"
    print(f"- The variable '{row['Feature']}' {direction} the probability score.")

print("\n(Business Action: Use these top variables to personalize their email offer!)")