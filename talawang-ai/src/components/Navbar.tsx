"use client";

import DayakShieldBadge from "./DayakShieldBadge";
import Link from "next/link";
import { QrCode, Download, BookOpen, LayoutDashboard, Play, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenYaraModal: () => void;
  onOpenQrModal: () => void;
}

export default function Navbar({
  onOpenYaraModal,
  onOpenQrModal,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand & Clean Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <DayakShieldBadge size={38} glow={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition">
                  Talawang<span className="text-emerald-400">.ai</span>
                </span>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-sm font-semibold text-emerald-400 font-mono">
                  v1.0
                </span>
              </div>
              <p className="text-sm text-zinc-400 font-sans">AI Chatbot & Agent Security</p>
            </div>
          </Link>
        </div>

        {/* Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 font-medium text-sm text-zinc-300">
          <Link
            href="/#demo"
            className="flex items-center gap-2 rounded-xl px-4 py-2 hover:text-white hover:bg-zinc-900 transition"
          >
            <Play className="h-4 w-4 text-emerald-400" />
            <span>Live Demo</span>
          </Link>

          <Link
            href="/#how-it-works"
            className="flex items-center gap-2 rounded-xl px-4 py-2 hover:text-white hover:bg-zinc-900 transition"
          >
            <LayoutDashboard className="h-4 w-4 text-zinc-400" />
            <span>How It Works</span>
          </Link>

          <Link
            href="/study-cases"
            className="flex items-center gap-2 rounded-xl px-4 py-2 hover:text-white hover:bg-zinc-900 transition"
          >
            <BookOpen className="h-4 w-4 text-cyan-400" />
            <span>Study Cases</span>
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQrModal}
            className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-bold text-emerald-300 transition hover:bg-emerald-500/20 hover:border-emerald-500/60 shadow-sm"
          >
            <QrCode className="h-4 w-4 text-emerald-400" />
            <span>Scan QR on Phone</span>
          </button>

          <button
            onClick={onOpenYaraModal}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            <Download className="h-4 w-4 text-zinc-400" />
            <span>YARA Rules</span>
          </button>
        </div>
      </div>
    </header>
  );
}
