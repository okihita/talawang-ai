"use client";

import DayakShieldBadge from "./DayakShieldBadge";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { QrCode, Download, BookOpen, LayoutDashboard, Play, Shield } from "lucide-react";

interface NavbarProps {
  onOpenYaraModal: () => void;
  onOpenQrModal: () => void;
}

export default function Navbar({
  onOpenYaraModal,
  onOpenQrModal,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        
        {/* Brand & Clean Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3.5 group">
            <DayakShieldBadge size={36} glow={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white group-hover:text-emerald-500 transition">
                  Talawang<span className="text-emerald-500">.ai</span>
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                AI Firewall & Security Gateway
              </p>
            </div>
          </Link>
        </div>

        {/* Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-2 font-medium text-sm text-zinc-600 dark:text-zinc-300">
          <Link
            href="/#demo"
            className="flex items-center gap-2 rounded-xl px-4 py-2 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            <Play className="h-4 w-4 text-emerald-500" />
            <span>Live Demo</span>
          </Link>

          <Link
            href="/#how-it-works"
            className="flex items-center gap-2 rounded-xl px-4 py-2 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            <LayoutDashboard className="h-4 w-4 text-zinc-400" />
            <span>How It Works</span>
          </Link>

          <Link
            href="/study-cases"
            className="flex items-center gap-2 rounded-xl px-4 py-2 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            <BookOpen className="h-4 w-4 text-teal-500" />
            <span>Case Studies</span>
          </Link>
        </nav>

        {/* Right Actions & Light/Dark Theme Switch */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQrModal}
            className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:text-emerald-300 transition hover:bg-emerald-500/20 hover:border-emerald-500/60 shadow-sm"
          >
            <QrCode className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Mobile Sandbox</span>
          </button>

          <button
            onClick={onOpenYaraModal}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
          >
            <Download className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span>YARA Export</span>
          </button>

          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
