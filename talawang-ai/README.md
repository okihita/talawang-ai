# 🛡️ Talawang AI — Autonomous Cyber Defense Gateway

> **HackNusa 2026 Submission Prototype**  
> *Track 2: AI vs AI: Cyber Defense*  
> **Organized by:** Telkom University & Kaspersky  
> **Theme:** *"Securing Tomorrow: Innovating Trust, Delivering Impact"*

---

## 📖 Overview

**Talawang AI** is an autonomous, sub-millisecond AI defense gateway designed to protect enterprise LLM agents and communications channels against next-generation adversarial attacks, including:

1. **Adversarial Prompt Injections & Jailbreaks (DAN, Persona Overrides)**
2. **System Prompt & Confidential Configuration Exfiltration**
3. **Hidden Zero-Width Unicode Cloaking Attacks**
4. **Indirect RAG SQL Injection Payloads**
5. **Synthetic Deepfake Audio & Voice Cloning Impersonation**

Inspired by the traditional **Talawang** shield of the Dayak warriors, our gateway combines multi-layered lexical heuristics, latent-space semantic evaluation, and spectral acoustic analysis into an ultra-low latency middleware with real-time Kaspersky YARA intelligence feed exports.

---

## ⚡ Tech Stack

* **Framework:** Next.js 16.3.1 (App Router + Turbopack)
* **Package Manager:** pnpm 10.34+ / 11
* **API / Defense Gateway:** Hono v4 (Mounted at `/api/[[...route]]`)
* **Styling & UI:** Tailwind CSS v4, Lucide React, Radix UI primitives
* **Motion & Cyber Effects:** React Bits (`DecryptedText`, `SpotlightCard`, `ShinyText`, `CyberGrid`, `CountUp`) + Framer Motion
* **Telemetry & Visualization:** Recharts

---

## 🚀 Quickstart

```bash
# Navigate to project directory
cd talawang-ai

# Install dependencies (if not already installed)
pnpm install

# Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the dashboard.

---

## 🎬 2-Minute Live Pitch & Demo Flow

When presenting to judges:

1. **Minute 0:00 – 0:30 (Problem Hook):**
   * Introduce the rising threat of GenAI jailbreaks and deepfake voice scams bypassing standard firewalls.
   * Introduce **Talawang AI** as the digital Dayak shield for modern AI infrastructure.
2. **Minute 0:30 – 1:15 (Live Attack Interception Demo):**
   * In the **Interactive Sandbox**, select **`⚡ DAN Jailbreak`** or **`🕵️ System Prompt Leak`**.
   * Hit **Execute Talawang Defense Inspection**.
   * Show the sub-20ms latency badge (`⚡ 13.8ms`), `BLOCKED` verdict, entropy score, and automated mitigation advice.
3. **Minute 1:15 – 1:40 (Deepfake Voice Scan Demo):**
   * Switch to **Deepfake Voice Defense** tab.
   * Scan the synthetic CEO wire transfer audio sample to highlight spectral harmonic anomaly detection.
4. **Minute 1:40 – 2:00 (Kaspersky YARA Integration):**
   * Click **Export YARA** in the navbar to demonstrate real-time threat intelligence export compatible with Kaspersky SIEM feeds.
