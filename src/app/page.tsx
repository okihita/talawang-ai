"use client";

import { useState, useEffect } from "react";
import CyberGrid from "@/components/react-bits/CyberGrid";
import Navbar from "@/components/Navbar";
import InteractiveSandbox from "@/components/InteractiveSandbox";
import TechnicalArchitecture from "@/components/TechnicalArchitecture";
import FullscreenStoryStage from "@/components/FullscreenStoryStage";
import DayakShieldBadge from "@/components/DayakShieldBadge";
import { ThreatEvent } from "@/server/telemetry/threat-store";
import { PromptScanResult } from "@/server/detectors/prompt-injection";
import { useI18n } from "@/i18n/I18nContext";
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  BookOpen,
  Building2,
  Layers,
  Play,
  Globe2,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { t } = useI18n();
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
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 py-20 sm:py-32 space-y-40 sm:space-y-56">
        
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="text-center space-y-10 max-w-4xl mx-auto pt-8 sm:pt-16">
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 shadow-sm">
            <DayakShieldBadge size={16} glow={false} />
            <span>{t.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
            {t.hero.titlePrefix}{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 dark:from-emerald-400 dark:via-teal-300 dark:to-cyan-400 bg-clip-text text-transparent">
              {t.hero.titleGradient}
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto font-normal">
            {t.hero.description}
          </p>

          {/* CTA Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("demo");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="w-full sm:w-auto rounded-2xl bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-zinc-950 font-bold px-8 py-4 text-base shadow-xl shadow-emerald-950/20 transition flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Play className="h-4 w-4 fill-current" />
              <span>{t.hero.tryDemoBtn}</span>
            </button>

            <Link
              href="/study-cases"
              className="w-full sm:w-auto rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-white font-semibold px-7 py-4 text-base transition flex items-center justify-center gap-2.5 shadow-sm"
            >
              <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.hero.caseStudiesBtn}</span>
            </Link>
          </div>

          {/* Value Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-emerald-500" />
              {t.hero.proofLatency}
            </span>
            <span className="flex items-center gap-2">
              <Globe2 className="h-3.5 w-3.5 text-teal-500" />
              {t.hero.proofLang}
            </span>
            <span className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-cyan-500" />
              {t.hero.proofCompliance}
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE DEMO (Inline Story & Sandbox)                                 */}
        {/* ========================================================================= */}
        <section id="demo" className="scroll-mt-28 space-y-8">
          <InteractiveSandbox
            onScanComplete={handleScanComplete}
            onOpenFullscreen={() => setIsStoryOpen(true)}
          />
        </section>

        {/* ========================================================================= */}
        {/* ARCHITECTURE & HOW IT WORKS (Technical Deep-Dive for CISO / CTO)          */}
        {/* ========================================================================= */}
        <TechnicalArchitecture />

        {/* ========================================================================= */}
        {/* ENTERPRISE USE CASES                                                      */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 sm:p-12 space-y-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                {t.useCases.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                {t.useCases.title}
              </h2>
            </div>
            <Link
              href="/study-cases"
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white px-5 py-3 text-sm font-semibold transition w-fit"
            >
              <span>{t.useCases.cta}</span>
              <ArrowRight className="h-4 w-4 text-emerald-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 font-bold text-zinc-900 dark:text-white text-base">
                <Building2 className="h-5 w-5 text-emerald-500" />
                <span>{t.useCases.fintechTitle}</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.useCases.fintechDesc}
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 font-bold text-zinc-900 dark:text-white text-base">
                <Layers className="h-5 w-5 text-teal-500" />
                <span>{t.useCases.ecommerceTitle}</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.useCases.ecommerceDesc}
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 font-bold text-zinc-900 dark:text-white text-base">
                <Lock className="h-5 w-5 text-cyan-500" />
                <span>{t.useCases.ragTitle}</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.useCases.ragDesc}
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-16 sm:py-20 text-center text-xs text-zinc-500">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <DayakShieldBadge size={20} glow={false} />
            <span className="text-zinc-800 dark:text-zinc-300 font-bold">Talawang AI</span>
            <span>— {t.footer.tagline}</span>
          </div>
          <p>
            {t.footer.subText} <strong className="text-zinc-800 dark:text-zinc-300">HackNusa 2026</strong> (Telkom University × Kaspersky)
          </p>
        </div>
      </footer>

      {/* Fullscreen Story Stage */}
      <FullscreenStoryStage isOpen={isStoryOpen} onClose={() => setIsStoryOpen(false)} />
    </div>
  );
}
