import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from xgboost import XGBClassifier
from sklearn.metrics import classification_report, roc_auc_score
import joblib

# 1. Cargar el dataset que generaste
df = pd.read_csv('usuarios_athletic_masivo.csv')

# 2. Separar variables (eliminamos user_id porque no tiene valor predictivo)
X = df.drop(columns=['is_subscribed', 'user_id'])
y = df['is_subscribed']

# 3. Identificar dinámicamente los tipos de columnas
categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numeric_cols = X.select_dtypes(exclude=['object']).columns.tolist()

# 4. Crear el motor de preprocesamiento (Feature Engineering automático)
# A los números les aplicamos StandardScaler, a las categorías OneHotEncoder
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_cols),
        ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_cols)
    ])

# 5. Calcular el ratio de desbalanceo (Clave económica)
# En modelos freemium, los 0s superan masivamente a los 1s. 
# scale_pos_weight le dice a XGBoost que preste más atención a los pocos que sí compran.
ratio = float(y.value_counts()[0] / y.value_counts()[1])

# 6. Configurar el estimador XGBoost
model = XGBClassifier(
    scale_pos_weight=ratio,
    eval_metric='auc',
    random_state=42,
    n_estimators=100,
    max_depth=4 # Mantenemos la profundidad baja para evitar sobreajuste
)

# 7. Ensamblar el Pipeline completo
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', model)
])

# 8. Dividir los datos (80% Entrenamiento, 20% Prueba)
# stratify=y garantiza que ambos sets tengan la misma proporción de suscriptores
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# 9. Entrenar el Pipeline
print("Entrenando el modelo XGBoost...")
pipeline.fit(X_train, y_train)

# 10. Evaluar el rendimiento financiero del modelo
y_pred = pipeline.predict(X_test)
y_pred_proba = pipeline.predict_proba(X_test)[:, 1] # Esta es la "Propensión" real

print("\n--- Resultados del Modelo ---")
# ROC-AUC mide la capacidad del modelo para distinguir entre las dos clases (1.0 es perfecto, 0.5 es azar)
print(f"ROC-AUC Score: {roc_auc_score(y_test, y_pred_proba):.4f}")
print("\nReporte de Clasificación:")
print(classification_report(y_test, y_pred))

# 11. Simular lo que hará la API: Devolver una probabilidad
sample_user = X_test.iloc[[0]]
probabilidad = pipeline.predict_proba(sample_user)[0][1]
print(f"\nProbabilidad de que el usuario aleatorio de prueba pague la suscripción: {probabilidad:.2%}")

# 12. Exportar el cerebro para producción
joblib.dump(pipeline, 'propensity_model_xgb.pkl')
print("\nModelo exportado exitosamente como 'propensity_model_xgb.pkl'")