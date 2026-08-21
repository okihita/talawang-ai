"use client";

import SpotlightCard from "./react-bits/SpotlightCard";
import CountUp from "./react-bits/CountUp";
import { ShieldCheck, ShieldAlert, Zap, Target, ArrowUpRight } from "lucide-react";

interface TelemetryOverviewProps {
  totalScanned: number;
  totalBlocked: number;
  blockRatePercentage: number;
  averageLatencyMs: number;
  accuracyRate: number;
}

export default function TelemetryOverview({
  totalScanned,
  totalBlocked,
  blockRatePercentage,
  averageLatencyMs,
  accuracyRate,
}: TelemetryOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Metric 1: Total Inspected */}
      <SpotlightCard
        spotlightColor="rgba(6, 182, 212, 0.15)"
        className="border-zinc-800 bg-zinc-950/60 p-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            TOTAL PAYLOADS INSPECTED
          </span>
          <div className="rounded-xl bg-cyan-500/10 p-2.5 text-cyan-400 border border-cyan-500/20">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <div className="text-3xl font-bold tracking-tight text-white">
            <CountUp to={totalScanned} duration={1.5} />
          </div>
          <span className="flex items-center text-xs text-cyan-400 font-semibold">
            <ArrowUpRight className="h-3.5 w-3.5" /> +14.2% today
          </span>
        </div>
        <p className="mt-2 text-xs text-zinc-400">
          Real-time semantic & token stream evaluation
        </p>
      </SpotlightCard>

      {/* Metric 2: Attacks Neutralized */}
      <SpotlightCard
        spotlightColor="rgba(244, 63, 94, 0.15)"
        className="border-zinc-800 bg-zinc-950/60 p-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            ATTACKS INTERCEPTED
          </span>
          <div className="rounded-xl bg-rose-500/10 p-2.5 text-rose-400 border border-rose-500/20">
            <ShieldAlert className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <div className="text-3xl font-bold tracking-tight text-rose-400">
            <CountUp to={totalBlocked} duration={1.5} />
          </div>
          <span className="rounded-lg bg-rose-500/10 px-2 py-0.5 text-xs font-bold text-rose-400 border border-rose-500/20">
            {blockRatePercentage}% block rate
          </span>
        </div>
        <p className="mt-2 text-xs text-zinc-400">
          Jailbreaks, prompt leaks & deepfakes blocked
        </p>
      </SpotlightCard>

      {/* Metric 3: Defense Latency */}
      <SpotlightCard
        spotlightColor="rgba(160, 185, 129, 0.15)"
        className="border-zinc-800 bg-zinc-950/60 p-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            DEFENSE LATENCY (P95)
          </span>
          <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20">
            <Zap className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <div className="text-3xl font-bold tracking-tight text-emerald-400">
            <CountUp to={averageLatencyMs} decimals={1} duration={1.2} />
            <span className="text-base font-normal text-zinc-400 ml-1">ms</span>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
            ⚡ Sub-15ms
          </span>
        </div>
        <p className="mt-2 text-xs text-zinc-400">
          Zero-overhead edge middleware gateway
        </p>
      </SpotlightCard>

      {/* Metric 4: Defense Accuracy */}
      <SpotlightCard
        spotlightColor="rgba(168, 85, 247, 0.15)"
        className="border-zinc-800 bg-zinc-950/60 p-6"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            CLASSIFICATION ACCURACY
          </span>
          <div className="rounded-xl bg-purple-500/10 p-2.5 text-purple-400 border border-purple-500/20">
            <Target className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <div className="text-3xl font-bold tracking-tight text-purple-400">
            <CountUp to={accuracyRate} decimals={1} duration={1.2} />
            <span className="text-base font-normal text-zinc-400">%</span>
          </div>
          <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20">
            Kaspersky Eval
          </span>
        </div>
        <p className="mt-2 text-xs text-zinc-400">
          Multi-layer heuristic + latent embeddings
        </p>
      </SpotlightCard>
    </div>
  );
}
