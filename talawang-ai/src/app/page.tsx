"use client";

import { useState, useEffect } from "react";
import CyberGrid from "@/components/react-bits/CyberGrid";
import Navbar from "@/components/Navbar";
import InteractiveSandbox from "@/components/InteractiveSandbox";
import FullscreenStoryStage from "@/components/FullscreenStoryStage";
import YaraExporterModal from "@/components/YaraExporterModal";
import QrChallengeModal from "@/components/QrChallengeModal";
import DayakShieldBadge from "@/components/DayakShieldBadge";
import { ThreatEvent } from "@/server/telemetry/threat-store";
import { PromptScanResult } from "@/server/detectors/prompt-injection";
import {
  ShieldCheck,
  ShieldAlert,
  Zap,
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
  CheckCircle2,
  FileCode2,
  Globe2,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [isYaraOpen, setIsYaraOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [events, setEvents] = useState<ThreatEvent[]>([]);

  const fetchTelemetry = async () => {
    try {
      const res = await fetch("/api/telemetry");
      const json = await res.json();
      if (json.success) {
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
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-emerald-500/20 selection:text-emerald-800 dark:selection:text-emerald-200">
      {/* Calm ambient background */}
      <CyberGrid />

      {/* Main Navigation */}
      <Navbar
        onOpenYaraModal={() => setIsYaraOpen(true)}
        onOpenQrModal={() => setIsQrOpen(true)}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-16 sm:py-24 space-y-32">
        
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-6">
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-sm">
            <DayakShieldBadge size={16} glow={false} />
            <span>Built for HackNusa 2026 • Telkom University × Kaspersky</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            The invisible firewall for your{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
              AI chatbots & agents
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto font-normal">
            Prevent customer support bots from leaking passwords, executing unauthorized refunds, or succumbing to multi-lingual prompt injections.
            Installs in <strong>60 seconds</strong> with just <strong>1 line of code</strong>.
          </p>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsStoryOpen(true)}
              className="w-full sm:w-auto rounded-2xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-bold px-8 py-4 text-base shadow-xl shadow-emerald-950/20 transition flex items-center justify-center gap-2.5"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Launch Fullscreen Story Walkthrough</span>
            </button>

            <button
              onClick={() => setIsQrOpen(true)}
              className="w-full sm:w-auto rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white font-semibold px-6 py-4 text-base transition flex items-center justify-center gap-2.5 shadow-sm"
            >
              <QrCode className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Scan QR with Phone</span>
            </button>
          </div>

          {/* Value Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-emerald-500" />
              Sub-15ms Latency Overhead
            </span>
            <span className="flex items-center gap-2">
              <Globe2 className="h-3.5 w-3.5 text-teal-500" />
              Bahasa Indonesia & Javanese
            </span>
            <span className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-cyan-500" />
              UU PDP & OWASP Compliant
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE DEMO (Inline Story & Sandbox)                                 */}
        {/* ========================================================================= */}
        <section id="demo" className="scroll-mt-28 space-y-6">
          <InteractiveSandbox
            onScanComplete={handleScanComplete}
            onOpenFullscreen={() => setIsStoryOpen(true)}
          />
        </section>

        {/* ========================================================================= */}
        {/* HOW IT WORKS (3 Simple Steps)                                             */}
        {/* ========================================================================= */}
        <section id="how-it-works" className="scroll-mt-28 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Architecture & Integration
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              How It Works in 3 Steps
            </h2>
            <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Drop-in protection for existing AI applications with zero retraining required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-8 sm:p-10 space-y-4 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Route Through Proxy</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Update your OpenAI, DeepSeek, or LangChain base URL to point to Talawang’s edge endpoint.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-8 sm:p-10 space-y-4 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Sub-15ms Pre-Inspection</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every prompt is evaluated for semantic overrides, invisible Unicode steganography, and tool hijack attempts.
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-8 sm:p-10 space-y-4 shadow-sm">
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Immediate Neutralization</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Malicious payloads are halted instantly. Clean requests pass through to the model with zero perceivable delay.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ENTERPRISE USE CASES                                                      */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Industry Applications
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Designed for Production AI Deployments
              </h2>
            </div>
            <Link
              href="/study-cases"
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white px-5 py-3 text-sm font-semibold transition w-fit"
            >
              <span>Explore Case Studies</span>
              <ArrowRight className="h-4 w-4 text-emerald-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 font-bold text-zinc-900 dark:text-white text-base">
                <Building2 className="h-5 w-5 text-emerald-500" />
                <span>Fintech & Digital Banking</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Prevents WhatsApp and in-app virtual assistants from leaking customer NIKs, account balances, or API credentials.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 font-bold text-zinc-900 dark:text-white text-base">
                <Layers className="h-5 w-5 text-teal-500" />
                <span>E-Commerce & Marketplaces</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Stops indirect prompt injection in customer support notes from hijacking order refund and voucher generation APIs.
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 font-bold text-zinc-900 dark:text-white text-base">
                <Lock className="h-5 w-5 text-cyan-500" />
                <span>Enterprise Knowledge Search</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Guards internal RAG systems against privilege escalation and unauthorized employee salary table exfiltration.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-12 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <DayakShieldBadge size={20} glow={false} />
            <span className="text-zinc-800 dark:text-zinc-300 font-bold">Talawang AI</span>
            <span>— Securing Tomorrow, Innovating Trust</span>
          </div>
          <p>
            Submission Prototype for <strong className="text-zinc-800 dark:text-zinc-300">HackNusa 2026</strong> (Telkom University × Kaspersky)
          </p>
        </div>
      </footer>

      {/* Fullscreen Story Stage & Modals */}
      <FullscreenStoryStage isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />
      <YaraExporterModal isOpen={isYaraOpen} onClose={() => setIsYaraOpen(false)} />
      <QrChallengeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
}
