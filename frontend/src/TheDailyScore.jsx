import React, { useState, useEffect } from 'react';
import { 
  Lock, User, X, Check, Sparkles, TrendingUp, ChevronRight, 
  Shield, Clock, Flame, Mail, CheckCircle2, Award, ArrowRight, Rss,
  ArrowLeft, BookOpen, Share2, Bookmark, Activity, BarChart3, Radio,
  ThumbsUp, MessageSquare, FileText, Dices, SlidersHorizontal, RotateCcw, Search
} from 'lucide-react';

// ── Fallback verified sports stadium image (HTTP 200 OK guaranteed) ──────────
const FALLBACK_SPORTS_IMAGE = "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?auto=format&fit=crop&w=1200&q=80";

const handleImageError = (e) => {
  if (e.currentTarget.src !== FALLBACK_SPORTS_IMAGE) {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_SPORTS_IMAGE;
  }
};

// ── Realistic sport-themed article body paragraphs ──────────────────────────
const ARTICLE_PARAGRAPHS = [
  [
    "The modern game has never been more data-driven. From second-spectrum optical tracking to on-field GPS biometric sensors recording 100 data points per second, front offices now have access to a granular understanding of player performance that would have been unthinkable a decade ago. The implications ripple across every roster decision, every scheme adjustment, and every contract negotiation.",
    "At the heart of this analytical revolution lies a deceptively simple concept: Expected Value. Rather than relying on intuition — the hallmark of the previous coaching generation — today's coordinators run probability-weighted simulations in real time. A fourth-and-two call is no longer a gut-check; it's a Bayesian inference problem with a clear, defensible answer derived from thousands of analogous situational plays.",
    "Our film-room analysis, conducted across 4,200 snaps from the first eight weeks of the season, reveals a striking pattern. Teams operating within the upper quartile of EPA (Expected Points Added) per play are systematically exploiting a specific coverage window that defensive coordinators have, until now, largely failed to account for in their pre-snap disguise packages.",
    "The structural shift is not merely tactical — it is economic. Teams investing in data infrastructure at the organizational level are seeing a compounding return on analytical capital. The correlation between a front office's analytics staff headcount and its sustained regular-season win percentage over a three-year rolling window sits at a statistically significant r=0.71, controlling for payroll tier and draft position.",
    "Looking ahead to the second half of the season, the teams best positioned to exploit these systemic inefficiencies share three organizational characteristics: a unified data taxonomy across scouting and coaching departments, an analytics-to-coaching integration pipeline with sub-24-hour turnaround, and a head coach with demonstrated comfort interpreting confidence intervals. Those three pillars, more than any single star player, will define the contenders from the pretenders come January."
  ],
  [
    "Beneath the surface of every elite athletic performance lies a biomechanical signature as unique as a fingerprint. High-speed motion capture arrays — operating at 500 frames per second — are now standard equipment in the training facilities of top-tier franchises, generating petabytes of kinematic data that paint an extraordinarily detailed portrait of human movement under extreme competitive duress.",
    "The most consequential finding from this season's telemetry dataset is the relationship between stride frequency modulation and peak power output in the final 20 meters of a sustained sprint. Athletes who maintain a cadence within 3% of their individualized optimal threshold demonstrate a 14.2% reduction in soft-tissue injury probability over an 82-game season — a figure that translates directly into tens of millions of dollars in player availability value.",
    "Our proprietary Athlete Durability Index, built on a XGBoost ensemble trained on 12 years of longitudinal biomechanical records and injury outcomes, now correctly flags high-risk movement patterns with 78% precision at the 95% recall threshold. This is not prediction in the abstract — it is a clinically actionable early-warning system that gives training staff a 4-to-6-week intervention window before a structural breakdown occurs.",
    "Tactically, these physiological insights are reshaping roster construction philosophy at the most progressive front offices. The era of the 'workhorse' is giving way to the 'load-managed specialist' — athletes whose peak burst capacity is preserved through meticulous rotation protocols calibrated to weekly exertion data rather than anecdotal coaching intuition. The numbers are unambiguous: depth chart optimization based on physiological modeling outperforms traditional role assignment by an average of 11 net points per 48 minutes.",
    "The commercial implications extend beyond the field of play. Media rights valuations increasingly depend on marquee player availability, and the teams that master predictive load management are quietly accumulating a structural competitive advantage that does not appear in any conventional standings metric. This is the frontier where sports science, data engineering, and franchise valuation converge — and the gap between the teams operating here and those still relying on instinct is widening by the week."
  ],
  [
    "In the technical debrief rooms of the sport's most competitive organizations, a quiet revolution is unfolding. The convergence of high-fidelity simulation software, real-time telemetry streams, and machine learning inference engines has fundamentally altered the speed at which strategic decisions can be validated, iterated, and deployed in competitive settings.",
    "Consider the aerodynamic tuning cycle. Where once a configuration change required a 48-hour wind tunnel session followed by three days of CFD (computational fluid dynamics) validation, teams operating at the current frontier can now model the same adjustment in under four hours using GPU-accelerated Navier-Stokes solvers cross-referenced against a proprietary database of 180,000 historical telemetry laps. The feedback loop has compressed from days to hours — a compounding advantage across a 23-event season.",
    "Our analysis of sector time variance across the top five constructors reveals a non-linear relationship between downforce level and corner exit traction in ambient temperatures above 32°C. In high-heat conditions, teams that dynamically modulate their front wing angle of attack in response to tire surface temperature telemetry — rather than setting a fixed pre-race configuration — gain an average of 0.23 seconds per lap in the critical medium-speed complex. Across a 57-lap race, that differential is race-outcome deterministic.",
    "The strategic calculus has grown correspondingly complex. Pit-stop timing is no longer determined solely by tire degradation curves; it is the output of a stochastic optimization model that simultaneously accounts for safety-car probability distributions, rival undercut windows, fuel-load delta per lap, and live weather radar data ingested at 10-second intervals. The teams whose simulation infrastructure is fastest to converge on an optimal solution — not merely a good one — are the teams leading the constructors championship.",
    "What is remarkable is not merely the sophistication of these tools, but the organizational capacity required to deploy them effectively under pressure. The most technically advanced teams invest as heavily in human-machine interface design as they do in the algorithms themselves. A model that produces the correct answer but cannot be interpreted and acted upon within a 3-second pit-wall decision window is, operationally, worthless. The intersection of computational excellence and human decision ergonomics is where championships are truly forged."
  ]
];

