import pandas as pd
import joblib

print("cargar el modelo Xgboost..")
pipilene = joblib.load('propensity_model_xgb.pkl')

df = pd.read_csv('usuarios_athletic_masivo.csv')

free_users = df[df['is_subscribed']==0].copy()

user_ids = free_users['user_id']
X_new_data = free_users.drop(columns=['is_subscribed','user_id'])

print("calculating individula propensity scores..")
probabilities = pipilene.predict_proba(X_new_data)[:,1]

results = pd.DataFrame({
    'user_id': user_ids,
    'subscription_probability_percent' : probabilities * 100
})

marketing_ranking = results.sort_values(by='subscription_probability_percent', ascending=False)

print("\n--- TOP 10 USERS TO TARGET TODAY ---")
print(marketing_ranking.head(10).round(2))

# 9. Export the file so the Marketing team can trigger the email campaign
marketing_ranking.to_csv('vip_marketing_list.csv', index=False)
print("\nFile 'vip_marketing_list.csv' exported successfully.")