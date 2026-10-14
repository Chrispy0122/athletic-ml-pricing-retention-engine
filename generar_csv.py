import pandas as pd
import numpy as np

# ==============================================================================
# The Athletic - Quantitative Data Generation Engine (Level 2: Dynamic Pricing)
# ==============================================================================
# Seed for exact reproducibility
np.random.seed(42)
n_users = 5000

# Base dictionary initialization
data = {'user_id': [f'USR_{i}' for i in range(n_users)]}

# ------------------------------------------------------------------------------
# 1. Technological & Base Economic Demographics
# ------------------------------------------------------------------------------
data['device_os_ecosystem'] = np.random.choice(['iOS', 'Android', 'macOS', 'Windows'], n_users, p=[0.45, 0.40, 0.10, 0.05])
data['geo_purchasing_power_tier'] = np.random.choice(['Tier 1', 'Tier 2', 'Tier 3'], n_users, p=[0.4, 0.4, 0.2])
data['device_age_estimate_years'] = np.clip(np.random.poisson(1.5, n_users), 0, 5)
data['connection_type'] = np.random.choice(['5G', '4G', 'WiFi', 'Corp-Net'], n_users)
data['uses_adblocker'] = np.random.binomial(1, 0.2, n_users)

# Derived Microeconomic Variable: Macro Purchasing Power Index (0.0 to 100.0)
# Logically tied to Geo Tier (base economic potential) and Device OS (wealth proxy)
tier_base = np.where(data['geo_purchasing_power_tier'] == 'Tier 1', 75.0,
             np.where(data['geo_purchasing_power_tier'] == 'Tier 2', 50.0, 25.0))
os_bonus = np.where(np.isin(data['device_os_ecosystem'], ['iOS', 'macOS']), 10.0, 0.0)
data['macro_purchasing_power_index'] = np.round(
    np.clip(np.random.normal(tier_base + os_bonus, 8.0), 5.0, 100.0), 1
)

# ------------------------------------------------------------------------------
# 2. Frequency & Engagement Metrics
# ------------------------------------------------------------------------------
data['account_age_days'] = np.random.randint(1, 1000, n_users)
data['days_since_last_session'] = np.random.randint(0, 30, n_users)
data['total_sessions_last_30_days'] = np.clip(np.random.poisson(8, n_users), 1, 60)
data['avg_session_duration_minutes'] = np.round(np.clip(np.random.normal(5, 2, n_users), 0.5, 30), 1)

# ------------------------------------------------------------------------------
# 3. Content Affinity & Talent Loyalty
# ------------------------------------------------------------------------------
leagues = [
    'Premier League', 'Formula 1', 'NBA', 'La Liga', 
    'Champions League', 'MLB', 'NFL', 'UFC/MMA', 
    'Tennis (ATP/WTA)', 'Golf (PGA)'
]
data['primary_league_interest'] = np.random.choice(leagues, n_users)
data['secondary_league_interest'] = np.random.choice(leagues, n_users)
data['followed_teams_count'] = np.random.poisson(2, n_users)
data['content_format_preference'] = np.random.choice(
    ['Breaking News', 'Tactical Analysis', 'Opinion/Editorials', 'Live Match Blogs'], n_users
)
data['read_tactical_analysis_ratio'] = np.round(np.random.uniform(0.0, 0.8, n_users), 2)
data['distinct_authors_read'] = np.random.poisson(3, n_users)
data['podcasts_listened_last_30_days'] = np.random.poisson(1, n_users)

# ------------------------------------------------------------------------------
# 4. Reading Volume & Depth
# ------------------------------------------------------------------------------
base_reads = np.random.poisson(10, n_users)
data['total_articles_read_last_30_days'] = np.round(base_reads + (data['total_sessions_last_30_days'] * 1.5)).astype(int)
data['articles_read_per_session'] = np.round(data['total_articles_read_last_30_days'] / data['total_sessions_last_30_days'], 2)
data['f1_articles_read'] = np.where(data['primary_league_interest'] == 'Formula 1', np.round(data['total_articles_read_last_30_days'] * 0.6), np.random.poisson(1, n_users)).astype(int)
data['football_articles_read'] = np.where(data['primary_league_interest'] == 'Premier League', np.round(data['total_articles_read_last_30_days'] * 0.6), np.random.poisson(1, n_users)).astype(int)
data['avg_scroll_depth_percentage'] = np.clip(np.random.normal(0.45, 0.15, n_users), 0.1, 1.0)
data['articles_read_to_100_percent'] = np.round(data['total_articles_read_last_30_days'] * data['avg_scroll_depth_percentage']).astype(int)

