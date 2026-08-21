"use client";

import { useState, useEffect } from "react";
import CyberGrid from "@/components/react-bits/CyberGrid";
import Navbar from "@/components/Navbar";
import InteractiveSandbox from "@/components/InteractiveSandbox";
import YaraExporterModal from "@/components/YaraExporterModal";
import QrChallengeModal from "@/components/QrChallengeModal";
import DayakShieldBadge from "@/components/DayakShieldBadge";
import { ThreatEvent } from "@/server/telemetry/threat-store";
import { PromptScanResult } from "@/server/detectors/prompt-injection";
import {
  ShieldCheck,
  Zap,
  Code2,
  Lock,
  ArrowRight,
  QrCode,
  Smartphone,
  BookOpen,
  Building2,
  Layers,
  Scale,
  Sparkles,
  Play,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [isYaraOpen, setIsYaraOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [stats, setStats] = useState({
    totalScanned: 14280,
    totalBlocked: 1842,
    blockRatePercentage: 12.9,
    averageLatencyMs: 13.8,
    accuracyRate: 99.4,
  });

  // Fetch telemetry
  const fetchTelemetry = async () => {
    try {
      const res = await fetch("/api/telemetry");
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
        setEvents(json.data.recentEvents);
      }
    } catch (e) {
      console.error("Telemetry fetch failed:", e);
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  const handleScanComplete = (scan: PromptScanResult, prompt: string) => {
    fetchTelemetry();
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Calm ambient background */}
      <CyberGrid />

      {/* Main Navigation */}
      <Navbar
        onOpenYaraModal={() => setIsYaraOpen(true)}
        onOpenQrModal={() => setIsQrOpen(true)}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 space-y-24">
        
        {/* ========================================================================= */}
        {/* HERO SECTION (The 5-Second Test)                                         */}
        {/* ========================================================================= */}
        <section className="text-center space-y-6 pt-4 max-w-4xl mx-auto">
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300 font-medium">
            <DayakShieldBadge size={18} glow={false} />
            <span>Built for HackNusa 2026 • Telkom University x Kaspersky</span>
          </div>

          {/* Big, Clear Headline */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            The invisible bodyguard for your{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              AI chatbots & agents
            </span>
          </h1>

          {/* Subheading in Plain English */}
          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto font-sans">
            Prevent customer support bots from leaking passwords, approving fake refunds, or getting tricked by prompt injections.
            Installs in <strong>60 seconds</strong> with just <strong>1 line of code</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#demo"
              className="w-full sm:w-auto rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-8 py-4 text-base shadow-xl shadow-emerald-950/50 transition flex items-center justify-center gap-2"
            >
              <Play className="h-5 w-5 fill-current" />
              <span>Try Live Demo (No Install Needed)</span>
            </a>

            <button
              onClick={() => setIsQrOpen(true)}
              className="w-full sm:w-auto rounded-2xl border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 text-white font-semibold px-6 py-4 text-base transition flex items-center justify-center gap-2"
            >
              <QrCode className="h-5 w-5 text-emerald-400" />
              <span>Scan QR on Phone</span>
            </button>
          </div>

          {/* Simple Proof Points */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-zinc-400 font-mono">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              ⚡ Sub-15ms Latency
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              🇮🇩 Indonesian & Javanese Support
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-purple-400" />
              🔒 UU PDP Compliant
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE DEMO (Before & After Comparison)                              */}
        {/* ========================================================================= */}
        <section id="demo" className="scroll-mt-28 space-y-4">
          <InteractiveSandbox onScanComplete={handleScanComplete} />
        </section>

        {/* ========================================================================= */}
        {/* HOW IT WORKS (3 Simple Steps)                                             */}
        {/* ========================================================================= */}
        <section id="how-it-works" className="scroll-mt-28 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-sm font-mono font-semibold uppercase tracking-wider text-emerald-400">
              SIMPLE INTEGRATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              How It Works in 3 Simple Steps
            </h2>
            <p className="text-base text-zinc-400 max-w-2xl mx-auto">
              You don't need to rebuild your software or hire AI security researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-white">Change 1 Line of Code</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Point your existing OpenAI, DeepSeek, or LangChain API URL to Talawang's proxy gateway (`gateway.talawang.ai`).
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-white">We Inspect in &lt;15ms</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Every incoming message is scanned for jailbreaks, prompt injections, and hidden Unicode steganography before it reaches your model.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-white">Zero Data Leaks</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Attacks are neutralized instantly. Intercepted threats automatically compile into Kaspersky-compatible YARA audit logs.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHO IS THIS FOR? (Real Businesses)                                        */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <span className="text-sm font-mono font-semibold uppercase tracking-wider text-cyan-400">
                REAL-WORLD USE CASES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                Built for Companies Deploying AI
              </h2>
            </div>
            <Link
              href="/study-cases"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 text-sm font-medium transition w-fit"
            >
              <span>Read 4 In-Depth Case Studies</span>
              <ArrowRight className="h-4 w-4 text-cyan-400" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Building2 className="h-5 w-5 text-emerald-400" />
                <span>Fintechs & Digital Banks</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Protects WhatsApp and in-app AI customer service bots from leaking account numbers, customer NIKs, or database connection strings.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Layers className="h-5 w-5 text-cyan-400" />
                <span>E-Commerce & Retail</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Prevents automated customer dispute bots from being tricked into issuing unauthorized refunds or fake discount coupons.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <Lock className="h-5 w-5 text-purple-400" />
                <span>Internal Enterprise Copilots</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                Stops employees from using persona jailbreaks to extract un-redacted salary bands or confidential strategy memos from internal wikis.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-zinc-900 bg-zinc-950 py-10 text-center text-sm text-zinc-500 font-mono">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <DayakShieldBadge size={22} glow={false} />
            <span className="text-zinc-300 font-bold">Talawang AI</span>
            <span>— Securing Tomorrow, Innovating Trust</span>
          </div>
          <p>
            Submission Prototype for <strong className="text-zinc-300">HackNusa 2026</strong> (Telkom University x Kaspersky)
          </p>
        </div>
      </footer>

      {/* Modals */}
      <YaraExporterModal isOpen={isYaraOpen} onClose={() => setIsYaraOpen(false)} />
      <QrChallengeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
}
