from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import pandas as pd
import numpy as np
import joblib
import shap
import sqlite3
import uvicorn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 1. Initialize the FastAPI application
app = FastAPI(title="The Daily Score - ML Backend API")

# Enable CORS so the React frontend (running on a different port) can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, this would be your exact frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Load ML Models and Data into memory on startup (for blazing fast API responses)
print("Loading XGBoost pipeline and user data...")
pipeline = joblib.load('propensity_model_xgb.pkl')
preprocessor = pipeline.named_steps['preprocessor']
xgb_model = pipeline.named_steps['classifier']

# Initialize SHAP Explainer
explainer = shap.TreeExplainer(xgb_model)

# Load the raw user database (simulating a Data Warehouse connection)
df_users = pd.read_csv('usuarios_athletic_masivo.csv')

# 3. Canonical 24 Editorial Articles Inventory (Exact sync with TheDailyScore.jsx)
ARTICLES_DATA = [
    {
        "id": 1,
        "title": "Inside the Modern Offense: How Pre-Snap Motion Revolutionized the NFL",
        "author": "Marcus Vance",
        "readTime": "7 min read",
        "sport_category": "NFL",
        "image_url": "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1200&q=80",
        "summary": "Coaches across the league are dismantling traditional defensive schemes with layered pre-snap motion packages. Film breakdown reveals why 2026 has become the year of defensive existential crisis.",
        "is_premium": False,
        "published_at": "2 hours ago"
    },
    {
        "id": 2,
        "title": "The Giannis Dilemma: Half-Court Spacing and the Math Behind Modern Paint Dominance",
        "author": "Elena Rostova",
        "readTime": "6 min read",
        "sport_category": "NBA",
        "image_url": "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
        "summary": "Why traditional perimeter traps are crumbling against high-velocity rim attacks, backed by advanced second-spectrum tracking metrics.",
        "is_premium": True,
        "published_at": "3 hours ago"
    },
    {
        "id": 3,
        "title": "Tactical Masterclass: The Counter-Press Blueprint Transforming the Champions League",
        "author": "Julian Alvarez",
        "readTime": "5 min read",
        "sport_category": "Soccer",
        "image_url": "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
        "summary": "Analyzing the transition traps that neutralized the continent's most prolific midfields this past weekend.",
        "is_premium": False,
        "published_at": "4 hours ago"
    },
    {
        "id": 4,
        "title": "Aerodynamic Secrets: How Underfloor Venturi Tunnels Dictate the 2026 Grid",
        "author": "Chloe Hamilton",
        "readTime": "9 min read",
        "sport_category": "F1",
        "image_url": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
        "summary": "Wind tunnel telemetry shows subtle edge-vortex modifications are unlocking two-tenths of a second per lap in high-speed corners.",
        "is_premium": True,
        "published_at": "5 hours ago"
    },
    {
        "id": 5,
        "title": "The Sweeper Revolution: Pitch Design and the Demise of Traditional Sliders",
        "author": "David Ortiz-Bates",
        "readTime": "8 min read",
        "sport_category": "MLB",
        "image_url": "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80",
        "summary": "Grip variance and seam-shifted wake physics have rendered standard breaking balls obsolete across the American League.",
        "is_premium": True,
        "published_at": "6 hours ago"
    },
    {
        "id": 6,
        "title": "Scouting the Next Phenom: Real Madrid's Proprietary Global Analytics Engine",
        "author": "Mateo Silva",
        "readTime": "4 min read",
        "sport_category": "Soccer",
        "image_url": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
        "summary": "Inside Valdebebas, where biometric data pipelines and scout intuition converge to identify South America's premier teenagers.",
        "is_premium": False,
        "published_at": "8 hours ago"
    },
    {
        "id": 7,
        "title": "The Two-High Safety Renaissance: How NFL Defenses Are Neutralizing Deep Explosions",
        "author": "Marcus Vance",
        "readTime": "6 min read",
        "sport_category": "NFL",
        "image_url": "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80",
        "summary": "Defensive coordinators are trading aggressive blitz packages for zone ceilings. We charted 4,000 snaps to explain why passing EPA has plummeted.",
        "is_premium": True,
        "published_at": "9 hours ago"
    },
    {
        "id": 8,
        "title": "Wemby's Defensive Orbit: The True Range of San Antonio's 8-Foot Ceiling",
        "author": "Elena Rostova",
        "readTime": "5 min read",
        "sport_category": "NBA",
        "image_url": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
        "summary": "Opponents are shooting 14% lower within 10 feet when Victor Wembanyama is on the floor. An anatomical look at the game's most terrifying rim protector.",
        "is_premium": False,
        "published_at": "11 hours ago"
    },
    {
        "id": 9,
        "title": "Telemetry Telepathy: How Max Verstappen Decodes Mid-Corner Balance in 15 Milliseconds",
        "author": "Chloe Hamilton",
        "readTime": "8 min read",
        "sport_category": "F1",
        "image_url": "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=1200&q=80",
        "summary": "Oversteer corrections at 180 mph that look erratic on broadcast TV are calculated micro-rotations. Telemetry data breaks down his throttle mastery.",
        "is_premium": True,
        "published_at": "13 hours ago"
    },
    {
        "id": 10,
        "title": "Moneyball 3.0: Bat-Speed Sensors and the New Currency of MLB Exit Velocity",
        "author": "David Ortiz-Bates",
        "readTime": "7 min read",
        "sport_category": "MLB",
        "image_url": "https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&w=1200&q=80",
        "summary": "With Hawk-Eye tracking every swing in millimeter increments, front offices are identifying swing efficiency months before box scores reflect the shift.",
        "is_premium": False,
        "published_at": "14 hours ago"
    },
    {
        "id": 11,
        "title": "The False Nine Reborn: Arsenal's Positional Fluidity and Fluid Triangle Rotation",
        "author": "Julian Alvarez",
        "readTime": "6 min read",
        "sport_category": "Soccer",
        "image_url": "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
        "summary": "Mikel Arteta has reconstructed the frontline. By vacating central space, inverted wingers and overlapping fullbacks create surgical overloads.",
        "is_premium": True,
        "published_at": "16 hours ago"
    },
    {
        "id": 12,
        "title": "Draft Board Confidential: Scouting the Top 5 Quarterbacks in the 2027 Class",
        "author": "Marcus Vance",
        "readTime": "10 min read",
        "sport_category": "NFL",
        "image_url": "https://images.unsplash.com/photo-1580086319619-3ed498161c77?auto=format&fit=crop&w=1200&q=80",
        "summary": "General managers and national scouts share anonymous assessments on the next generational crop of passers, mechanics, and processing speeds.",
        "is_premium": False,
        "published_at": "18 hours ago"
    },
    {
        "id": 13,
        "title": "Ferrari's Power Unit Gamble: The Compression Ratio Gamble Aiming for Silverstone Glory",
        "author": "Chloe Hamilton",
        "readTime": "7 min read",
        "sport_category": "F1",
        "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
        "summary": "Maranello has redesigned their turbocharger plenum. If dyno numbers hold in qualifying conditions, the Scuderia could shake up the constructors title.",
        "is_premium": False,
        "published_at": "20 hours ago"
    },
    {
        "id": 14,
        "title": "The Pick-and-Roll Disruption: How Oklahoma City Weaponizes Length Across Five Positions",
        "author": "Elena Rostova",
        "readTime": "5 min read",
        "sport_category": "NBA",
        "image_url": "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80",
        "summary": "Switching everything without conceding paint penetration requires athletic synchronization. Film breakdown shows OKC's generational blueprint.",
        "is_premium": True,
        "published_at": "22 hours ago"
    },
    {
        "id": 15,
        "title": "The 100 MPH Normal: Why Pitching Injuries Rose Along with Triple-Digit Fastballs",
        "author": "David Ortiz-Bates",
        "readTime": "9 min read",
        "sport_category": "MLB",
        "image_url": "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80",
        "summary": "Orthopedic surgeons, pitching coaches, and union reps weigh in on the biomechanical threshold of the human elbow in pursuit of velocity.",
        "is_premium": True,
        "published_at": "1 day ago"
    },
    {
        "id": 16,
        "title": "Bellingham’s Evolution: From Box-to-Box Engine to Complete Offensive Focal Point",
        "author": "Mateo Silva",
        "readTime": "6 min read",
        "sport_category": "Soccer",
        "image_url": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
        "summary": "Positional heatmap analysis demonstrates how the English midfielder dictates tempo and disrupts defensive transitions in the final third.",
        "is_premium": False,
        "published_at": "1 day ago"
    },
    {
        "id": 17,
        "title": "Red Zone Efficiency: The Unstoppable Short-Yardage Playbook Transforming NFL Fourth Downs",
        "author": "Marcus Vance",
        "readTime": "6 min read",
        "sport_category": "NFL",
        "image_url": "https://images.unsplash.com/photo-1511225070737-5af5ac9a690d?auto=format&fit=crop&w=1200&q=80",
        "summary": "Analytics departments have convinced head coaches that punting on fourth-and-two is malpractice. The personnel packages guaranteeing conversion.",
        "is_premium": True,
        "published_at": "1 day ago"
    },
    {
        "id": 18,
        "title": "Tyrese Haliburton’s Vision: The Geometry of NBA Transition Passing",
        "author": "Elena Rostova",
        "readTime": "5 min read",
        "sport_category": "NBA",
        "image_url": "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&w=1200&q=80",
        "summary": "Cross-court hit-aheads, delayed skips, and the fastest release time in basketball: an in-depth optical tracking study of transition creation.",
        "is_premium": False,
        "published_at": "2 days ago"
    },
    {
        "id": 19,
        "title": "The Inverted Fullback Playbook: How Modern Wing-Backs Orchestrate Midfield Superiority",
        "author": "Julian Alvarez",
        "readTime": "7 min read",
        "sport_category": "Soccer",
        "image_url": "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
        "summary": "By stepping inside into the half-spaces, modern defenders create numerical +1 overloads that dismantle conventional pressing traps across European football.",
        "is_premium": True,
        "published_at": "2 days ago"
    },
    {
        "id": 20,
        "title": "Brake Bias Optimization: The Millisecond Telemetry Winning Wet-Weather Grands Prix",
        "author": "Chloe Hamilton",
        "readTime": "8 min read",
        "sport_category": "F1",
        "image_url": "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
        "summary": "Hydroplaning thresholds and regenerative brake torque distribution: how steering-wheel rotary dials allow drivers to survive changeable rain conditions.",
        "is_premium": False,
        "published_at": "2 days ago"
    },
    {
        "id": 21,
        "title": "The Seam-Shifted Wake Frontier: Why Gyro-Spin Fastballs Fail in October Postseason",
        "author": "David Ortiz-Bates",
        "readTime": "6 min read",
        "sport_category": "MLB",
        "image_url": "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=1200&q=80",
        "summary": "Non-Magnus aerodynamic lift caused by raised baseball seams creates late tailing action that traditional high-spin pitch models failed to anticipate.",
        "is_premium": False,
        "published_at": "3 days ago"
    },
    {
        "id": 22,
        "title": "Disguised Cover-3 Cloud: Why Elite Quarterbacks Struggle Against Stunted Fronts",
        "author": "Marcus Vance",
        "readTime": "8 min read",
        "sport_category": "NFL",
        "image_url": "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
        "summary": "Pre-snap single-high looks rolling into inverted trap-coverages at the snap: the statistical blueprint suffocating top NFL passing offenses.",
        "is_premium": True,
        "published_at": "3 days ago"
    },
    {
        "id": 23,
        "title": "Clutch Shot Selection: Expected Value in High-Leverage Final Two Minutes",
        "author": "Elena Rostova",
        "readTime": "5 min read",
        "sport_category": "NBA",
        "image_url": "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80",
        "summary": "Tracking 3,200 fourth-quarter possessions to quantify the true expected value of mid-range isolations versus corner threes when games are within 3 points.",
        "is_premium": False,
        "published_at": "4 days ago"
    },
    {
        "id": 24,
        "title": "Active Suspension Telemetry: The CFD Secrets Behind High-Rake Ground Effect Cars",
        "author": "Chloe Hamilton",
        "readTime": "9 min read",
        "sport_category": "F1",
        "image_url": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
        "summary": "How microscopic changes in ride height generate exponentially increasing venturi suction, and why the line between downforce and catastrophic porpoising is razor thin.",
        "is_premium": True,
        "published_at": "4 days ago"
    }
]