// ── 24 Canonical Editorial Articles (Exact 50/50 Free/Premium Split, 100% 200 OK URLs) ──
const ARTICLES_DATA = [
  {
    id: 1,
    title: "Inside the Modern Offense: How Pre-Snap Motion Revolutionized the NFL",
    author: "Marcus Vance",
    readTime: "7 min read",
    sport_category: "NFL",
    image_url: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1200&q=80",
    summary: "Coaches across the league are dismantling traditional defensive schemes with layered pre-snap motion packages. Film breakdown reveals why 2026 has become the year of defensive existential crisis.",
    is_premium: false,
    published_at: "2 hours ago"
  },
  {
    id: 2,
    title: "The Giannis Dilemma: Half-Court Spacing and the Math Behind Modern Paint Dominance",
    author: "Elena Rostova",
    readTime: "6 min read",
    sport_category: "NBA",
    image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    summary: "Why traditional perimeter traps are crumbling against high-velocity rim attacks, backed by advanced second-spectrum tracking metrics.",
    is_premium: true,
    published_at: "3 hours ago"
  },
  {
    id: 3,
    title: "Tactical Masterclass: The Counter-Press Blueprint Transforming the Champions League",
    author: "Julian Alvarez",
    readTime: "5 min read",
    sport_category: "Soccer",
    image_url: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80",
    summary: "Analyzing the transition traps that neutralized the continent's most prolific midfields this past weekend.",
    is_premium: false,
    published_at: "4 hours ago"
  },
  {
    id: 4,
    title: "Aerodynamic Secrets: How Underfloor Venturi Tunnels Dictate the 2026 Grid",
    author: "Chloe Hamilton",
    readTime: "9 min read",
    sport_category: "F1",
    image_url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    summary: "Wind tunnel telemetry shows subtle edge-vortex modifications are unlocking two-tenths of a second per lap in high-speed corners.",
    is_premium: true,
    published_at: "5 hours ago"
  },
  {
    id: 5,
    title: "The Sweeper Revolution: Pitch Design and the Demise of Traditional Sliders",
    author: "David Ortiz-Bates",
    readTime: "8 min read",
    sport_category: "MLB",
    image_url: "https://images.unsplash.com/photo-1508344928928-7165b67de128?auto=format&fit=crop&w=1200&q=80",
    summary: "Grip variance and seam-shifted wake physics have rendered standard breaking balls obsolete across the American League.",
    is_premium: true,
    published_at: "6 hours ago"
  },
  {
    id: 6,
    title: "Scouting the Next Phenom: Real Madrid's Proprietary Global Analytics Engine",
    author: "Mateo Silva",
    readTime: "4 min read",
    sport_category: "Soccer",
    image_url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80",
    summary: "Inside Valdebebas, where biometric data pipelines and scout intuition converge to identify South America's premier teenagers.",
    is_premium: false,
    published_at: "8 hours ago"
  },
  {
    id: 7,
    title: "The Two-High Safety Renaissance: How NFL Defenses Are Neutralizing Deep Explosions",
    author: "Marcus Vance",
    readTime: "6 min read",
    sport_category: "NFL",
    image_url: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=1200&q=80",
    summary: "Defensive coordinators are trading aggressive blitz packages for zone ceilings. We charted 4,000 snaps to explain why passing EPA has plummeted.",
    is_premium: true,
    published_at: "9 hours ago"
  },
  {
    id: 8,
    title: "Wemby's Defensive Orbit: The True Range of San Antonio's 8-Foot Ceiling",
    author: "Elena Rostova",
    readTime: "5 min read",
    sport_category: "NBA",
    image_url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    summary: "Opponents are shooting 14% lower within 10 feet when Victor Wembanyama is on the floor. An anatomical look at the game's most terrifying rim protector.",
    is_premium: false,
    published_at: "11 hours ago"
  },
  {
    id: 9,
    title: "Telemetry Telepathy: How Max Verstappen Decodes Mid-Corner Balance in 15 Milliseconds",
    author: "Chloe Hamilton",
    readTime: "8 min read",
    sport_category: "F1",
    image_url: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=1200&q=80",
    summary: "Oversteer corrections at 180 mph that look erratic on broadcast TV are calculated micro-rotations. Telemetry data breaks down his throttle mastery.",
    is_premium: true,
    published_at: "13 hours ago"
  },
  {
    id: 10,
    title: "Moneyball 3.0: Bat-Speed Sensors and the New Currency of MLB Exit Velocity",
    author: "David Ortiz-Bates",
    readTime: "7 min read",
    sport_category: "MLB",
    image_url: "https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&w=1200&q=80",
    summary: "With Hawk-Eye tracking every swing in millimeter increments, front offices are identifying swing efficiency months before box scores reflect the shift.",
    is_premium: false,
    published_at: "14 hours ago"
  },
  {
    id: 11,
    title: "The False Nine Reborn: Arsenal's Positional Fluidity and Fluid Triangle Rotation",
    author: "Julian Alvarez",
    readTime: "6 min read",
    sport_category: "Soccer",
    image_url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
    summary: "Mikel Arteta has reconstructed the frontline. By vacating central space, inverted wingers and overlapping fullbacks create surgical overloads.",
    is_premium: true,
    published_at: "16 hours ago"
  },
  {
    id: 12,
    title: "Draft Board Confidential: Scouting the Top 5 Quarterbacks in the 2027 Class",
    author: "Marcus Vance",
    readTime: "10 min read",
    sport_category: "NFL",
    image_url: "https://images.unsplash.com/photo-1580086319619-3ed498161c77?auto=format&fit=crop&w=1200&q=80",
    summary: "General managers and national scouts share anonymous assessments on the next generational crop of passers, mechanics, and processing speeds.",
    is_premium: false,
    published_at: "18 hours ago"
  },
  {
    id: 13,
    title: "Ferrari's Power Unit Gamble: The Compression Ratio Gamble Aiming for Silverstone Glory",
    author: "Chloe Hamilton",
    readTime: "7 min read",
    sport_category: "F1",
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    summary: "Maranello has redesigned their turbocharger plenum. If dyno numbers hold in qualifying conditions, the Scuderia could shake up the constructors title.",
    is_premium: false,
    published_at: "20 hours ago"
  },
  {
    id: 14,
    title: "The Pick-and-Roll Disruption: How Oklahoma City Weaponizes Length Across Five Positions",
    author: "Elena Rostova",
    readTime: "5 min read",
    sport_category: "NBA",
    image_url: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=80",
    summary: "Switching everything without conceding paint penetration requires athletic synchronization. Film breakdown shows OKC's generational blueprint.",
    is_premium: true,
    published_at: "22 hours ago"
  },
  {
    id: 15,
    title: "The 100 MPH Normal: Why Pitching Injuries Rose Along with Triple-Digit Fastballs",
    author: "David Ortiz-Bates",
    readTime: "9 min read",
    sport_category: "MLB",
    image_url: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=1200&q=80",
    summary: "Orthopedic surgeons, pitching coaches, and union reps weigh in on the biomechanical threshold of the human elbow in pursuit of velocity.",
    is_premium: true,
    published_at: "1 day ago"
  },
  {
    id: 16,
    title: "Bellingham’s Evolution: From Box-to-Box Engine to Complete Offensive Focal Point",
    author: "Mateo Silva",
    readTime: "6 min read",
    sport_category: "Soccer",
    image_url: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1200&q=80",
    summary: "Positional heatmap analysis demonstrates how the English midfielder dictates tempo and disrupts defensive transitions in the final third.",
    is_premium: false,
    published_at: "1 day ago"
  },
  {
    id: 17,
    title: "Red Zone Efficiency: The Unstoppable Short-Yardage Playbook Transforming NFL Fourth Downs",
    author: "Marcus Vance",
    readTime: "6 min read",
    sport_category: "NFL",
    image_url: "https://images.unsplash.com/photo-1511225070737-5af5ac9a690d?auto=format&fit=crop&w=1200&q=80",
    summary: "Analytics departments have convinced head coaches that punting on fourth-and-two is malpractice. The personnel packages guaranteeing conversion.",
    is_premium: true,
    published_at: "1 day ago"
  },
  {
    id: 18,
    title: "Tyrese Haliburton’s Vision: The Geometry of NBA Transition Passing",
    author: "Elena Rostova",
    readTime: "5 min read",
    sport_category: "NBA",
    image_url: "https://images.unsplash.com/photo-1505666287802-931dc83948e9?auto=format&fit=crop&w=1200&q=80",
    summary: "Cross-court hit-aheads, delayed skips, and the fastest release time in basketball: an in-depth optical tracking study of transition creation.",
    is_premium: false,
    published_at: "2 days ago"
  },
  {
    id: 19,
    title: "The Inverted Fullback Playbook: How Modern Wing-Backs Orchestrate Midfield Superiority",
    author: "Julian Alvarez",
    readTime: "7 min read",
    sport_category: "Soccer",
    image_url: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1200&q=80",
    summary: "By stepping inside into the half-spaces, modern defenders create numerical +1 overloads that dismantle conventional pressing traps across European football.",
    is_premium: true,
    published_at: "2 days ago"
  },
  {
    id: 20,
    title: "Brake Bias Optimization: The Millisecond Telemetry Winning Wet-Weather Grands Prix",
    author: "Chloe Hamilton",
    readTime: "8 min read",
    sport_category: "F1",
    image_url: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80",
    summary: "Hydroplaning thresholds and regenerative brake torque distribution: how steering-wheel rotary dials allow drivers to survive changeable rain conditions.",
    is_premium: false,
    published_at: "2 days ago"
  },
  {
    id: 21,
    title: "The Seam-Shifted Wake Frontier: Why Gyro-Spin Fastballs Fail in October Postseason",
    author: "David Ortiz-Bates",
    readTime: "6 min read",
    sport_category: "MLB",
    image_url: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&w=1200&q=80",
    summary: "Non-Magnus aerodynamic lift caused by raised baseball seams creates late tailing action that traditional high-spin pitch models failed to anticipate.",
    is_premium: false,
    published_at: "3 days ago"
  },
  {
    id: 22,
    title: "Disguised Cover-3 Cloud: Why Elite Quarterbacks Struggle Against Stunted Fronts",
    author: "Marcus Vance",
    readTime: "8 min read",
    sport_category: "NFL",
    image_url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
    summary: "Pre-snap single-high looks rolling into inverted trap-coverages at the snap: the statistical blueprint suffocating top NFL passing offenses.",
    is_premium: true,
    published_at: "3 days ago"
  },
  {
    id: 23,
    title: "Clutch Shot Selection: Expected Value in High-Leverage Final Two Minutes",
    author: "Elena Rostova",
    readTime: "5 min read",
    sport_category: "NBA",
    image_url: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1200&q=80",
    summary: "Tracking 3,200 fourth-quarter possessions to quantify the true expected value of mid-range isolations versus corner threes when games are within 3 points.",
    is_premium: false,
    published_at: "4 days ago"
  },
  {
    id: 24,
    title: "Active Suspension Telemetry: The CFD Secrets Behind High-Rake Ground Effect Cars",
    author: "Chloe Hamilton",
    readTime: "9 min read",
    sport_category: "F1",
    image_url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    summary: "How microscopic changes in ride height generate exponentially increasing venturi suction, and why the line between downforce and catastrophic porpoising is razor thin.",
    is_premium: true,
    published_at: "4 days ago"
  }
];

// ── Live Match Telemetry Ticker Data ─────────────────────────────────────────
const LIVE_TELEMETRY_GAMES = [
  {
    id: "game_nfl",
    sport: "NFL",
    status: "Q4 1:42",
    team1: "KC",
    score1: 27,
    team2: "BUF",
    score2: 24,
    winProbTeam: "KC",
    winProbPct: 76.4,
    telemetry: "+0.18 EPA/snap • Win Prob Model v4.1"
  },
  {
    id: "game_nba",
    sport: "NBA",
    status: "Q4 2:14",
    team1: "BOS",
    score1: 108,
    team2: "NYK",
    score2: 104,
    winProbTeam: "BOS",
    winProbPct: 84.2,
    telemetry: "Possession Win Prob • 68.4% eFG"
  },
  {
    id: "game_soccer",
    sport: "SOCCER",
    status: "81'",
    team1: "RMA",
    score1: 2,
    team2: "MCI",
    score2: 1,
    winProbTeam: "RMA",
    winProbPct: 73.8,
    telemetry: "xG: 2.74 vs 1.62 • Field Tilt 68%"
  },
  {
    id: "game_mlb",
    sport: "MLB",
    status: "Top 8th",
    team1: "LAD",
    score1: 4,
    team2: "NYY",
    score2: 3,
    winProbTeam: "LAD",
    winProbPct: 81.5,
    telemetry: "Leverage Index: 2.84 • Bullpen xFIP 2.91"
  },
  {
    id: "game_f1",
    sport: "F1",
    status: "Lap 49/57",
    team1: "VER",
    score1: "+1.42s",
    team2: "NOR",
    score2: "P2",
    winProbTeam: "VER",
    winProbPct: 89.6,
    telemetry: "Tyre Delta: Soft +0.4s • Pit Gap 2.1s"
  }
];

// ── Sport-Specific Telemetry Metrics for Reader Mode ─────────────────────────
const SPORT_TELEMETRY_METRICS = {
  NFL: [
    { label: "Expected Points Added", value: "+0.28 EPA", percentile: "94th percentile", desc: "Per designed pre-snap motion snap" },
    { label: "Pre-Snap Motion Win %", value: "64.2%", percentile: "+11.8% vs NFL Avg", desc: "Dismantling single-high disguise" },
    { label: "Coverage Disruption Delta", value: "+18.4%", percentile: "Top 3 Tier", desc: "Safety rotation forced post-snap" }
  ],
  NBA: [
    { label: "True Shooting Efficiency", value: "68.4% TS", percentile: "League Top 2%", desc: "Paint + corner-3 shot profile" },
    { label: "Rim Contested FG% Allowed", value: "42.1%", percentile: "-14.3% vs league", desc: "Within 6 feet of basket" },
    { label: "On-Off Net Differential", value: "+14.8 Net", percentile: "99th percentile", desc: "Per 100 offensive possessions" }
  ],
  Soccer: [
    { label: "Expected Goals (xG)", value: "2.74 xG", percentile: "+1.12 xG Delta", desc: "High-value central box entries" },
    { label: "High-Turnover Gegenpress", value: "14 per 90", percentile: "96th percentile", desc: "Turnovers won in attacking third" },
    { label: "Progressive Pass Rate", value: "89.2%", percentile: "Top 5% UEFA", desc: "Breaking lines into half-spaces" }
  ],
  F1: [
    { label: "Venturi Downforce Delta", value: "+3.8% DF", percentile: "Wind Tunnel Val", desc: "Underfloor ground-effect suction" },
    { label: "Sector 2 Apex Velocity", value: "+8.4 km/h", percentile: "Fastest in Class", desc: "Oversteer micro-correction telemetry" },
    { label: "Tire Thermal Degradation", value: "-0.12s/lap", percentile: "Optimal Window", desc: "Bulk vs surface temperature delta" }
  ],
  MLB: [
    { label: "Sweeper Horizontal Sweep", value: "+17.4 in", percentile: "3,150 RPM", desc: "Seam-shifted wake air displacement" },
    { label: "Hard-Hit Exit Velo Allowed", value: "84.2 mph", percentile: "Bottom 3% in MLB", desc: "Suppression of barrel contact" },
    { label: "Breaking Ball Whiff Rate", value: "44.6% SwStr", percentile: "Statcast Elite", desc: "Swinging strike rate on two-strikes" }
  ]
};

