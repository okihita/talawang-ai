"use client";

import DayakShieldBadge from "./DayakShieldBadge";
import DecryptedText from "./react-bits/DecryptedText";
import ShinyText from "./react-bits/ShinyText";
import Link from "next/link";
import { Shield, Zap, QrCode, Download, AlertTriangle, BookOpen, LayoutDashboard } from "lucide-react";

interface NavbarProps {
  onOpenYaraModal: () => void;
  onOpenQrModal: () => void;
  onQuickSimulate: (type: string) => void;
  isSimulating: boolean;
}

export default function Navbar({
  onOpenYaraModal,
  onOpenQrModal,
  onQuickSimulate,
  isSimulating,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Cultural Motif */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3.5 group">
            <DayakShieldBadge size={42} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-wider text-white">
                  TALAWANG<span className="text-emerald-400">.AI</span>
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-sm font-semibold text-emerald-400 font-mono">
                  v1.0
                </span>
              </div>
              <p className="text-sm text-zinc-400 flex items-center gap-2 font-mono">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <DecryptedText
                  text="AUTONOMOUS CYBER DEFENSE GATEWAY"
                  speed={30}
                  maxIterations={10}
                  className="text-sm text-zinc-400"
                />
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-3 font-mono text-sm">
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-zinc-300 hover:border-emerald-500/40 hover:text-emerald-300 transition"
          >
            <LayoutDashboard className="h-4 w-4 text-emerald-400" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/study-cases"
            className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2 text-zinc-300 hover:border-cyan-500/40 hover:text-cyan-300 transition"
          >
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <span>Study Cases</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Projector Audience QR Button */}
          <button
            onClick={onOpenQrModal}
            className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20 hover:border-emerald-500/60 shadow-sm"
          >
            <QrCode className="h-4 w-4 text-emerald-400" />
            <span>Audience QR Hack</span>
          </button>

          <button
            onClick={() => onQuickSimulate("dan")}
            disabled={isSimulating}
            className="hidden lg:flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3.5 py-2.5 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20 hover:border-rose-500/50 disabled:opacity-50"
          >
            {isSimulating ? (
              <Zap className="h-4 w-4 animate-spin text-rose-400" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-rose-400" />
            )}
            <span>Simulate</span>
          </button>

          <button
            onClick={onOpenYaraModal}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800/80 px-3.5 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
          >
            <Download className="h-4 w-4 text-cyan-400" />
            <span>YARA</span>
          </button>
        </div>
      </div>
    </header>
  );
}
