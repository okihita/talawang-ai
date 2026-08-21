"use client";

import { ThreatEvent } from "@/server/telemetry/threat-store";
import { ShieldAlert, Activity, Radio, Clock, Globe } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface ThreatRadarProps {
  events: ThreatEvent[];
  hourlyTrends: { time: string; clean: number; attacks: number }[];
  attackTypesDistribution: { name: string; count: number; color: string }[];
}

export default function ThreatRadar({
  events,
  hourlyTrends,
  attackTypesDistribution,
}: ThreatRadarProps) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      {/* Live Threat Telemetry Event Ticker (7 Cols) */}
      <div className="lg:col-span-7 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <Radio className="h-5 w-5 text-rose-400 animate-pulse" />
            <h3 className="text-sm font-bold text-white tracking-tight uppercase">
              LIVE THREAT INTERCEPT STREAM
            </h3>
          </div>
          <span className="text-xs font-semibold text-zinc-300 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
            BUFFER: {events.length} EVENTS
          </span>
        </div>

        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 text-xs transition hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      evt.verdict === "BLOCKED" ? "bg-rose-500 animate-pulse" : "bg-emerald-400"
                    }`}
                  />
                  <span className="font-bold text-zinc-100 text-xs">
                    {evt.attackType}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-zinc-400">⚡ {evt.latencyMs}ms</span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                      evt.verdict === "BLOCKED"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {evt.verdict}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-xs text-zinc-300 truncate bg-zinc-950/80 p-2.5 rounded-lg border border-zinc-800/50 leading-relaxed">
                {evt.payloadSnippet}
              </p>

              <div className="mt-2.5 flex items-center justify-between text-xs text-zinc-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-zinc-400" />
                  {evt.sourceIp}
                </span>
                <span>{new Date(evt.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Volume Chart & Attack Breakdown (5 Cols) */}
      <div className="lg:col-span-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-6 backdrop-blur-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-4">
            <h3 className="text-sm font-bold text-white tracking-tight uppercase flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" />
              THREAT SPECTRUM & VOLUME
            </h3>
            <span className="text-xs font-bold text-emerald-400">24H TIMELINE</span>
          </div>

          {/* Area Chart */}
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyTrends} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#f43f5e" stopOpacity={0.8} />
                    <stop stopColor="#f43f5e" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorClean" x1="0" y1="0" x2="0" y2="1">
                    <stop stopColor="#10b981" stopOpacity={0.6} />
                    <stop stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#09090b",
                    borderColor: "#27272a",
                    fontSize: "12px",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="attacks"
                  stroke="#f43f5e"
                  fillOpacity={1}
                  fill="url(#colorAttacks)"
                  name="Adversarial Attacks"
                />
                <Area
                  type="monotone"
                  dataKey="clean"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorClean)"
                  name="Verified Clean"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attack Type Badges */}
        <div className="mt-5 pt-4 border-t border-zinc-800/80">
          <span className="text-xs text-zinc-300 block mb-2 font-bold uppercase tracking-wider">
            TOP VECTOR DISTRIBUTION:
          </span>
          <div className="space-y-2">
            {attackTypesDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-zinc-200 font-medium">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span className="text-zinc-400 font-semibold">{item.count} attacks</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