// ── Homepage Deep-Dive Analytics Dossiers ────────────────────────────────────
const ANALYTICS_DOSSIERS = [
  {
    id: "dossier_1",
    sport: "NFL",
    title: "The 2026 NFL Red Zone Predictive Playbook: Goal-Line Personnel Clustering & EPA Distribution",
    author: "Marcus Vance",
    readTime: "12 min study",
    dataset: "140,000 Goal-Line Snaps",
    model: "XGBoost v3.2 Classifier",
    image: "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=800&q=80",
    abstract: "Clustering personnel groupings inside the 10-yard line reveals why heavy 22-personnel packages produce negative EPA against light boxes."
  },
  {
    id: "dossier_2",
    sport: "NBA",
    title: "NBA Spatial Geometry & Corner-3 Economics: Half-Court Shot Quality Architecture",
    author: "Elena Rostova",
    readTime: "10 min study",
    dataset: "Second-Spectrum 82-Game Panel",
    model: "Spatial Poisson Decay Model",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80",
    abstract: "How weak-side rotational gravity suppresses corner-3 frequency, and why 4-out spacing outperforms 5-out against elite rim protectors."
  },
  {
    id: "dossier_3",
    sport: "Soccer",
    title: "Champions League High-Press Transition Matrix: Quantifying Counter-Press Recovery Windows",
    author: "Julian Alvarez",
    readTime: "14 min study",
    dataset: "UEFA 2025/26 Tracking Data",
    model: "Field Tilt Markov Chains",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80",
    abstract: "Measuring counter-press efficiency in 5-second post-turnover intervals shows high-block teams recover possession 2.4x faster."
  },
  {
    id: "dossier_4",
    sport: "F1",
    title: "Venturi Underfloor Ground Effect Telemetry: CFD Aerodynamics Under Thermal Stress",
    author: "Chloe Hamilton",
    readTime: "15 min study",
    dataset: "180,000 Wind-Tunnel Lap Sims",
    model: "Navier-Stokes GPU Solver",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80",
    abstract: "Boundary-layer separation beneath the diffuser causes non-linear downforce loss during high-ambient track temperature weekends."
  }
];

// ── Top Beat Writers Newsroom ────────────────────────────────────────────────
const TOP_BEAT_WRITERS = [
  {
    name: "Marcus Vance",
    role: "Senior NFL Analyst & Film Room Host",
    sport: "NFL",
    handle: "@mvance_nfl",
    avatar: "MV",
    articlesCount: "148 stories"
  },
  {
    name: "Elena Rostova",
    role: "NBA Analytics & Biometrics Specialist",
    sport: "NBA",
    handle: "@erostova_nba",
    avatar: "ER",
    articlesCount: "112 stories"
  },
  {
    name: "Chloe Hamilton",
    role: "F1 Telemetry & Technical Writer",
    sport: "F1",
    handle: "@chloe_f1",
    avatar: "CH",
    articlesCount: "94 stories"
  },
  {
    name: "David Ortiz-Bates",
    role: "MLB Pitch Design & Statcast Columnist",
    sport: "MLB",
    handle: "@ortiz_mlb",
    avatar: "DO",
    articlesCount: "126 stories"
  }
];

// ── Default fallback personas across behavioral profiles (Prices dynamically computed by XGBoost) ──
const DEFAULT_PERSONAS = [
  {
    id: "vip_fan",
    name: "High-Loyalty Profile",
    user_id: "USR_869",
    optimal_price: 9.99,
    badge: "High-Loyalty",
    tag: "High-Loyalty Profile",
    description: "High engagement, frequent tactical reader, near-zero discount sensitivity"
  },
  {
    id: "core_reader",
    name: "Core Reader Profile",
    user_id: "USR_16",
    optimal_price: 5.99,
    badge: "Core Reader",
    tag: "Core Reader Profile",
    description: "Engaged multi-session reader, high content diversity across sports"
  },
  {
    id: "promo_hunter",
    name: "Promo Hunter Profile",
    user_id: "USR_0",
    optimal_price: 3.99,
    badge: "Promo Hunter",
    tag: "Promo Hunter Profile",
    description: "Elastic visitor responsive to promotional pricing and seasonal flash discounts"
  },
  {
    id: "cold_reader",
    name: "Cold Visitor Profile",
    user_id: "USR_2342",
    optimal_price: 1.99,
    badge: "Cold Visitor",
    tag: "Cold Visitor Profile",
    description: "Infrequent reader, high price elasticity, low initial conversion likelihood"
  }
];

// ── Key Simulation Features for the What-If Live Simulator ───────────────────
const SIMULATION_FEATURES = [
  {
    key: 'checkout_abandonment_count',
    label: 'Checkout Abandonments',
    min: 0,
    max: 5,
    step: 1,
    desc: 'Initiated checkout sessions left uncompleted. High values indicate purchase intent with price friction.'
  },
  {
    key: 'distinct_authors_read',
    label: 'Distinct Authors Read',
    min: 0,
    max: 15,
    step: 1,
    desc: 'Unique staff writers read. Reflects wide cross-beat loyalty to our investigative newsroom.'
  },
  {
    key: 'macro_purchasing_power_index',
    label: 'Purchasing Power Index',
    min: 5,
    max: 100,
    step: 1,
    desc: 'Geographic & device purchasing economic score (range: 5 to 100).'
  },
  {
    key: 'historical_discount_sensitivity',
    label: 'Discount Sensitivity Ratio',
    min: 0.0,
    max: 1.0,
    step: 0.05,
    desc: 'Price elasticity ratio: 0.0 = inelastic (willing full price), 1.0 = promo-only convert.'
  },
  {
    key: 'paywall_hits_total',
    label: 'Paywall Hits (Total Attempted)',
    min: 0,
    max: 15,
    step: 1,
    desc: 'Total times this visitor encountered the paywall trying to read locked investigations.'
  }
];