# ------------------------------------------------------------------------------
# 5. Friction & Paywall Strike History
# ------------------------------------------------------------------------------
data['paywall_hits_total'] = np.round(data['total_articles_read_last_30_days'] * np.random.uniform(0.05, 0.3, n_users)).astype(int)
data['paywall_hits_last_7_days'] = np.round(data['paywall_hits_total'] * 0.3).astype(int)
data['unique_premium_articles_attempted'] = np.round(data['paywall_hits_total'] * 0.8).astype(int)
data['checkout_abandonment_count'] = np.where(data['paywall_hits_total'] > 3, np.random.binomial(2, 0.3, n_users), 0)

# ------------------------------------------------------------------------------
# 6. Marketing, Community & Discount Habits
# ------------------------------------------------------------------------------
data['acquisition_channel'] = np.random.choice(['Organic Search', 'Twitter Ads', 'Referral', 'Newsletter'], n_users)
data['used_free_trial'] = np.random.binomial(1, 0.15, n_users)
data['newsletter_open_rate'] = np.round(np.random.uniform(0.0, 1.0, n_users), 2)
data['clicked_discount_email'] = np.where(
    data['checkout_abandonment_count'] > 0, 
    np.random.binomial(1, 0.5, n_users), 
    np.random.binomial(1, 0.05, n_users)
)
data['comments_posted_last_30_days'] = np.random.poisson(0.5, n_users)
data['articles_bookmarked'] = np.round(data['total_articles_read_last_30_days'] * 0.1).astype(int)
data['articles_shared'] = np.random.poisson(1, n_users)

# Derived Microeconomic Variable: Historical Discount Sensitivity (0.0 to 1.0)
# Users who actively engage with discount emails exhibit elevated price sensitivity
data['historical_discount_sensitivity'] = np.where(
    data['clicked_discount_email'] == 1,
    np.random.beta(5, 2, n_users), # Centered around ~0.75
    np.random.beta(2, 5, n_users)  # Centered around ~0.25
).round(2)

# ------------------------------------------------------------------------------
# 7. UX Habits & Contextual Factors
# ------------------------------------------------------------------------------
data['weekend_warrior_index'] = np.round(np.random.uniform(0.1, 0.9, n_users), 2)
data['days_to_favorite_league_start'] = np.random.choice([0, 15, 30, 60, 90], n_users)
data['morning_commute_reader'] = np.random.binomial(1, 0.3, n_users)
data['push_notifications_count'] = np.random.poisson(2, n_users)
data['dark_mode_enabled'] = np.random.binomial(1, 0.4, n_users)
data['customized_home_feed'] = np.random.binomial(1, 0.2, n_users)

# ------------------------------------------------------------------------------
# 8. Microeconomic & Dynamic Pricing Experiments (Level 2 Features)
# ------------------------------------------------------------------------------
# A/B Testing price points offered in paywall experiments
data['price_offer_shown_usd'] = np.random.choice([1.99, 3.99, 5.99, 9.99], n_users, p=[0.25, 0.35, 0.25, 0.15])

# Competitor Overlap Score (0.0 to 1.0): Consumption of substitute premium media (ESPN+, etc.)
data['competitor_overlap_score'] = np.round(np.random.beta(2, 3, n_users), 2)

# Construct the initial DataFrame
df = pd.DataFrame(data)

# ==============================================================================
# 9. Econometric Demand Curve & Latent Willingness-to-Pay (WTP) Logic
# ==============================================================================
# Microeconomic Framework:
# Utility V_i = Intrinsic_Utility(Content, Habits) - Price_Disutility(Elasticity_i * (Price - P_min))

