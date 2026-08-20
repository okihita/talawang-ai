# HackNusa 2026 — Project Proposals, Scoring & Track Recommendation

## 📊 Executive Summary & Track Recommendation

| Track & Concept | Target Track | Core Innovation | Hackathon Score | Verdict |
| :--- | :--- | :--- | :---: | :--- |
| **1. TrustPay Sentinel** | *Secure Digital Payments & Fintech* | Multimodal QRIS & APK Trojan Protection Engine | **87 / 100** | Strong Viability |
| **2. AegisGen AI** 🏆 | *AI vs AI: Cyber Defense* | Autonomous LLM Firewall & Deepfake Interceptor | **96 / 100** | **TOP RECOMMENDATION** |
| **3. SenseiGuard** | *Human-Centric Security* | Contextual Just-In-Time Nudges & Micro-Simulations | **90 / 100** | Runner-Up |

### 🎯 Final Recommendation: **Track 2 — AI vs AI: Cyber Defense**
* **Why Track 2?**
  1. **Maximum Strategic Fit with Kaspersky:** Kaspersky judges prioritize core threat intelligence, adversarial machine learning, and offensive/defensive cybersecurity telemetry.
  2. **High-Impact Demo in 2–3 Min Pitch Video:** Allows a dramatic "Live Attack vs. Live Defense" split-screen demo that judges instantly grasp.
  3. **High Innovation Ceiling:** Addresses the fastest-growing attack surfaces in 2025–2026 (Enterprise LLMs, AI agents, deepfake social engineering).

---

## 🔬 Deep-Dive Project Proposals & Scoring Rubric

### 🏆 Proposal 1 (Track 2): AegisGen — Autonomous LLM Firewall & Deepfake Defense Gateway
> **Track:** AI vs AI: Cyber Defense  
> **Tagline:** *"Fighting autonomous AI threats with proactive, sub-millisecond AI defense."*

#### 1. Problem Statement
* Generative AI attacks are outpacing traditional perimeter security:
  * **Adversarial Prompt Injections & Jailbreaks:** Compromising enterprise RAG systems, leaking database secrets, and hijacking agent execution.
  * **Multimodal Deepfakes (Audio/Video):** Used in real-time executive voice cloning for fraudulent wire transfers and identity spoofing.

#### 2. Proposed Solution & Architecture
* **Real-time Defense Proxy Gateway:**
  * **Semantic & Latent Space Inspector:** Inspects incoming prompts for jailbreak patterns and hidden system instruction overrides using lightweight embeddings before queries hit the LLM.
  * **Deepfake Voice & Spectral Analyzer:** Real-time audio stream analyzer detecting synthetic artifacts, phase inconsistencies, and vocoder signatures.
  * **Autonomous Threat Response & Threat Intel Generator:** Automatically derives Yara / Sigma rules and Kaspersky-compatible threat telemetry for detected adversarial payloads.

#### 3. 2–3 Minute PoC Demo Plan
1. **Minute 0:00–0:45:** Demonstrate a vulnerable enterprise AI agent leaking credentials via indirect prompt injection + Deepfake voice scam snippet.
2. **Minute 0:45–2:00:** Route traffic through **AegisGen Gateway**; showcase live interception, latency overhead (<30ms), and real-time visualization of the adversarial embedding distance.
3. **Minute 2:00–2:30:** Dashboard overview showing real-time attack metrics, automated signature generation, and export to security feeds.

#### 4. Rubric Score Breakdown (96/100)
* **Kaspersky & Tel-U Alignment (20%):** 20/20
* **Innovation & Novelty (25%):** 24/25
* **PoC Demonstrability & Pitch Appeal (25%):** 24/25
* **Technical Depth & Feasibility (15%):** 14/15
* **Impact & Scalability (15%):** 14/15

---

### 🥈 Proposal 2 (Track 3): SenseiGuard — Behavioral Just-In-Time Security Nudge & Interactive Micro-Trainer
> **Track:** Human-Centric Security  
> **Tagline:** *"Transforming the weakest link into the first line of defense."*