export default function TheDailyScoreApp() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [mlData, setMlData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Reader Mode state
  const [readingArticle, setReadingArticle] = useState(null);
  const [hasPaid, setHasPaid] = useState(false);
  const [communityPollVote, setCommunityPollVote] = useState(null);

  // Hybrid Content-Based NLP + Retention Recommendations State
  const [readerRecs, setReaderRecs] = useState([]);
  const [recStrategyInfo, setRecStrategyInfo] = useState(null);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  // Live User Persona Switcher & Any User ID Search State (5,000 CSV Users)
  const [personas, setPersonas] = useState(DEFAULT_PERSONAS);
  const [selectedUser, setSelectedUser] = useState("USR_869");
  const [typedUserId, setTypedUserId] = useState('');
  const [userLookupError, setUserLookupError] = useState(null);

  // Live Feature What-If Overrides State
  const [featureOverrides, setFeatureOverrides] = useState({});

  const categories = ['ALL', 'NFL', 'NBA', 'MLB', 'SOCCER', 'F1'];

  // Load dynamically discovered sample personas from the FastAPI backend on mount
  useEffect(() => {
    async function fetchPersonas() {
      try {
        const response = await fetch('http://localhost:8000/api/sample-personas');
        if (response.ok) {
          const data = await response.json();
          const list = Array.isArray(data) ? data : (data.personas || []);
          if (list.length > 0) {
            setPersonas(list);
            setSelectedUser((prev) => {
              const exists = list.some(p => p.user_id === prev);
              return exists ? prev : list[0].user_id;
            });
          }
        }
      } catch (error) {
        console.warn('Could not fetch personas from /api/sample-personas, using defaults:', error);
      }
    }
    fetchPersonas();
  }, []);

  // Fetch Hybrid Content-Based NLP Recommendations for Reader Mode
  const fetchRecommendations = async (article, userId) => {
    if (!article) return;
    const targetUserId = userId || selectedUser;
    setIsLoadingRecs(true);
    try {
      const response = await fetch('http://localhost:8000/api/recommend-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_id: article.id,
          sport_category: article.sport_category,
          user_id: targetUserId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReaderRecs(data.recommendations || []);
        setRecStrategyInfo({
          strategy_mode: data.strategy_mode,
          strategy_name: data.strategy_name,
          strategy_description: data.strategy_description,
          user_propensity_pct: data.user_propensity_pct,
        });
      }
    } catch (error) {
      console.warn('Failed to fetch NLP recommendations from /api/recommend-articles:', error);
      const fallback = ARTICLES_DATA.filter(a => a.id !== article.id).slice(0, 3);
      setReaderRecs(fallback.map((a, i) => ({
        ...a,
        match_score_pct: 88 - i * 5,
        strategy_label: a.is_premium ? "VIP Conversion Target" : "Retention Hook (Free)",
        top_keywords: [a.sport_category.toLowerCase(), "analytics"]
      })));
    } finally {
      setIsLoadingRecs(false);
    }
  };

  // Reusable scoring helper for any user_id and optional feature overrides
  const fetchScoreForUser = async (article, userId, currentOverrides) => {
    const targetUserId = userId || selectedUser;
    const overridesToPass = currentOverrides !== undefined ? currentOverrides : featureOverrides;
    setIsLoading(true);
    setUserLookupError(null);

    try {
      const response = await fetch('http://localhost:8000/api/score-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          article_id: article.id,
          sport_category: article.sport_category,
          is_premium: article.is_premium,
          user_id: targetUserId,
          feature_overrides: Object.keys(overridesToPass).length > 0 ? overridesToPass : undefined,
        }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson?.detail || `Server returned status: ${response.status}`);
      }

      const data = await response.json();
      setMlData(data);
    } catch (error) {
      console.error('Failed to fetch ML Propensity Score & SHAP:', error);
      setUserLookupError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Switch persona or custom user ID live
  const handlePersonaChange = async (newUserId) => {
    setSelectedUser(newUserId);
    setFeatureOverrides({}); // Reset overrides on user switch so new user starts with authentic CSV features
    setHasPaid(false);
    setUserLookupError(null);

    if (readingArticle) {
      fetchRecommendations(readingArticle, newUserId);
    }

    if (isPaywallOpen) {
      const targetArticle = selectedArticle || readingArticle || ARTICLES_DATA.find(a => a.is_premium) || ARTICLES_DATA[1];
      if (targetArticle) {
        await fetchScoreForUser(targetArticle, newUserId, {});
      }
    }
  };

  // Random user picker across all 5,000 CSV users
  const handleRandomUser = () => {
    const randomNum = Math.floor(Math.random() * 5000);
    const randId = `USR_${randomNum}`;
    handlePersonaChange(randId);
  };

  // Custom user lookup form submit
  const handleApplyTypedUser = (e) => {
    if (e) e.preventDefault();
    const clean = typedUserId.trim();
    if (!clean) return;
    let targetId = clean.toUpperCase();
    if (!targetId.startsWith('USR_')) {
      if (/^\d+$/.test(targetId)) {
        targetId = `USR_${targetId}`;
      } else if (targetId.startsWith('USR')) {
        targetId = `USR_${targetId.slice(3).replace(/^_+/, '')}`;
      }
    }
    handlePersonaChange(targetId);
    setTypedUserId('');
  };

  // What-If Feature Slider change handler: triggers live re-scoring
  const handleSliderChange = (featKey, value) => {
    const numVal = Number(value);
    const updated = {
      ...featureOverrides,
      [featKey]: numVal
    };
    setFeatureOverrides(updated);
    const targetArticle = selectedArticle || readingArticle || ARTICLES_DATA.find(a => a.is_premium) || ARTICLES_DATA[1];
    if (targetArticle) {
      fetchScoreForUser(targetArticle, selectedUser, updated);
    }
  };

  // Reset What-If Overrides back to CSV defaults
  const handleResetOverrides = () => {
    setFeatureOverrides({});
    const targetArticle = selectedArticle || readingArticle || ARTICLES_DATA.find(a => a.is_premium) || ARTICLES_DATA[1];
    if (targetArticle) {
      fetchScoreForUser(targetArticle, selectedUser, {});
    }
  };

  // Handler for article clicks — Reader Mode + ML paywall integration + Smooth Scroll
  const handleArticleClick = async (article) => {
    const fullArticle = ARTICLES_DATA.find(a => a.id === article.id) || article;

    setReadingArticle(fullArticle);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    fetchRecommendations(fullArticle, selectedUser);

    if (fullArticle.is_premium && !hasPaid) {
      setSelectedArticle(fullArticle);
      setIsPaywallOpen(true);
      await fetchScoreForUser(fullArticle, selectedUser);
    }
  };

  // Category filter navigation handler: exits reader mode, filters feed & scrolls to top
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    if (readingArticle) {
      setReadingArticle(null);
      setHasPaid(false);
      setSelectedArticle(null);
      setIsPaywallOpen(false);
      setMlData(null);
      setReaderRecs([]);
      setRecStrategyInfo(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back-to-home: reset all reader state and smoothly scroll to top
  const handleBackToHome = () => {
    setReadingArticle(null);
    setHasPaid(false);
    setSelectedArticle(null);
    setIsPaywallOpen(false);
    setMlData(null);
    setReaderRecs([]);
    setRecStrategyInfo(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  // Filter articles based on active category
  const filteredArticles = activeCategory === 'ALL'
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter(art => art.sport_category.toUpperCase() === activeCategory);

  const heroArticle = filteredArticles[0] || ARTICLES_DATA[0];
  const subHeroArticles = filteredArticles.slice(1, 3);
  const mainFeedArticles = filteredArticles.slice(3);

  // Trending articles for the right sidebar (5 articles across diverse sports)
  const trendingArticles = [
    ARTICLES_DATA[3], // F1 (Premium)
    ARTICLES_DATA[1], // NBA (Premium)
    ARTICLES_DATA[0], // NFL (Free)
    ARTICLES_DATA[4], // MLB (Premium)
    ARTICLES_DATA[2], // Soccer (Free)
  ];

  // Recommendations for the paywall modal fallback
  const recommendedArticles = ARTICLES_DATA.filter(art => art.id !== selectedArticle?.id).slice(0, 3);

  // Pick a paragraph set based on article id for deterministic variety
  const articleParagraphs = ARTICLE_PARAGRAPHS[(readingArticle?.id ?? 0) % ARTICLE_PARAGRAPHS.length];
  const isBodyBlurred = readingArticle?.is_premium && !hasPaid;

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Editorial Google Fonts Stylesheet */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&display=swap');
        .font-headline {
          font-family: 'Playfair Display', 'Merriweather', Georgia, serif;
        }
        .font-serif-body {
          font-family: 'Merriweather', Georgia, serif;
        }
      `}</style>

      {/* 1. TOP UTILITY BAR / BRAND STRIP */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-md z-30 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Logo */}
            <div className="flex items-center gap-3">
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); handleBackToHome(); }} 
                className="group"
              >
                <span className="font-headline text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111827] group-hover:text-amber-600 transition-colors">
                  The Daily Score
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-gray-400 uppercase -mt-1 font-semibold">
                  In-Depth Sports Journalism &amp; Analytics
                </span>
              </a>
            </div>

            {/* Middle: Categories */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm font-semibold tracking-wider text-gray-700">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-3 py-1.5 transition-all duration-150 relative text-xs uppercase tracking-widest ${
                    activeCategory === cat
                      ? 'text-[#111827] font-bold after:content-[""] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px] after:bg-[#111827]'
                      : 'text-gray-500 hover:text-[#111827]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            {/* Right: Live Persona Switcher, Randomizer, User Search & Gold Subscribe Button */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Comprehensive 5,000 Users Persona & Lookup Control Center */}
              <div className="flex items-center bg-slate-900 text-white rounded-lg p-1 sm:p-1.5 border border-slate-700 shadow-sm hover:border-amber-400/60 transition-all gap-1 sm:gap-1.5">
                {/* Profile Preset Select (No hardcoded prices!) */}
                <div className="flex items-center">
                  <span className="text-amber-400 text-xs px-1">👤</span>
                  <select
                    id="persona-switcher"
                    value={personas.some(p => p.user_id === selectedUser) ? selectedUser : ""}
                    onChange={(e) => {
                      if (e.target.value) handlePersonaChange(e.target.value);
                    }}
                    className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer py-1 pr-1 font-sans hover:text-amber-300 transition-colors max-w-[125px] sm:max-w-[170px] truncate"
                    aria-label="Simulate User Persona"
                  >
                    <option value="" disabled className="bg-slate-900 text-gray-400">
                      Preset Profiles…
                    </option>
                    {personas.map((p) => (
                      <option key={p.user_id} value={p.user_id} className="bg-slate-900 text-white py-1">
                        {p.user_id}: {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 🎲 Random User Button (Pick any of the 5,000 CSV users) */}
                <button
                  onClick={handleRandomUser}
                  title="Pick random user from 5,000 CSV dataset"
                  className="flex items-center gap-1 bg-slate-800 hover:bg-amber-500 hover:text-black text-amber-400 text-[11px] font-bold px-2 py-1 rounded transition-colors border border-slate-700 hover:border-amber-400"
                >
                  <Dices className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Random</span>
                </button>

                {/* Any CSV User Lookup Input */}
                <form onSubmit={handleApplyTypedUser} className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      value={typedUserId}
                      onChange={(e) => setTypedUserId(e.target.value)}
                      placeholder={selectedUser || "USR_#"}
                      className="w-16 sm:w-20 bg-slate-950 border border-slate-700 focus:border-amber-400 text-[11px] font-mono font-bold text-amber-300 placeholder-gray-500 px-1.5 py-1 rounded-l focus:outline-none uppercase"
                      title="Type any User ID (e.g., USR_1450 or 1450) from 5,000 CSV records"
                    />
                    <button
                      type="submit"
                      title="Lookup User in 5,000 CSV records"
                      className="bg-slate-800 hover:bg-amber-500 hover:text-black text-gray-300 px-1.5 py-1 rounded-r border border-l-0 border-slate-700 hover:border-amber-400 transition-colors"
                    >
                      <Search className="w-3 h-3" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Active User Chip */}
              <div 
                title={`Active User in XGBoost Pipeline: ${selectedUser}`}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-gray-500 text-[10px] uppercase font-bold">Active:</span>
                <strong className="text-slate-900 font-extrabold">{selectedUser}</strong>
              </div>

              <button
                onClick={() => {
                  const target = ARTICLES_DATA.find(a => a.is_premium) || ARTICLES_DATA[1];
                  handleArticleClick(target);
                }}
                className="bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-white px-3 sm:px-5 py-2 rounded font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-sm hover:shadow transition-all duration-150 flex items-center gap-1.5 shrink-0"
              >
                <Sparkles className="w-4 h-4 fill-white/20" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Submenu for Categories */}
        <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-gray-100 gap-4 text-xs font-semibold uppercase tracking-wider no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`whitespace-nowrap pb-1 ${
                activeCategory === cat ? 'text-[#111827] border-b-2 border-[#111827]' : 'text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* 2. LIVE MATCH TELEMETRY & ML WIN PROBABILITY TICKER BAR */}
      <div className="bg-[#090D16] text-white border-b border-slate-800 text-xs py-2.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Live Pulse Indicator */}
          <div className="flex items-center gap-2 shrink-0 border-r border-slate-800 pr-3 sm:pr-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1">
              <Radio className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">LIVE TELEMETRY</span>
              <span className="sm:hidden">LIVE</span>
            </span>
          </div>

          {/* Matchups Track */}
          <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar py-0.5 font-mono text-[11px] flex-1">
            {LIVE_TELEMETRY_GAMES.map((game) => (
              <div 
                key={game.id} 
                className="flex items-center gap-2 shrink-0 bg-slate-900/90 px-3 py-1 rounded-md border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-slate-800 text-amber-400 rounded">
                  {game.sport}
                </span>
                <span className="font-semibold text-white">
                  {game.team1} <strong className="text-amber-400">{game.score1}</strong> - {game.team2} <strong>{game.score2}</strong>
                </span>
                <span className="text-gray-400 text-[10px]">• {game.status} •</span>
                <div className="flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded text-[10px]">
                  <span className="text-emerald-300 font-bold">{game.winProbTeam} {game.winProbPct}%</span>
                  <div className="w-8 bg-slate-800 rounded-full h-1 overflow-hidden hidden md:block">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${game.winProbPct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Model Engine Label */}
          <div className="hidden xl:flex items-center gap-1.5 shrink-0 pl-3 border-l border-slate-800 text-[10px] text-gray-400 font-mono">
            <Activity className="w-3 h-3 text-amber-400" />
            <span>XGBoost Match Prob v4.2</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* READER MODE — full-page article view (replaces main feed)    */}
      {/* ============================================================ */}
      {readingArticle ? (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          {/* Back to Home button */}
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#111827] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>

          {/* Category + timestamp */}
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 mb-3">
            <span>{readingArticle.sport_category}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400 font-medium">{readingArticle.published_at}</span>
            {readingArticle.is_premium && (
              <span className="inline-flex items-center gap-1 bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                <Lock className="w-2.5 h-2.5 stroke-[2.5]" /> Premium
              </span>
            )}
          </div>

          {/* Article headline */}
          <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] text-[#111827] mb-6">
            {readingArticle.title}
          </h1>

          {/* Byline row */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 shadow-sm border border-amber-400/20">
                {readingArticle.author.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111827]">{readingArticle.author}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{readingArticle.readTime}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button title="Bookmark" className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
              <button title="Share" className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hero image with verified fallback */}
          <div className="relative overflow-hidden rounded-sm bg-gray-100 shadow-sm aspect-[16/9] mb-8">
            <img
              src={readingArticle.image_url}
              alt={readingArticle.title}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Article deck / lead */}
          <p className="font-serif-body text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 italic border-l-4 border-amber-400 pl-5">
            {readingArticle.summary}
          </p>

          {/* ── Article body (blurred if premium & !hasPaid) ── */}
          <div className={`relative transition-all duration-300 ${
            isBodyBlurred ? 'select-none' : ''
          }`}>
            {/* Paragraphs */}
            <div className={`space-y-6 ${
              isBodyBlurred ? 'blur-sm pointer-events-none' : ''
            }`}>
              {articleParagraphs.slice(0, 2).map((para, i) => (
                <p key={i} className="font-serif-body text-[#1f2937] text-base sm:text-[17px] leading-[1.9] tracking-[0.01em]">
                  {para}
                </p>
              ))}

              {/* PROPRIETARY TELEMETRY & FILM ROOM BREAKDOWN CALLOUT BOX */}
              <div className="my-8 p-5 sm:p-6 bg-slate-950 text-white rounded-xl border border-slate-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                
                {/* Callout Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-slate-800 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="p-1.5 bg-amber-500/20 text-amber-400 rounded ring-1 ring-amber-400/30">
                      <Activity className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                        PROPRIETARY TELEMETRY &amp; FILM ROOM BREAKDOWN
                      </span>
                      <h4 className="text-base sm:text-lg font-headline font-bold text-white">
                        {readingArticle.sport_category} Next-Gen Quantitative Film Study
                      </h4>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-900 text-gray-300 border border-slate-700 self-start sm:self-auto">
                    Optical Second-Spectrum Tracking (500 fps)
                  </span>
                </div>

                {/* 3 Quantitative Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(SPORT_TELEMETRY_METRICS[readingArticle.sport_category] || SPORT_TELEMETRY_METRICS.NFL).map((metric, idx) => (
                    <div key={idx} className="bg-slate-900/90 rounded-lg p-3.5 border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">
                          {metric.label}
                        </span>
                        <div className="text-xl sm:text-2xl font-black font-mono text-amber-400 mt-1">
                          {metric.value}
                        </div>
                      </div>
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-emerald-400 font-semibold">{metric.percentile}</span>
                        <span className="text-gray-500 truncate max-w-[110px]">{metric.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400 font-serif-body mt-4 italic">
                  * Telemetry derived from The Daily Score Data Intelligence Pipeline, normalized across 12 years of longitudinal match film.
                </p>
              </div>

              {/* Pull-quote for visual richness */}
              <blockquote className="border-l-4 border-amber-400 pl-6 my-10">
                <p className="font-headline text-xl sm:text-2xl font-bold text-[#111827] italic leading-snug">
                  "The teams mastering predictive analytics aren't just winning games — they're compounding an organizational advantage that conventional metrics can't capture."
                </p>
                <footer className="mt-3 text-xs font-semibold uppercase tracking-widest text-amber-700">
                  — {readingArticle.author}, The Daily Score
                </footer>
              </blockquote>

              {/* Remaining paragraphs */}
              {articleParagraphs.slice(2).map((para, i) => (
                <p key={i + 2} className="font-serif-body text-[#1f2937] text-base sm:text-[17px] leading-[1.9] tracking-[0.01em]">
                  {para}
                </p>
              ))}

              <p className="font-serif-body text-[#1f2937] text-base sm:text-[17px] leading-[1.9] tracking-[0.01em]">
                The structural implications of this analytical shift extend well beyond the scoreboard. Franchise valuations, media rights negotiations, and sponsorship premiums are increasingly tethered to a team's perceived analytical sophistication. Investors and league economists now speak openly about an 'analytics premium' baked into acquisition prices for teams with established data infrastructure.
              </p>
              <p className="font-serif-body text-[#1f2937] text-base sm:text-[17px] leading-[1.9] tracking-[0.01em]">
                As the arms race intensifies, the most forward-looking organizations are not merely hiring data scientists — they are building integrated knowledge platforms that marry raw computational power with the institutional wisdom of experienced coaching and scouting staff. The franchises that crack this human-machine integration challenge will define the competitive landscape of professional sport for the next decade.
              </p>
            </div>

            {/* Premium blur overlay CTA (sits on top of blurred text) */}
            {isBodyBlurred && (
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end pb-8" style={{top: '30%', background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 30%, white 70%)'}}>
                <div className="text-center px-4 max-w-sm">
                  <div className="inline-flex items-center gap-2 bg-amber-400 text-black text-xs font-black px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider shadow">
                    <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                    Premium Article
                  </div>
                  <p className="font-headline text-xl font-bold text-[#111827] mb-2">
                    Continue reading this exclusive analysis
                  </p>
                  <p className="text-sm text-gray-500 font-serif-body mb-5">
                    Subscribe to unlock this article and every premium investigation in our newsroom.
                  </p>
                  <button
                    onClick={() => setIsPaywallOpen(true)}
                    className="bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-sm px-8 py-3 rounded shadow-md hover:shadow-lg transition-all uppercase tracking-wider"
                  >
                    Unlock Full Article
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Article footer & Up Next Retention Engine ── */}
          <div className="mt-14 pt-8 border-t border-gray-200">
            {/* About the author (shown when article is unlocked/readable) */}
            {!isBodyBlurred && (
              <div className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-lg border border-gray-200 mb-10">
                <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm shrink-0 shadow border border-amber-400/20">
                  {readingArticle.author.split(' ').map(n => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-700 mb-0.5">About the author</p>
                  <p className="font-semibold text-[#111827]">{readingArticle.author}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Senior Analytics Correspondent, The Daily Score</p>
                </div>
              </div>
            )}

            {/* READER PULSE & BEAT WRITER Q&A SECTION */}
            <div className="my-10 p-6 bg-[#F9FAFB] rounded-xl border border-gray-200">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#111827]">
                    Reader Pulse &amp; Beat Writer Q&amp;A
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  Subscriber Community
                </span>
              </div>

              {/* Community Sentiment Poll */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs mb-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Community Sentiment Poll
                </p>
                <p className="text-sm font-semibold text-[#111827] mb-3">
                  Does the film room data justify reorganizing defensive personnel against this scheme?
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => setCommunityPollVote('agree')}
                    className={`flex-1 flex items-center justify-between px-4 py-2.5 rounded-lg border text-xs font-bold transition-all ${
                      communityPollVote === 'agree'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-400/40'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Agree with Analysis</span>
                    </span>
                    <span className="font-mono text-emerald-600">
                      {communityPollVote === 'agree' ? '81%' : '79%'}
                    </span>
                  </button>

                  <button
                    onClick={() => setCommunityPollVote('disagree')}
                    className={`flex-1 flex items-center justify-between px-4 py-2.5 rounded-lg border text-xs font-bold transition-all ${
                      communityPollVote === 'disagree'
                        ? 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-400/40'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
                    }`}
                  >
                    <span>Disagree (Sample Too Small)</span>
                    <span className="font-mono text-gray-500">
                      {communityPollVote === 'disagree' ? '21%' : '19%'}
                    </span>
                  </button>
                </div>
                {communityPollVote && (
                  <p className="text-[11px] text-emerald-700 font-semibold mt-2.5 text-center animate-in fade-in">
                    ✓ Your vote has been recorded and factored into our live community analytics sentiment model.
                  </p>
                )}
              </div>

              {/* Pinned Beat Writer Q&A Exchange */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono font-bold bg-slate-900 text-amber-400 px-2 py-0.5 rounded">
                    PINNED EXCHANGE
                  </span>
                  <span className="text-xs text-gray-500">From the Live Subscriber Mailbag</span>
                </div>

                {/* Question */}
                <div className="flex items-start gap-3 mb-3.5 pl-1">
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0">
                    SJ
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">
                      @SportsDataJunkie <span className="text-gray-400 font-normal">• Verified Subscriber</span>
                    </p>
                    <p className="text-xs text-gray-600 font-serif-body mt-0.5">
                      "Given how rapidly coordinators are diagnosing pre-snap motion, what is the counter-adjustment for offenses entering the postseason?"
                    </p>
                  </div>
                </div>

                {/* Answer */}
                <div className="flex items-start gap-3 pl-3 sm:pl-4 border-l-2 border-amber-400 bg-amber-50/40 p-3 rounded-r-lg">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 shadow-xs border border-amber-400/30">
                    {readingArticle.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-gray-900">{readingArticle.author}</p>
                      <span className="text-[9px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-black uppercase">
                        Beat Writer
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 font-serif-body mt-1 leading-relaxed">
                      "The next frontier is snap-count cadence variation combined with late orbit motion. By initiating motion with under 3 seconds on the play clock, defenses cannot communicate checks in time without conceding defensive holding or neutral-zone infractions."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── UP NEXT FOR YOU: NLP Retention & Funnel Engine ── */}
            <section className="my-8 pt-4">
              {/* Section Header with Strategy Badge & Persona Context */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6 pb-4 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-amber-500/10 text-amber-600 rounded-lg ring-1 ring-amber-500/20">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <h3 className="font-headline text-2xl sm:text-3xl font-bold text-[#111827]">
                      Up Next For You — NLP Retention &amp; Funnel Engine
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 font-serif-body">
                    Personalized Hybrid Content-Based recommendations: TF-IDF lexical cosine similarity calibrated with real-time persona propensity funnel orchestration.
                  </p>
                </div>

                {/* Active Strategy Badge */}
                <div className="self-start lg:self-auto flex flex-col items-start lg:items-end gap-1">
                  <span className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-bold px-3 py-1 rounded-full shadow-sm border ${
                    recStrategyInfo?.strategy_mode === 'retention'
                      ? 'bg-blue-50 text-blue-800 border-blue-200 ring-1 ring-blue-300/40'
                      : 'bg-amber-50 text-amber-900 border-amber-300 ring-1 ring-amber-400/40'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      recStrategyInfo?.strategy_mode === 'retention' ? 'bg-blue-500' : 'bg-amber-500'
                    } animate-pulse`} />
                    {recStrategyInfo?.strategy_description || 'Strategy: Retention Mode (2 Free / 1 PRO) • TF-IDF + Cosine Similarity'}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <span>Active User:</span>
                    <strong className="text-gray-800 font-semibold font-mono">
                      {selectedUser}
                    </strong>
                    {recStrategyInfo?.user_propensity_pct !== undefined && (
                      <span className="font-mono text-amber-600 font-bold ml-1">
                        ({recStrategyInfo.user_propensity_pct.toFixed(1)}% propensity)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Recommendations 3-Card Grid */}
              {isLoadingRecs ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="rounded-xl border border-gray-200 p-4 bg-gray-50 animate-pulse space-y-3">
                      <div className="w-full aspect-[16/10] bg-gray-200 rounded-lg" />
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-5 bg-gray-200 rounded w-4/5" />
                      <div className="h-3 bg-gray-200 rounded w-full" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {(readerRecs && readerRecs.length > 0
                    ? readerRecs
                    : ARTICLES_DATA.filter(a => a.id !== readingArticle?.id).slice(0, 3).map((a, i) => ({
                        ...a,
                        match_score_pct: 85 - i * 4,
                        strategy_label: a.is_premium ? "VIP Conversion Target" : "Retention Hook (Free)",
                        top_keywords: [a.sport_category.toLowerCase(), "analytics"]
                      }))
                  ).map((rec) => {
                    const fullArticle = ARTICLES_DATA.find(a => a.id === rec.id) || rec;
                    const isPro = fullArticle.is_premium !== undefined ? fullArticle.is_premium : rec.is_premium;
                    const matchScore = rec.match_score_pct || 78;
                    const strategyLabel = rec.strategy_label || (isPro ? "VIP Conversion Target" : "Retention Hook (Free)");
                    const imageUrl = fullArticle.image_url || rec.image_url || FALLBACK_SPORTS_IMAGE;

                    return (
                      <div
                        key={rec.id}
                        onClick={() => handleArticleClick(fullArticle)}
                        className="group cursor-pointer bg-white rounded-xl border border-gray-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                      >
                        {/* Article Image Banner */}
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                          <img
                            src={imageUrl}
                            alt={fullArticle.title || rec.title}
                            onError={handleImageError}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                          {/* Top Badges: Match % & FREE vs PRO indicator */}
                          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                            {/* NLP Match Score Badge */}
                            <span className="bg-emerald-950/90 text-emerald-300 border border-emerald-500/60 font-mono text-[10px] font-black px-2 py-0.5 rounded shadow backdrop-blur-sm flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
                              <span>{matchScore}% NLP Match</span>
                            </span>

                            {/* Free vs Pro Locked Indicator */}
                            {isPro ? (
                              <span className="bg-amber-400 text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow">
                                <Lock className="w-2.5 h-2.5 stroke-[2.5]" />
                                PRO LOCKED
                              </span>
                            ) : (
                              <span className="bg-emerald-500 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1 shadow">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                FREE READ
                              </span>
                            )}
                          </div>

                          {/* Sport Category and Read Time on Image bottom */}
                          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                              {fullArticle.sport_category || rec.sport_category}
                            </span>
                            <span className="text-[10px] text-gray-200 font-sans flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {fullArticle.readTime || rec.readTime || "6 min read"}
                            </span>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            {/* Strategy Funnel Label */}
                            <div className="mb-2">
                              <span className={`inline-flex items-center text-[9px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider ${
                                strategyLabel.includes("Retention")
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-amber-50 text-amber-800 border border-amber-200"
                              }`}>
                                {strategyLabel}
                              </span>
                            </div>

                            {/* Article Title */}
                            <h4 className="font-headline text-sm font-bold text-[#111827] group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-2">
                              {fullArticle.title || rec.title}
                            </h4>

                            {/* Summary snippet */}
                            <p className="font-serif-body text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                              {fullArticle.summary || rec.summary}
                            </p>
                          </div>

                          {/* Footer with top shared NLP keywords and byline */}
                          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                            {rec.top_keywords && rec.top_keywords.length > 0 && (
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[9px] uppercase tracking-wider text-gray-400 font-bold">
                                  NLP Terms:
                                </span>
                                {rec.top_keywords.map((kw, i) => (
                                  <span
                                    key={i}
                                    className="text-[9px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded border border-slate-200"
                                  >
                                    #{kw}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className="flex items-center justify-between text-xs text-gray-600 mt-0.5">
                              <span className="font-medium truncate max-w-[130px]">{fullArticle.author || rec.author}</span>
                              <span className="text-amber-600 font-bold text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center">
                                Read article →
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Back to Home button */}
            <button
              onClick={handleBackToHome}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#111827] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </button>
          </div>
        </main>
      ) : (
      /* ============================================================ */
      /* MAIN FEED (shown when NOT in reader mode)                    */
      /* ============================================================ */
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Editorial Sub-header Ticker */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-gray-200 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="uppercase tracking-widest text-[#111827] font-bold">LATEST DISPATCHES</span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span className="hidden sm:inline">24 Field investigations, scouting notebooks &amp; predictive metrics</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Live sports desk • Continuous feed</span>
          </div>
        </div>

        {/* 2. UPGRADED TWO-COLUMN EDITORIAL ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: ~70% WIDTH (col-span-8)                      */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 flex flex-col space-y-12">
            
            {/* HERO ARTICLE */}
            {heroArticle && (
              <section className="pb-10 border-b border-gray-200">
                <div 
                  onClick={() => handleArticleClick(heroArticle)}
                  className="group cursor-pointer flex flex-col gap-6"
                >
                  {/* Hero Image */}
                  <div className="relative overflow-hidden rounded-sm bg-gray-100 shadow-sm aspect-[16/9]">
                    <img
                      src={heroArticle.image_url}
                      alt={heroArticle.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                    />
                    {heroArticle.is_premium ? (
                      <div className="absolute top-4 left-4 bg-amber-400 text-black text-xs font-black px-2.5 py-1 rounded shadow flex items-center gap-1.5 uppercase tracking-wider">
                        <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>PREMIUM</span>
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded tracking-wider uppercase">
                        FREE ACCESS
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/75 text-white text-[11px] px-2.5 py-1 rounded font-mono uppercase tracking-wider">
                      {heroArticle.sport_category}
                    </div>
                  </div>

                  {/* Hero Copy */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 mb-2.5">
                      <span>{heroArticle.sport_category}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-400 font-medium">{heroArticle.published_at}</span>
                    </div>

                    <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.12] text-[#111827] group-hover:text-amber-800 transition-colors mb-4">
                      {heroArticle.title}
                    </h1>

                    <p className="font-serif-body text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                      {heroArticle.summary}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <span className="font-semibold text-gray-900 tracking-wide uppercase text-xs">
                        By {heroArticle.author}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{heroArticle.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* SUB-HERO FEATURED DUAL STORIES */}
            {subHeroArticles.length > 0 && (
              <section className="pb-10 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-headline text-xl font-bold text-[#111827] tracking-tight">
                    Featured Analyses
                  </h2>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    DEEP DIVES
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {subHeroArticles.map((article) => (
                    <article
                      key={article.id}
                      onClick={() => handleArticleClick(article)}
                      className="group cursor-pointer flex flex-col bg-white border border-gray-100 hover:border-gray-300 transition-all duration-200 rounded-sm overflow-hidden p-3 hover:shadow-sm"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100 mb-3.5">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          onError={handleImageError}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {article.is_premium ? (
                          <div className="absolute top-2.5 right-2.5 bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded shadow flex items-center gap-1 uppercase tracking-wider">
                            <Lock className="w-3 h-3 stroke-[2.5]" />
                            <span>PREMIUM</span>
                          </div>
                        ) : (
                          <div className="absolute top-2.5 right-2.5 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            FREE
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
                          {article.sport_category}
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                            <span>{article.sport_category}</span>
                            <span>•</span>
                            <span>{article.published_at}</span>
                          </div>

                          <h3 className="font-headline text-xl font-bold text-[#111827] leading-snug group-hover:text-amber-800 transition-colors mb-2">
                            {article.title}
                          </h3>

                          <p className="font-serif-body text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                            {article.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                          <span className="font-semibold text-gray-800">{article.author}</span>
                          <span className="text-gray-400">{article.readTime}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* 3. NEWSLETTER SIGNUP BANNER */}
            <section className="bg-slate-950 text-white rounded-lg p-6 sm:p-8 relative overflow-hidden shadow-lg border border-slate-800">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
                  <Mail className="w-4 h-4" />
                  <span>The Daily Score Morning Briefing</span>
                </div>
                
                <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-2">
                  Get the best sports journalism delivered to your inbox
                </h3>
                
                <p className="font-serif-body text-gray-400 text-sm max-w-xl mb-6">
                  Tactical film room breakdowns, exclusive beat writer notebooks, and predictive analytics every morning at 7:00 AM ET.
                </p>

                {newsletterSubscribed ? (
                  <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>You're on the list! Watch your inbox tomorrow at 7:00 AM.</span>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your work or personal email..."
                      required
                      className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-black font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded shadow transition-all shrink-0"
                    >
                      Sign Up Free
                    </button>
                  </form>
                )}

                <div className="flex flex-wrap items-center gap-5 text-[11px] text-gray-400 mt-5 pt-4 border-t border-slate-800/80">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Free 5-minute morning read
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Beat writer mailbag access
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    Joined by 250,000+ sports insiders
                  </span>
                </div>
              </div>
            </section>

            {/* MAIN GRID: THE REST OF THE STORIES */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline text-2xl font-bold text-[#111827] tracking-tight">
                  Latest Investigations &amp; Telemetry
                </h2>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {mainFeedArticles.length} STORIES AVAILABLE
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mainFeedArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="group cursor-pointer flex flex-col bg-white border border-gray-100 hover:border-gray-300 transition-all duration-200 rounded-sm overflow-hidden p-3 hover:shadow-sm"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-gray-100 mb-3.5">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        onError={handleImageError}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {article.is_premium ? (
                        <div className="absolute top-2.5 right-2.5 bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 rounded shadow-md flex items-center gap-1 uppercase tracking-wider">
                          <Lock className="w-3 h-3 stroke-[2.5]" />
                          <span>PREMIUM</span>
                        </div>
                      ) : (
                        <div className="absolute top-2.5 right-2.5 bg-gray-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase">
                          FREE
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded">
                        {article.sport_category}
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                          <span>{article.sport_category}</span>
                          <span>•</span>
                          <span>{article.published_at}</span>
                        </div>

                        <h3 className="font-headline text-lg font-bold text-[#111827] leading-snug group-hover:text-amber-800 transition-colors mb-2">
                          {article.title}
                        </h3>

                        <p className="font-serif-body text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                        <span className="font-semibold text-gray-800 text-xs">{article.author}</span>
                        <span className="text-gray-400">{article.readTime}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: ~30% WIDTH (col-span-4) - SIDEBAR            */}
          {/* ======================================================== */}
          <aside className="lg:col-span-4 flex flex-col space-y-10">
            
            {/* 1. TRENDING NOW SECTION (5 Compact Articles) */}
            <div className="bg-[#F9FAFB] border border-gray-200/80 rounded-lg p-5">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-[#111827]">
                  <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <h3 className="font-headline font-bold text-lg">Trending Now</h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  TOP READS
                </span>
              </div>

              <div className="flex flex-col divide-y divide-gray-200/70">
                {trendingArticles.map((article, idx) => (
                  <div
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="group cursor-pointer flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0 hover:bg-gray-100/60 -mx-2 px-2 rounded transition-colors"
                  >
                    <span className="font-headline font-black text-2xl text-gray-300 group-hover:text-amber-500 w-7 shrink-0 transition-colors">
                      0{idx + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1">
                        <span>{article.sport_category}</span>
                        {article.is_premium && (
                          <span className="inline-flex items-center gap-0.5 text-black bg-amber-400 px-1 py-0.2 rounded font-black text-[9px]">
                            <Lock className="w-2.5 h-2.5 stroke-[2.5]" /> PRO
                          </span>
                        )}
                      </div>

                      <h4 className="font-headline text-sm font-bold text-gray-900 group-hover:text-amber-700 leading-snug line-clamp-2">
                        {article.title}
                      </h4>

                      <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1.5">
                        <span className="font-medium text-gray-600">{article.author}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    <div className="w-16 h-14 shrink-0 rounded overflow-hidden bg-gray-200 shadow-xs">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        onError={handleImageError}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. TOP BEAT WRITERS SECTION */}
            <div className="bg-[#F9FAFB] border border-gray-200/80 rounded-lg p-5">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-[#111827]">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h3 className="font-headline font-bold text-lg">Top Beat Writers</h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  STAFF INSIDERS
                </span>
              </div>

              <div className="flex flex-col space-y-4">
                {TOP_BEAT_WRITERS.map((writer) => (
                  <div 
                    key={writer.name}
                    className="flex items-center justify-between p-2.5 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-xs shrink-0 shadow-xs border border-amber-400/20">
                        {writer.avatar}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-headline text-sm font-bold text-gray-900 truncate">
                            {writer.name}
                          </h4>
                          <span className="text-[9px] px-1 py-0.2 bg-gray-200 text-gray-700 font-bold rounded">
                            {writer.sport}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 truncate">{writer.role}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => alert(`Following ${writer.name}'s beat coverage!`)}
                      className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-gray-300 hover:border-black hover:bg-white text-gray-700 hover:text-black transition-colors shrink-0"
                    >
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. STAFF EDITORIAL DESK / ML PERSPECTIVE BANNER */}
            <div className="border border-amber-300/80 bg-amber-50/50 rounded-lg p-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Proprietary Analytics Lab</span>
              </div>
              <h4 className="font-headline text-base font-bold text-gray-900 mb-1.5">
                Machine Learning Meets Investigative Journalism
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Our newsroom operates on proprietary second-spectrum telemetry and XGBoost propensity modeling to deliver film-room breakdowns unseen anywhere else.
              </p>
              <button
                onClick={() => {
                  const target = ARTICLES_DATA.find(a => a.is_premium) || ARTICLES_DATA[1];
                  handleArticleClick(target);
                }}
                className="w-full bg-[#111827] hover:bg-black text-amber-400 font-bold text-xs uppercase tracking-wider py-2.5 rounded flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>Unlock Full Analytics Access</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </aside>
        </div>

        {/* 4. DEEP-DIVE ANALYTICS DOSSIERS SHOWCASE (Between Main Feed and Footer) */}
        <section className="mt-16 pt-12 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-500/10 text-amber-600 rounded-lg">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#111827]">
                  Deep-Dive Analytics Dossiers
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 font-serif-body">
                Proprietary long-form research papers and quantitative models from The Daily Score Data Intelligence Lab.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider self-start sm:self-auto">
              4 RESEARCH WHITEPAPERS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ANALYTICS_DOSSIERS.map((dossier) => (
              <div
                key={dossier.id}
                onClick={() => {
                  const matchArt = ARTICLES_DATA.find(a => a.sport_category === dossier.sport) || ARTICLES_DATA[0];
                  handleArticleClick(matchArt);
                }}
                className="group cursor-pointer bg-white rounded-xl border border-gray-200 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={dossier.image}
                    alt={dossier.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="bg-slate-900/90 text-amber-400 border border-amber-500/40 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider font-mono">
                      {dossier.sport} DOSSIER
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2.5 right-2.5">
                    <span className="text-[10px] text-gray-300 font-mono flex items-center gap-1">
                      <FileText className="w-3 h-3 text-amber-400" />
                      {dossier.dataset}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-gray-400 uppercase mb-1.5">
                      <span>{dossier.model}</span>
                      <span>•</span>
                      <span>{dossier.readTime}</span>
                    </div>
                    <h4 className="font-headline text-sm font-bold text-gray-900 group-hover:text-amber-700 leading-snug line-clamp-2 mb-2">
                      {dossier.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-serif-body line-clamp-2 leading-relaxed mb-3">
                      {dossier.abstract}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-700 text-[11px]">{dossier.author}</span>
                    <span className="text-amber-600 font-bold text-[11px] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read Dossier →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      )} {/* end reader-mode / main-feed conditional */}

      {/* FOOTER */}
      <footer className="bg-[#F9FAFB] border-t border-gray-200 mt-24 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-base text-gray-900">The Daily Score</span>
            <span>© 2026 The Daily Score Media Inc. All rights reserved.</span>
          </div>
          <div className="flex gap-6 uppercase tracking-wider font-semibold text-gray-600">
            <a href="#about" className="hover:text-black">About Us</a>
            <a href="#editorial" className="hover:text-black">Editorial Policy</a>
            <a href="#privacy" className="hover:text-black">Privacy</a>
            <a href="#terms" className="hover:text-black">Terms</a>
          </div>
        </div>
      </footer>

      {/* 4. THE PAYWALL MODAL (THE ML INTEGRATION POINT - VIEWPORT CLIPPING FIXED) */}
      {isPaywallOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          {/* Modal Container: with max-h-[90vh] overflow-y-auto and proper vertical padding so headline is never clipped */}
          <div 
            className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl my-auto py-0 max-h-[90vh] overflow-y-auto border border-gray-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <span className="inline-flex p-1.5 rounded-full bg-amber-100 text-amber-700">
                  <Shield className="w-4 h-4" />
                </span>
                <span className="text-xs uppercase tracking-widest font-black text-amber-700">
                  EXCLUSIVE SUBSCRIBER ACCESS
                </span>
              </div>
              <button
                onClick={() => setIsPaywallOpen(false)}
                className="text-gray-400 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close Paywall Modal"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Modal Core Body */}
            <div className="px-6 sm:px-8 py-5">
              {/* Dynamic Headline */}
              <div className="text-center mb-5">
                <div className="inline-block mx-auto mb-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-xs font-semibold text-amber-900">
                  Personalized Offer for {selectedArticle?.sport_category || 'Sports'} Enthusiasts
                </div>
                <h3 className="font-headline text-2xl sm:text-3xl font-extrabold text-[#111827] leading-tight">
                  Unlock exclusive {selectedArticle?.sport_category || "Championship"} analysis
                </h3>
                <p className="font-serif-body text-gray-600 text-sm sm:text-base mt-2 max-w-lg mx-auto">
                  Gain full access to deep-dive film studies, tactical breakdowns, and predictive ML match analytics.
                </p>
              </div>

              {/* User Lookup Error Banner */}
              {userLookupError && (
                <div className="my-3 p-3 bg-rose-50 border border-rose-300 rounded text-rose-800 text-xs flex items-center justify-between">
                  <span>⚠️ {userLookupError}</span>
                  <button 
                    onClick={() => handlePersonaChange("USR_869")}
                    className="underline font-bold text-rose-900 ml-2"
                  >
                    Reset to USR_869
                  </button>
                </div>
              )}

              {/* 1. Sleek ML Loading State Banner */}
              {isLoading && (
                <div className="my-5 p-4 bg-amber-50/80 border border-amber-200 rounded-lg flex items-center justify-center gap-3.5 text-center animate-pulse">
                  <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin shrink-0"></div>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-bold text-[#111827]">
                      Analyzing reader propensity profile with ML...
                    </p>
                    <p className="text-[11px] text-gray-500 font-mono">
                      Querying XGBoost pipeline &amp; computing SHAP values for <span className="text-amber-800 font-bold">{selectedUser}</span>
                    </p>
                  </div>
                </div>
              )}

              {/* 2. ML Debug Panel (Live Inference & What-If Feature Sliders) */}
              {mlData && !isLoading && (
                <div className="my-4 p-4 bg-slate-900 text-white rounded-lg border border-slate-700 shadow-xl text-xs animate-in fade-in duration-300">
                  {/* Top Bar: ML Status & Persona Identifier */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <span className="p-1.5 bg-amber-400/20 text-amber-400 rounded ring-1 ring-amber-400/30 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] tracking-widest uppercase font-extrabold text-amber-400">
                            LEVEL 2 EXPECTED VALUE PRICING ENGINE
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 font-mono font-bold">
                            Live XGBoost
                          </span>
                          {mlData.is_overridden && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-300 border border-amber-500 font-mono font-bold animate-pulse">
                              🧪 What-If Simulated
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-gray-300 mt-0.5">
                          Target User: <span className="font-mono text-amber-300 font-bold">{mlData.user_id}</span> ({personas.find(p => p.user_id === mlData.user_id)?.name || 'Custom Reader from 5,000 CSV'})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Winning EV:</span>
                      <span className="font-mono text-amber-400 font-black text-sm bg-amber-950/60 border border-amber-500/50 px-2 py-0.5 rounded shadow-sm">
                        ${Number(mlData.expected_value_usd).toFixed(2)} EV
                      </span>
                    </div>
                  </div>

                  {/* Level 2 Expected Value 4-Price Comparison Grid */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-2">
                      <span>4-Price Simulation Breakdown:</span>
                      <span className="text-amber-400/80 font-normal normal-case font-mono">Formula: EV = Prob × Price</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {(mlData.all_ev_scenarios || mlData.pricing_simulations || []).map((scenario, idx) => {
                        const price = Number(scenario.price_usd);
                        const prob = scenario.probability !== undefined 
                          ? Number(scenario.probability) 
                          : Number(scenario.conversion_probability_percentage);
                        const ev = scenario.expected_value !== undefined 
                          ? Number(scenario.expected_value) 
                          : Number(scenario.expected_value_usd);
                        const isWinning = scenario.is_optimal !== undefined 
                          ? Boolean(scenario.is_optimal) 
                          : (price === Number(mlData.optimal_price_usd));

                        return (
                          <div
                            key={idx}
                            className={`relative rounded-md p-2.5 transition-all flex flex-col justify-between ${
                              isWinning
                                ? 'bg-gradient-to-b from-amber-500/20 to-amber-950/40 border-2 border-amber-400 shadow-md shadow-amber-950/50 ring-1 ring-amber-400/50'
                                : 'bg-slate-800/80 border border-slate-700/80 hover:border-slate-600'
                            }`}
                          >
                            {isWinning && (
                              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-black text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow flex items-center gap-1 whitespace-nowrap">
                                <Sparkles className="w-2.5 h-2.5" />
                                <span>WINNING EV</span>
                              </div>
                            )}

                            <div>
                              <div className="flex items-center justify-between text-[11px] font-bold">
                                <span className={isWinning ? 'text-amber-300 font-extrabold' : 'text-gray-300'}>
                                  ${price.toFixed(2)}
                                </span>
                                <span className="text-[9px] text-gray-400 truncate max-w-[65px]">
                                  {scenario.offer_name}
                                </span>
                              </div>

                              <div className="mt-1 flex items-baseline justify-between text-xs font-mono">
                                <span className="text-[10px] text-gray-400">Prob:</span>
                                <span className={isWinning ? 'text-white font-bold' : 'text-gray-300'}>
                                  {prob.toFixed(1)}%
                                </span>
                              </div>

                              {/* Mini probability progress bar */}
                              <div className="w-full bg-slate-900 rounded-full h-1 mt-1 overflow-hidden">
                                <div 
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    isWinning ? 'bg-amber-400' : 'bg-slate-500'
                                  }`} 
                                  style={{ width: `${Math.min(100, Math.max(5, prob))}%` }}
                                />
                              </div>
                            </div>

                            <div className="mt-2 pt-1.5 border-t border-slate-700/60 flex items-center justify-between font-mono">
                              <span className="text-[9px] uppercase tracking-wider text-gray-400">EV:</span>
                              <span className={`text-xs font-black ${isWinning ? 'text-amber-300 text-sm' : 'text-gray-300'}`}>
                                ${ev.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* SHAP Drivers Footer */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-gray-400 font-sans font-semibold">Top SHAP Drivers:</span>
                      {mlData.shap_top_factors?.map((f, i) => (
                        <span key={i} className="inline-flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700">
                          <span className="text-amber-300">{f.feature.replace(/^(num__|cat__)/, '')}</span>
                          <span className={f.impact >= 0 ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                            ({f.impact >= 0 ? '+' : ''}{Number(f.impact).toFixed(2)})
                          </span>
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 italic font-serif-body">
                      XGBoost selected {mlData.offer_name} (${Number(mlData.optimal_price_usd).toFixed(2)}) for maximum revenue.
                    </span>
                  </div>

                  {/* ── 3. LIVE FEATURE WHAT-IF SIMULATOR SLIDERS ── */}
                  <div className="mt-4 pt-3.5 border-t border-slate-800/90">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-800 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="p-1 bg-amber-400/20 text-amber-400 rounded">
                          <SlidersHorizontal className="w-3.5 h-3.5" />
                        </span>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                            <span>Live Feature "What-If" Simulator</span>
                            <span className="bg-emerald-950 text-emerald-400 border border-emerald-700 text-[9px] px-1.5 py-0.2 rounded font-mono font-normal">
                              Live Stress-Test
                            </span>
                          </h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            Manipulate raw CSV values on <span className="text-white font-mono font-bold">{mlData.user_id}</span> to test pricing elasticity live.
                          </p>
                        </div>
                      </div>

                      {/* Reset to CSV Baseline Button */}
                      {Object.keys(featureOverrides).length > 0 && (
                        <button
                          onClick={handleResetOverrides}
                          className="self-start sm:self-auto flex items-center gap-1 text-[10px] font-bold text-amber-400 hover:text-amber-300 bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded border border-amber-500/40 transition-colors"
                          title="Reset all feature overrides back to this user's original CSV values"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset to CSV Baseline</span>
                        </button>
                      )}
                    </div>

                    {/* Sliders Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SIMULATION_FEATURES.map((feat) => {
                        const baselineVal = mlData.user_raw_features?.[feat.key] ?? 0;
                        const currentVal = featureOverrides[feat.key] !== undefined 
                          ? featureOverrides[feat.key] 
                          : baselineVal;
                        const isOverridden = featureOverrides[feat.key] !== undefined && featureOverrides[feat.key] !== baselineVal;

                        return (
                          <div key={feat.key} className="bg-slate-950/80 p-2.5 rounded border border-slate-800/90 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-semibold text-gray-300 truncate max-w-[170px]">
                                {feat.label}
                              </span>
                              <div className="flex items-center gap-1.5 font-mono">
                                <span className="text-[10px] text-gray-500">
                                  (CSV: {baselineVal})
                                </span>
                                <span className={`text-xs font-black ${isOverridden ? 'text-amber-400 bg-amber-950/80 px-1 rounded border border-amber-500/50' : 'text-white'}`}>
                                  {typeof currentVal === 'number' && currentVal % 1 !== 0 ? currentVal.toFixed(2) : currentVal}
                                </span>
                              </div>
                            </div>

                            <input
                              type="range"
                              min={feat.min}
                              max={feat.max}
                              step={feat.step}
                              value={currentVal}
                              onChange={(e) => handleSliderChange(feat.key, e.target.value)}
                              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 my-1.5"
                            />

                            <p className="text-[9px] text-gray-400 leading-tight">
                              {feat.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing & Discount Section */}
              <div className="bg-[#F9FAFB] border border-amber-200 rounded-lg p-5 my-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#F59E0B] text-black text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl">
                  {mlData?.offer_name ? `${mlData.offer_name.toUpperCase()}` : "SAVE 20%"}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      {mlData?.offer_name ? `${mlData.offer_name} Pass` : "All-Access Pass"}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-extrabold text-[#111827]">
                        ${mlData?.optimal_price_usd ? mlData.optimal_price_usd.toFixed(2) : "1.99"}
                      </span>
                      <span className="text-sm text-gray-500 font-medium">/ month</span>
                      <span className="text-xs text-gray-400 line-through">$9.99/mo</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Optimal personalized pricing determined via real-time Expected Value simulation. Cancel anytime.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setHasPaid(true);
                      setIsPaywallOpen(false);
                    }}
                    disabled={isLoading}
                    className="w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] disabled:opacity-60 disabled:cursor-wait text-white px-6 py-3 rounded font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all whitespace-nowrap"
                  >
                    {isLoading
                      ? 'Calculating best price…'
                      : mlData?.optimal_price_usd
                        ? `Complete Purchase — $${mlData.optimal_price_usd.toFixed(2)}/mo`
                        : 'Complete Purchase'}
                  </button>
                </div>

                {/* Value Propositions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Ad-free experience</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Proprietary ML metrics</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Beat writer live chat</span>
                  </div>
                </div>
              </div>

              {/* Recommended For You Section (Mapping with verified image & metadata back to ARTICLES_DATA) */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Recommended For You While You Decide
                    </span>
                    {mlData?.sql_recommendations?.length > 0 && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        NLP TF-IDF + SQL Matched
                      </span>
                    )}
                  </div>
                  <span 
                    onClick={() => { setIsPaywallOpen(false); handleCategoryClick('ALL'); }}
                    className="text-[11px] text-amber-600 font-semibold cursor-pointer hover:underline flex items-center"
                  >
                    Browse all <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(mlData?.sql_recommendations && mlData.sql_recommendations.length > 0
                    ? mlData.sql_recommendations
                    : recommendedArticles
                  ).map((rec, index) => {
                    const fullArticle = ARTICLES_DATA.find(a => a.id === rec.id) || rec;
                    const recCategory = fullArticle.sport_category || rec.category || rec.sport_category || selectedArticle?.sport_category || 'Sports';
                    const recTitle = fullArticle.title || rec.title;
                    const recId = fullArticle.id || rec.id || index;
                    const recMatchScore = rec.match_score_pct || 78;
                    const isPro = fullArticle.is_premium !== undefined ? fullArticle.is_premium : (rec.is_premium !== undefined ? rec.is_premium : true);
                    const imageUrl = fullArticle.image_url || rec.image_url || FALLBACK_SPORTS_IMAGE;

                    return (
                      <div
                        key={recId}
                        onClick={() => {
                          setIsPaywallOpen(false);
                          handleArticleClick(fullArticle);
                        }}
                        className="group/rec cursor-pointer bg-gray-50 hover:bg-gray-100 p-2.5 rounded-lg border border-gray-200 hover:border-amber-400 transition-all flex sm:flex-col items-center sm:items-start gap-2.5 relative"
                      >
                        <div className="relative w-16 h-12 sm:w-full sm:h-20 shrink-0 rounded overflow-hidden bg-gray-200">
                          <img
                            src={imageUrl}
                            alt={recTitle}
                            onError={handleImageError}
                            className="w-full h-full object-cover group-hover/rec:scale-105 transition-transform"
                          />
                          {/* NLP Match Score Badge */}
                          <div className="absolute top-1 left-1 bg-emerald-950/90 text-emerald-300 font-mono text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-500/50 shadow">
                            {recMatchScore}% Match
                          </div>
                          {/* Lock or Free Read Badge */}
                          <div className="absolute top-1 right-1">
                            {isPro ? (
                              <div className="bg-amber-400 p-0.5 rounded text-black shadow" title="Premium Article">
                                <Lock className="w-2.5 h-2.5 stroke-[2.5]" />
                              </div>
                            ) : (
                              <div className="bg-emerald-500 p-0.5 rounded text-white shadow" title="Free Read">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                              </div>
                            )}
                          </div>
                          {/* Strategy Label */}
                          {rec.strategy_label && (
                            <div className="absolute bottom-1 left-1 right-1 hidden sm:block">
                              <span className="text-[8px] font-bold uppercase tracking-wider bg-black/75 text-amber-300 px-1.5 py-0.2 rounded backdrop-blur-xs truncate block max-w-full">
                                {rec.strategy_label}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-[9px] font-bold uppercase text-amber-700 tracking-wider mb-0.5">
                            <span>{recCategory}</span>
                            {rec.top_keywords && rec.top_keywords.length > 0 && (
                              <span className="text-gray-400 font-mono font-normal lowercase truncate max-w-[80px]">
                                #{rec.top_keywords[0]}
                              </span>
                            )}
                          </div>
                          <h4 className="font-headline text-xs font-bold text-gray-900 line-clamp-2 leading-snug group-hover/rec:text-amber-700">
                            {recTitle}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Bottom Strip */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 mt-auto">
              <span className="text-[11px]">Secure 256-bit encrypted checkout</span>
              <button
                onClick={() => setIsPaywallOpen(false)}
                className="font-semibold text-gray-600 hover:text-gray-900 transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
