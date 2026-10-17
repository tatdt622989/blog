import numpy as np
import pandas as pd
import lightgbm as lgb
from sklearn.dummy import DummyRegressor
from sklearn.metrics import mean_absolute_error

rng = np.random.default_rng(42)
n = 1000
dates = pd.date_range("2024-01-01", periods=n, freq="D")
X = pd.DataFrame({
    "day_of_week": dates.dayofweek,
    "forecast_temp": rng.uniform(10, 35, n),
    "promotion": rng.integers(0, 2, n),
})
y = pd.Series(np.maximum(0, np.round(
    80 + 3 * X["forecast_temp"]
    + 20 * (X["day_of_week"] >= 5)
    + 35 * X["promotion"]
    + rng.normal(0, 8, n)
)), name="cups_sold")

X_train, y_train = X.iloc[:700], y.iloc[:700]
X_valid, y_valid = X.iloc[700:850], y.iloc[700:850]
X_test, y_test = X.iloc[850:], y.iloc[850:]

model = lgb.LGBMRegressor(
    objective="regression", metric="mae",
    n_estimators=800, learning_rate=0.05,
    num_leaves=15, min_child_samples=20,
    random_state=42, n_jobs=2, verbosity=-1,
)
model.fit(
    X_train, y_train,
    eval_X=X_valid, eval_y=y_valid,
    callbacks=[lgb.early_stopping(30, verbose=False)],
)

baseline = DummyRegressor(strategy="mean")
baseline.fit(X_train, y_train)
baseline_mae = mean_absolute_error(y_test, baseline.predict(X_test))
model_mae = mean_absolute_error(y_test, model.predict(X_test))
print(f"Baseline MAE: {baseline_mae:.2f} cups")
print(f"LightGBM MAE: {model_mae:.2f} cups")
print(f"Best iteration: {model.best_iteration_}")

tomorrow = pd.DataFrame({
    "day_of_week": [5],
    "forecast_temp": [28.0],
    "promotion": [1],
})
print(f"New-day prediction: {model.predict(tomorrow)[0]:.1f} cups")