# 4. Create SQLite Database synced with all 24 articles
def setup_sqlite_db():
    conn = sqlite3.connect(':memory:', check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE articles (
            id INTEGER PRIMARY KEY,
            title TEXT,
            sport_category TEXT,
            author TEXT,
            summary TEXT,
            is_premium BOOLEAN
        )
    ''')
    
    # Sync all 24 articles into the database
    inventory = [
        (
            a["id"],
            a["title"],
            a["sport_category"],
            a["author"],
            a["summary"],
            a["is_premium"]
        )
        for a in ARTICLES_DATA
    ]
    cursor.executemany('INSERT INTO articles VALUES (?, ?, ?, ?, ?, ?)', inventory)

    # 4b. Table: Dynamic Subscription Offers (Pricing Architecture)
    cursor.execute('''
        CREATE TABLE subscription_offers (
            id INTEGER PRIMARY KEY,
            offer_name TEXT,
            price_usd REAL,
            is_active BOOLEAN
        )
    ''')
    offers = [
        (1, "Flash Sale", 1.99, True),
        (2, "Weekend Promo", 3.99, True),
        (3, "Standard Discount", 5.99, True),
        (4, "Full Premium", 9.99, True)
    ]
    cursor.executemany('INSERT INTO subscription_offers VALUES (?, ?, ?, ?)', offers)

    conn.commit()
    return conn

db_connection = setup_sqlite_db()

# 5. Build In-Memory Hybrid Content-Based NLP Engine on startup
print("Initializing Hybrid Content-Based NLP Engine (TF-IDF + Cosine Similarity)...")

# Build metadata soup: sport_category (weighted 2x), author, title, summary
for art in ARTICLES_DATA:
    art['metadata_soup'] = f"{art['sport_category']} {art['sport_category']} {art['author']} {art['title']} {art['summary']}"

tfidf_vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
soup_list = [a['metadata_soup'] for a in ARTICLES_DATA]
tfidf_matrix = tfidf_vectorizer.fit_transform(soup_list)
cosine_sim_matrix = cosine_similarity(tfidf_matrix, tfidf_matrix)
feature_names = tfidf_vectorizer.get_feature_names_out()
id_to_article_idx = {a['id']: i for i, a in enumerate(ARTICLES_DATA)}

def extract_top_keywords(source_idx: Optional[int], target_idx: int, top_k: int = 2) -> List[str]:
    """
    Extracts the top shared TF-IDF terms driving cosine similarity between the source article
    and candidate article. If shared terms are fewer than top_k, supplements with the target
    article's highest-weighted TF-IDF terms.
    """
    vec_target = tfidf_matrix[target_idx].toarray()[0]
    target_sport = ARTICLES_DATA[target_idx]['sport_category'].lower()
    keywords: List[str] = []
    
    # 1. Look for shared terms in the dot product
    if source_idx is not None and 0 <= source_idx < len(ARTICLES_DATA):
        vec_source = tfidf_matrix[source_idx].toarray()[0]
        shared_weights = vec_source * vec_target
        nonzero_indices = np.where(shared_weights > 0)[0]
        if len(nonzero_indices) > 0:
            sorted_shared = nonzero_indices[np.argsort(shared_weights[nonzero_indices])[::-1]]
            for idx in sorted_shared:
                term = feature_names[idx].strip()
                # filter out raw sport repetition like 'nfl' or 'nfl nfl'
                if term.lower() != target_sport and term.lower() != f"{target_sport} {target_sport}":
                    if term not in keywords:
                        keywords.append(term)
                if len(keywords) >= top_k:
                    break

    # 2. Backfill with top distinctive terms of the target article if needed
    if len(keywords) < top_k:
        target_indices = np.argsort(vec_target)[::-1]
        for idx in target_indices:
            term = feature_names[idx].strip()
            if vec_target[idx] > 0 and term.lower() != target_sport and term.lower() != f"{target_sport} {target_sport}":
                if term not in keywords:
                    keywords.append(term)
            if len(keywords) >= top_k:
                break
                
    if not keywords:
        keywords = [target_sport, "analytics"]
        
    return keywords[:top_k]

def get_hybrid_recommendations(
    article_id: Optional[int] = None,
    sport_category: Optional[str] = None,
    user_propensity_pct: float = 15.0
) -> Dict[str, Any]:
    """
    Hybrid Content-Based NLP + Propensity Recommendation Engine:
    - Excludes currently read article_id.
    - Computes hybrid match_score (0 to 99%) combining TF-IDF cosine similarity + same-sport boost.
    - Right-Time Funnel Orchestration:
        * user_propensity_pct < 25.0 (Retention Mode): 2 Free articles + 1 Pro article to prevent paywall fatigue.
        * user_propensity_pct >= 25.0 (Conversion Mode): 2 Pro articles + 1 Free article to drive monetization.
    """
    source_idx = id_to_article_idx.get(article_id) if article_id is not None else None
    if source_idx is not None and not sport_category:
        sport_category = ARTICLES_DATA[source_idx]['sport_category']
    if not sport_category:
        sport_category = "NFL"

    candidates = []
    for i, art in enumerate(ARTICLES_DATA):
        if article_id is not None and art['id'] == article_id:
            continue
        
        cos_sim = float(cosine_sim_matrix[source_idx, i]) if source_idx is not None else 0.25
        is_same_sport = (art['sport_category'].upper() == sport_category.upper())
        
        # Hybrid match score: 0 to 99%
        # Baseline ~55% + text TF-IDF similarity (up to 46%) + contextual sport boost (+16%)
        raw_score = 55.0 + (cos_sim * 46.0) + (16.0 if is_same_sport else 0.0)
        match_score_pct = int(min(98, max(50, round(raw_score))))
        
        top_kw = extract_top_keywords(source_idx, i, top_k=2)
        
        candidates.append({
            "id": art['id'],
            "title": art['title'],
            "sport_category": art['sport_category'],
            "category": art['sport_category'],  # Backwards compatibility with sql_recommendations
            "author": art['author'],
            "summary": art['summary'],
            "readTime": art['readTime'],
            "image_url": art['image_url'],
            "is_premium": art['is_premium'],
            "match_score_pct": match_score_pct,
            "top_keywords": top_kw
        })
        
    is_retention_mode = (user_propensity_pct < 25.0)
    strategy_mode = "retention" if is_retention_mode else "conversion"
    strategy_name = "Retention Mode (2 Free / 1 PRO)" if is_retention_mode else "Conversion Mode (2 PRO / 1 Free)"
    strategy_description = f"Strategy: {strategy_name} • TF-IDF + Cosine Similarity"
    
    free_candidates = sorted([c for c in candidates if not c['is_premium']], key=lambda x: x['match_score_pct'], reverse=True)
    premium_candidates = sorted([c for c in candidates if c['is_premium']], key=lambda x: x['match_score_pct'], reverse=True)
    
    selected = []
    if is_retention_mode:
        # Retention Mode: Top 2 Free articles + Top 1 Premium
        for c in free_candidates[:2]:
            c_copy = dict(c)
            c_copy['strategy_label'] = "Retention Hook (Free)"
            selected.append(c_copy)
        for c in premium_candidates[:1]:
            c_copy = dict(c)
            c_copy['strategy_label'] = "VIP Conversion Target"
            selected.append(c_copy)
    else:
        # Conversion Mode: Top 2 Premium articles + Top 1 Free
        for c in premium_candidates[:2]:
            c_copy = dict(c)
            c_copy['strategy_label'] = "VIP Conversion Target"
            selected.append(c_copy)
        for c in free_candidates[:1]:
            c_copy = dict(c)
            c_copy['strategy_label'] = "Retention Hook (Free)"
            selected.append(c_copy)
            
    # Sort selected recommendations by match_score_pct descending
    selected = sorted(selected, key=lambda x: x['match_score_pct'], reverse=True)
    
    return {
        "status": "success",
        "article_id": article_id,
        "sport_category": sport_category,
        "user_propensity_pct": user_propensity_pct,
        "strategy_mode": strategy_mode,
        "strategy_name": strategy_name,
        "strategy_description": strategy_description,
        "recommendations": selected
    }

# Helper to compute or look up a user's propensity score
def get_user_propensity(user_id: str) -> float:
    try:
        raw_id = str(user_id).strip()
        if not raw_id.upper().startswith("USR_") and raw_id.isdigit():
            norm_id = f"USR_{raw_id}"
        elif raw_id.upper().startswith("USR") and not raw_id.upper().startswith("USR_"):
            norm_id = f"USR_{raw_id[3:].lstrip('_')}"
        else:
            norm_id = raw_id.upper()

        user_row = df_users[df_users['user_id'] == norm_id]
        if not user_row.empty:
            user_features = user_row.drop(columns=['is_subscribed', 'user_id']).copy()
            user_features['price_offer_shown_usd'] = 3.99
            prob = float(pipeline.predict_proba(user_features)[0][1])
            return round(prob * 100, 2)
    except Exception as e:
        print(f"Propensity calculation fallback for {user_id}: {e}")
    return 15.0

# 6. Dynamic Persona Discovery Engine
def find_sample_personas():
    """
    Scans df_users dynamically to identify 4 real user personas corresponding to each behavioral profile:
    - Persona 1: "High-Loyalty Profile (USR_869)"
    - Persona 2: "Core Reader Profile (USR_16)"
    - Persona 3: "Promo Hunter Profile (USR_0)"
    - Persona 4: "Cold Visitor Profile (USR_2342)"
    Prices are NOT hardcoded in labels; they are computed dynamically by XGBoost.
    """
    defaults = [
        {
            "id": "vip_fan",
            "name": "High-Loyalty Profile",
            "user_id": "USR_869",
            "optimal_price": 9.99,
            "badge": "High-Loyalty",
            "tag": "High-Loyalty Profile",
            "description": "High engagement, frequent tactical reader, near-zero discount sensitivity"
        },
        {
            "id": "core_reader",
            "name": "Core Reader Profile",
            "user_id": "USR_16",
            "optimal_price": 5.99,
            "badge": "Core Reader",
            "tag": "Core Reader Profile",
            "description": "Engaged multi-session reader, high content diversity across sports"
        },
        {
            "id": "promo_hunter",
            "name": "Promo Hunter Profile",
            "user_id": "USR_0",
            "optimal_price": 3.99,
            "badge": "Promo Hunter",
            "tag": "Promo Hunter Profile",
            "description": "Elastic visitor responsive to promotional pricing and seasonal flash discounts"
        },
        {
            "id": "cold_reader",
            "name": "Cold Visitor Profile",
            "user_id": "USR_2342",
            "optimal_price": 1.99,
            "badge": "Cold Visitor",
            "tag": "Cold Visitor Profile",
            "description": "Infrequent reader, high price elasticity, low initial conversion likelihood"
        }
    ]

    try:
        free_users = df_users[df_users['is_subscribed'] == 0].head(1000).copy().reset_index(drop=True)
        if len(free_users) < 10:
            return defaults

        X = free_users.drop(columns=['is_subscribed', 'user_id'])
        prices = [1.99, 3.99, 5.99, 9.99]
        ev_matrix = {}

        for p in prices:
            X_p = X.copy()
            X_p['price_offer_shown_usd'] = p
            probs = pipeline.predict_proba(X_p)[:, 1]
            ev_matrix[p] = probs * p

        ev_df = pd.DataFrame(ev_matrix)
        best_prices = ev_df.idxmax(axis=1)

        found = {}
        for p in [9.99, 5.99, 3.99, 1.99]:
            matching_idx = free_users[best_prices == p].index
            if len(matching_idx) > 0:
                if p == 9.99:
                    best_u_idx = ev_df.loc[matching_idx, 9.99].idxmax()
                else:
                    best_u_idx = matching_idx[0]
                found[p] = free_users.loc[best_u_idx, 'user_id']

        return [
            {
                "id": "vip_fan",
                "name": "High-Loyalty Profile",
                "user_id": found.get(9.99, "USR_869"),
                "optimal_price": 9.99,
                "badge": "High-Loyalty",
                "tag": "High-Loyalty Profile",
                "description": "High engagement, frequent tactical reader, near-zero discount sensitivity"
            },
            {
                "id": "core_reader",
                "name": "Core Reader Profile",
                "user_id": found.get(5.99, "USR_16"),
                "optimal_price": 5.99,
                "badge": "Core Reader",
                "tag": "Core Reader Profile",
                "description": "Engaged multi-session reader, high content diversity across sports"
            },
            {
                "id": "promo_hunter",
                "name": "Promo Hunter Profile",
                "user_id": found.get(3.99, "USR_0"),
                "optimal_price": 3.99,
                "badge": "Promo Hunter",
                "tag": "Promo Hunter Profile",
                "description": "Elastic visitor responsive to promotional pricing and seasonal flash discounts"
            },
            {
                "id": "cold_reader",
                "name": "Cold Visitor Profile",
                "user_id": found.get(1.99, "USR_2342"),
                "optimal_price": 1.99,
                "badge": "Cold Visitor",
                "tag": "Cold Visitor Profile",
                "description": "Infrequent reader, high price elasticity, low initial conversion likelihood"
            }
        ]
    except Exception as e:
        print(f"Dynamic persona scan fallback: {e}")
        return defaults

print("Discovering sample user personas from dataset...")
sample_personas_cache = find_sample_personas()

# 7. Define Incoming Request Models
class ArticleClick(BaseModel):
    article_id: int
    sport_category: str
    is_premium: bool
    user_id: str = "USR_2342"
    feature_overrides: Optional[Dict[str, Any]] = None

class RecommendRequest(BaseModel):
    article_id: Optional[int] = None
    sport_category: Optional[str] = None
    user_propensity_pct: Optional[float] = None
    user_id: Optional[str] = None

# Endpoint: List 4 distinct persona profiles for live testing
@app.get("/api/sample-personas")
async def get_sample_personas():
    global sample_personas_cache
    if not sample_personas_cache:
        sample_personas_cache = find_sample_personas()
    return sample_personas_cache

# 8. Hybrid Content-Based Recommendation Endpoints (GET and POST)
@app.get("/api/recommend-articles")
async def recommend_articles_get(
    article_id: Optional[int] = None,
    sport_category: Optional[str] = None,
    user_propensity_pct: Optional[float] = None,
    user_id: Optional[str] = None
):
    if user_propensity_pct is None and user_id:
        user_propensity_pct = get_user_propensity(user_id)
    elif user_propensity_pct is None:
        user_propensity_pct = 15.0

    return get_hybrid_recommendations(
        article_id=article_id,
        sport_category=sport_category,
        user_propensity_pct=user_propensity_pct
    )

@app.post("/api/recommend-articles")
async def recommend_articles_post(payload: RecommendRequest):
    propensity = payload.user_propensity_pct
    if propensity is None and payload.user_id:
        propensity = get_user_propensity(payload.user_id)
    elif propensity is None:
        propensity = 15.0

    return get_hybrid_recommendations(
        article_id=payload.article_id,
        sport_category=payload.sport_category,
        user_propensity_pct=propensity
    )

# 9. THE CORE ENDPOINT: Predict, Explain, and Recommend with What-If Overrides
@app.post("/api/score-user")
async def score_and_recommend(click_data: ArticleClick):
    try:
        # Step A: Normalize and fetch the specific user's data from 5,000 CSV database
        raw_id = str(click_data.user_id).strip()
        if not raw_id.upper().startswith("USR_"):
            if raw_id.isdigit():
                user_id = f"USR_{raw_id}"
            elif raw_id.upper().startswith("USR"):
                user_id = f"USR_{raw_id[3:].lstrip('_')}"
            else:
                user_id = raw_id
        else:
            user_id = raw_id.upper()

        user_row = df_users[df_users['user_id'] == user_id]
        if user_row.empty:
            raise HTTPException(
                status_code=404, 
                detail=f"User ID '{user_id}' not found in database. Please enter a valid ID between USR_0 and USR_{len(df_users)-1}."
            )
            
        # Extract raw user feature values (for the frontend What-If simulator)
        raw_features = {}
        for col, val in user_row.iloc[0].items():
            if col not in ['is_subscribed', 'user_id', 'price_offer_shown_usd']:
                if isinstance(val, (int, np.integer)):
                    raw_features[col] = int(val)
                elif isinstance(val, (float, np.floating)):
                    raw_features[col] = round(float(val), 4)
                else:
                    raw_features[col] = str(val)

        user_features = user_row.drop(columns=['is_subscribed', 'user_id']).copy()

        # Apply feature overrides if provided by the What-If Simulator
        applied_overrides = {}
        if click_data.feature_overrides:
            for feat, val in click_data.feature_overrides.items():
                target_col = feat
                if target_col not in user_features.columns:
                    if target_col == 'paywall_hits_last_30d' and 'paywall_hits_total' in user_features.columns:
                        target_col = 'paywall_hits_total'
                if target_col in user_features.columns:
                    try:
                        num_val = float(val)
                        user_features[target_col] = num_val
                        applied_overrides[feat] = num_val
                    except (ValueError, TypeError):
                        user_features[target_col] = val
                        applied_overrides[feat] = val

        # Step B: Dynamic Pricing & Expected Value (EV) Simulation from SQLite
        cursor = db_connection.cursor()
        cursor.execute('''
            SELECT id, offer_name, price_usd 
            FROM subscription_offers 
            WHERE is_active = 1
        ''')
        active_offers = cursor.fetchall()

        best_offer = None
        max_expected_value = -1.0
        ev_simulations = []

        for offer_id, offer_name, price_usd in active_offers:
            simulated_features = user_features.copy()
            simulated_features['price_offer_shown_usd'] = price_usd
            prob = float(pipeline.predict_proba(simulated_features)[0][1])
            expected_value = prob * price_usd

            sim_result = {
                "offer_id": offer_id,
                "offer_name": offer_name,
                "price_usd": round(float(price_usd), 2),
                "conversion_probability_percentage": round(prob * 100, 2),
                "expected_value_usd": round(float(expected_value), 2)
            }
            ev_simulations.append(sim_result)

            if expected_value > max_expected_value:
                max_expected_value = expected_value
                best_offer = sim_result

        # Winning propensity score corresponding to the optimal price offer
        propensity_score = best_offer["conversion_probability_percentage"]

        # All EV scenarios formatted cleanly for the frontend debug comparison
        all_ev_scenarios = [
            {
                "offer_name": s["offer_name"],
                "price_usd": s["price_usd"],
                "probability": s["conversion_probability_percentage"],
                "expected_value": s["expected_value_usd"],
                "is_optimal": s["price_usd"] == best_offer["price_usd"]
            }
            for s in ev_simulations
        ]

        # Step C: Run SHAP to extract the "Why" (based on optimal price point)
        user_features_optimal = user_features.copy()
        user_features_optimal['price_offer_shown_usd'] = best_offer["price_usd"]
        user_transformed = preprocessor.transform(user_features_optimal)
        feature_names_shap = preprocessor.get_feature_names_out()
        shap_values = explainer.shap_values(user_transformed)[0]
        
        # Get the top 2 driving factors for this score
        impact_df = pd.DataFrame({'feature': feature_names_shap, 'impact': shap_values})
        impact_df['abs_impact'] = impact_df['impact'].abs()
        top_factors = impact_df.sort_values(by='abs_impact', ascending=False).head(2)
        
        shap_explanation = [
            {"feature": row['feature'], "impact": float(row['impact'])}
            for _, row in top_factors.iterrows()
        ]

        # Step D: Upgraded Hybrid Content-Based NLP + Propensity Recommendation Engine
        hybrid_rec_result = get_hybrid_recommendations(
            article_id=click_data.article_id,
            sport_category=click_data.sport_category,
            user_propensity_pct=propensity_score
        )
        recommendations = hybrid_rec_result["recommendations"]

        # Step E: Return the unified JSON payload to the React frontend
        return {
            "status": "success",
            "user_id": user_id,
            "offer_name": best_offer["offer_name"],
            "optimal_price_usd": best_offer["price_usd"],
            "expected_value_usd": best_offer["expected_value_usd"],
            "propensity_score_percentage": round(float(propensity_score), 2),
            "shap_top_factors": shap_explanation,
            "sql_recommendations": recommendations,
            "nlp_recommendations": recommendations,
            "recommendation_strategy": hybrid_rec_result["strategy_description"],
            "pricing_simulations": ev_simulations,
            "all_ev_scenarios": all_ev_scenarios,
            "user_raw_features": raw_features,
            "applied_overrides": applied_overrides,
            "is_overridden": bool(applied_overrides)
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    print("Starting FastAPI server on port 8000...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)