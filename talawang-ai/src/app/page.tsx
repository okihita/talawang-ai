"use client";

import { useState, useEffect } from "react";
import CyberGrid from "@/components/react-bits/CyberGrid";
import Navbar from "@/components/Navbar";
import TelemetryOverview from "@/components/TelemetryOverview";
import InteractiveSandbox from "@/components/InteractiveSandbox";
import ThreatRadar from "@/components/ThreatRadar";
import YaraExporterModal from "@/components/YaraExporterModal";
import QrChallengeModal from "@/components/QrChallengeModal";
import DayakShieldBadge from "@/components/DayakShieldBadge";
import ShinyText from "@/components/react-bits/ShinyText";
import DecryptedText from "@/components/react-bits/DecryptedText";
import { ThreatEvent } from "@/server/telemetry/threat-store";
import { PromptScanResult } from "@/server/detectors/prompt-injection";
import { Shield, Sparkles, AlertTriangle, ArrowRight, QrCode, Smartphone, BookOpen } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [isYaraOpen, setIsYaraOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [events, setEvents] = useState<ThreatEvent[]>([]);
  const [stats, setStats] = useState({
    totalScanned: 14280,
    totalBlocked: 1842,
    blockRatePercentage: 12.9,
    averageLatencyMs: 13.8,
    accuracyRate: 99.4,
    hourlyTrends: [
      { time: "00:00", clean: 420, attacks: 42 },
      { time: "04:00", clean: 210, attacks: 28 },
      { time: "08:00", clean: 780, attacks: 94 },
      { time: "12:00", clean: 1250, attacks: 185 },
      { time: "16:00", clean: 1480, attacks: 210 },
      { time: "20:00", clean: 950, attacks: 132 },
    ],
    attackTypesDistribution: [
      { name: "Jailbreak / DAN", count: 742, color: "#f43f5e" },
      { name: "System Prompt Leak", count: 489, color: "#fb923c" },
      { name: "RAG Exfiltration", count: 312, color: "#a855f7" },
      { name: "Hidden Unicode", count: 184, color: "#38bdf8" },
      { name: "Voice Clones", count: 115, color: "#ec4899" },
    ],
  });

  // Fetch telemetry from server
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

  // Real-time polling every 2.5s for live projector updates during audience hack challenge
  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 2500);
    return () => clearInterval(interval);
  }, []);

  // Quick simulate handler
  const handleQuickSimulate = async (type: string) => {
    setIsSimulating(true);
    try {
      const res = await fetch("/api/simulate-attack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (data.success) {
        await fetchTelemetry();
      }
    } catch (err) {
      console.error("Simulation failed:", err);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleScanComplete = (scan: PromptScanResult, prompt: string) => {
    fetchTelemetry();
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* High-tech Animated Cyber Grid */}
      <CyberGrid />

      {/* Main Navigation */}
      <Navbar
        onOpenYaraModal={() => setIsYaraOpen(true)}
        onOpenQrModal={() => setIsQrOpen(true)}
        onQuickSimulate={handleQuickSimulate}
        isSimulating={isSimulating}
      />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
        {/* Hero Section */}
        <section className="relative rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-zinc-900/60 to-zinc-950/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
                <DayakShieldBadge size={20} glow={false} />
                <span className="font-mono font-semibold">TALAWANG AI DEFENSE PROTOCOL</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Autonomous Cyber Defense for{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Generative AI & Deepfakes
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
                Inspired by the legendary Dayak <strong className="text-emerald-300">Talawang</strong> shield,
                our lightweight middleware gateway intercepts multi-lingual prompt injections, tool hijacking,
                and synthetic voice cloning in <strong className="text-white font-mono">&lt;15ms</strong> before they reach your models.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2 text-sm font-mono text-zinc-400">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  OWASP LLM Top 10 Coverage
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                  Kaspersky YARA Feeds Ready
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                  Hono + Next.js 16 Edge Architecture
                </span>
              </div>
            </div>

            {/* Quick Demo & QR CTA Card */}
            <div className="rounded-2xl border border-emerald-500/40 bg-zinc-900/90 p-6 lg:min-w-[320px] space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono uppercase text-emerald-400 font-bold flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  AUDIENCE RED-TEAM DEMO
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Put the QR code on the screen and let judges test live attacks from their smartphones:
              </p>

              <button
                onClick={() => setIsQrOpen(true)}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:from-emerald-500 hover:to-teal-500 flex items-center justify-center gap-2"
              >
                <QrCode className="h-4 w-4" />
                <span>Show Fullscreen QR Code</span>
              </button>

              <Link
                href="/study-cases"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:text-white transition flex items-center justify-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-cyan-400" />
                <span>View Real Study Cases</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Telemetry Overview Metrics */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-300">
              REAL-TIME DEFENSE METRICS
            </h2>
            <span className="text-sm font-mono text-emerald-400 font-semibold">● LIVE POLLING ACTIVE (2.5s)</span>
          </div>
          <TelemetryOverview
            totalScanned={stats.totalScanned}
            totalBlocked={stats.totalBlocked}
            blockRatePercentage={stats.blockRatePercentage}
            averageLatencyMs={stats.averageLatencyMs}
            accuracyRate={stats.accuracyRate}
          />
        </section>

        {/* Main Interactive Sandbox (Live Demo Flow) */}
        <section className="space-y-4">
          <InteractiveSandbox onScanComplete={handleScanComplete} />
        </section>

        {/* Live Threat Radar & Ticker */}
        <section className="space-y-4">
          <ThreatRadar
            events={events}
            hourlyTrends={stats.hourlyTrends}
            attackTypesDistribution={stats.attackTypesDistribution}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-zinc-900 bg-zinc-950 py-8 text-center text-sm text-zinc-400 font-mono">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <DayakShieldBadge size={24} glow={false} />
            <span className="text-zinc-200 font-bold">Talawang AI</span>
            <span>— Securing Tomorrow, Innovating Trust</span>
          </div>
          <p>
            Submission Prototype for <strong className="text-zinc-200">HackNusa 2026</strong> (Telkom University x Kaspersky)
          </p>
        </div>
      </footer>

      {/* Modals */}
      <YaraExporterModal isOpen={isYaraOpen} onClose={() => setIsYaraOpen(false)} />
      <QrChallengeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
}