#### 1. Problem Statement
* Over 90% of successful breaches in Indonesia stem from human error (WhatsApp malicious APKs, phishing emails, imposter scams).
* Standard annual compliance quizzes are ineffective, forgotten within days, and provide zero contextual defense at the moment of risk.

#### 2. Proposed Solution & Architecture
* **Contextual Browser Extension & Android Companion:**
  * **Linguistic Deception Detector:** Evaluates psychological triggers (urgency, fear, fake authority) in incoming messages and websites.
  * **Just-In-Time (JIT) Explainable Interventions:** Instead of opaque blocking, it highlights *why* an element is deceptive (e.g. subtle domain homoglyph, unauthorized permission request).
  * **30-Second Micro-Challenges:** Triggers adaptive, gamified training modules right after a risky action is averted.

#### 3. 2–3 Minute PoC Demo Plan
1. **Minute 0:00–0:40:** User receives a deceptive WhatsApp package tracking APK link.
2. **Minute 0:40–1:50:** SenseiGuard intercepts the action, renders an interactive HUD explaining the social engineering tricks, and tests the user on spotting similar traps.
3. **Minute 1:50–2:30:** Admin analytics dashboard showcasing team vulnerability reduction scores.

#### 4. Rubric Score Breakdown (90/100)
* **Kaspersky & Tel-U Alignment (20%):** 18/20
* **Innovation & Novelty (25%):** 22/25
* **PoC Demonstrability & Pitch Appeal (25%):** 23/25
* **Technical Depth & Feasibility (15%):** 14/15
* **Impact & Scalability (15%):** 13/15

---

### 🥉 Proposal 3 (Track 1): TrustPay Sentinel — Multimodal QRIS Integrity & Mobile Banking Fraud Shield
> **Track:** Secure Digital Payments & Fintech  
> **Tagline:** *"Securing next-gen digital transactions against physical-digital fraud."*

#### 1. Problem Statement
* Surge in QRIS manipulation (sticker swapping), fake payment proof screenshots defrauding merchants, and banking trojans deploying overlay windows to steal credentials.

#### 2. Proposed Solution & Architecture
* **Merchant & Customer Protection Suite:**
  * **QRIS Payload Verifier:** Cryptographically validates QR payload data against official National Standard Registry metadata and merchant GPS coordinates.
  * **CV Receipt Forgery Detector:** Mobile-optimized OCR + CNN model inspecting payment receipts for font discrepancies, manipulated pixels, and invalid transaction signatures.
  * **Anti-Overlay Service:** Android heuristic listener detecting illicit accessibility abuse and floating overlay windows.

#### 3. 2–3 Minute PoC Demo Plan
1. **Minute 0:00–0:45:** Merchant scanned with a malicious QR / receives a fake transfer receipt.
2. **Minute 0:45–1:45:** TrustPay app flags the altered QRIS and fake receipt instantly with a tamper heat map.
3. **Minute 1:45–2:30:** Technical architecture walk-through and integration APIs for fintech platforms.

#### 4. Rubric Score Breakdown (87/100)
* **Kaspersky & Tel-U Alignment (20%):** 17/20
* **Innovation & Novelty (25%):** 21/25
* **PoC Demonstrability & Pitch Appeal (25%):** 22/25
* **Technical Depth & Feasibility (15%):** 13/15
* **Impact & Scalability (15%):** 14/15

---

## 🚀 Recommended Action Plan to Execute

1. **Lock in Track 2 (AI vs AI: Cyber Defense)**.
2. **Setup Repository Structure:**
   - `backend/`: FastAPI / Python for the detection engine and LLM proxy.
   - `models/`: ONNX/HuggingFace lightweight models for prompt injection & deepfake detection.
   - `frontend/`: Interactive React / Next.js / Tailwind live demo dashboard.
3. **Draft 2–3 Minute Video Script & Pitch Deck:** Highlighting the problem, architecture, live attack demonstration, and Kaspersky telemetry integration.