# A. Intrinsic Engagement & Habit Utility
intrinsic_utility = (
    0.65 * np.log1p(df['paywall_hits_total'])
    + 2.40 * df['checkout_abandonment_count']
    + 0.50 * np.log1p(df['distinct_authors_read'])
    + 0.85 * (df['macro_purchasing_power_index'] / 100.0)
    + 0.60 * df['customized_home_feed']
    + 0.75 * df['used_free_trial']
    + 0.10 * df['articles_bookmarked']
    + np.where(df['primary_league_interest'].isin(['Formula 1', 'Premier League']), 0.40, 0.0)
)

# B. Individual Price Elasticity of Demand (eta_i)
# - Base elasticity: 1.0
# - Substitute availability (competitor_overlap_score) increases price sensitivity
# - Discount sensitivity increases price sensitivity
# - Purchasing power dampens price sensitivity (wealthier users care less about price)
# - High author loyalty (distinct_authors_read) creates a journalistic moat (inelastic demand)
author_moat = np.clip(df['distinct_authors_read'] / 4.0, 0.0, 1.0)
purchasing_power_factor = df['macro_purchasing_power_index'] / 100.0

individual_elasticity = (
    1.0
    + 1.80 * df['competitor_overlap_score']
    + 1.00 * df['historical_discount_sensitivity']
    - 1.20 * purchasing_power_factor
    - 0.80 * author_moat
)
individual_elasticity = np.clip(individual_elasticity, 0.15, 3.50)

# C. Non-linear Price Penalty (Downward Sloping Demand Curve)
# Elastic users are heavily penalized at higher prices ($5.99, $9.99).
# Inelastic users (High Macro + High Author Loyalty) exhibit minimal sensitivity even at $9.99.
price_delta = df['price_offer_shown_usd'] - 1.99
price_penalty = individual_elasticity * price_delta * 0.55

# D. Latent Net Utility and Sigmoid Conversion Probability
# Calibrated with intercept -4.22 to match the empirical ~11% freemium baseline
net_latent_utility = intrinsic_utility - price_penalty - 4.22
probabilidad = 1.0 / (1.0 + np.exp(-net_latent_utility))

# E. Generate Observable Target Variable (Bernoulli Trial)
df['is_subscribed'] = np.random.binomial(1, probabilidad)

# ------------------------------------------------------------------------------
# 10. Verification & Export
# ------------------------------------------------------------------------------
output_file = 'usuarios_athletic_masivo.csv'
df.to_csv(output_file, index=False)

# Diagnostic Econometric Printouts
print(f"==================================================================")
print(f"Dataset corporativo generado: '{output_file}'")
print(f"Dimensiones: {df.shape[0]} filas x {df.shape[1]} columnas")
print(f"Tasa de conversión global: {df['is_subscribed'].mean():.2%}")
print(f"------------------------------------------------------------------")
print(f"Curva de Demanda Microeconómica (Tasa de Conversión por Precio):")
for p, rate in df.groupby('price_offer_shown_usd')['is_subscribed'].mean().items():
    print(f"  - Oferta ${p:.2f}/mes: {rate:.2%}")
print(f"------------------------------------------------------------------")
inelastic_sub = df[(df['macro_purchasing_power_index'] > 75) & (df['distinct_authors_read'] >= 4)]
elastic_sub = df[df['competitor_overlap_score'] > 0.60]
print(f"Segmento Inelástico (Alto Macro + Lealtad a Periodistas) @ $9.99: {inelastic_sub[inelastic_sub['price_offer_shown_usd'] == 9.99]['is_subscribed'].mean():.2%}")
print(f"Segmento Elástico (Alta Competencia / ESPN+) @ $1.99: {elastic_sub[elastic_sub['price_offer_shown_usd'] == 1.99]['is_subscribed'].mean():.2%}")
print(f"Segmento Elástico (Alta Competencia / ESPN+) @ $9.99: {elastic_sub[elastic_sub['price_offer_shown_usd'] == 9.99]['is_subscribed'].mean():.2%}")
print(f"==================================================================")