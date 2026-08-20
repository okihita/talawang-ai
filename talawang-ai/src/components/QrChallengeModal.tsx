"use client";

import { useEffect, useState } from "react";
import { X, QrCode, Smartphone, ExternalLink, ShieldCheck, Zap } from "lucide-react";

interface QrChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QrChallengeModal({ isOpen, onClose }: QrChallengeModalProps) {
  const [hackUrl, setHackUrl] = useState("http://localhost:3000/hack");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHackUrl(`${window.location.origin}/hack`);
    }
  }, []);

  if (!isOpen) return null;

  // Use a reliable QR Code SVG API
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
    hackUrl
  )}&color=059669&bgcolor=090d16`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-emerald-500/40 bg-zinc-950 p-6 sm:p-8 shadow-2xl shadow-emerald-950/50 text-center space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400 font-mono">
          <Zap className="h-4 w-4 animate-pulse text-emerald-400" />
          <span>LIVE AUDIENCE RED-TEAM CHALLENGE</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Scan to Hack the AI Bot
        </h3>
        <p className="text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
          Scan this QR code with your phone camera, type your prompt injection or jailbreak, and watch this screen intercept it live!
        </p>

        {/* QR Code Container */}
        <div className="pt-2 flex flex-col items-center justify-center">
          <div className="relative p-3.5 rounded-3xl border-2 border-emerald-500/40 bg-zinc-900 shadow-2xl overflow-hidden group">
            {/* Corner Cyber accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

            <img
              src={qrApiUrl}
              alt="Scan QR Code to Open Mobile Hack Sandbox"
              className="w-60 h-60 sm:w-64 sm:h-64 rounded-2xl"
            />
          </div>

          <a
            href="/hack"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-mono font-semibold underline underline-offset-4"
          >
            <span>{hackUrl}</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="border-t border-zinc-800/80 pt-4 flex items-center justify-center gap-2 text-sm font-mono text-zinc-300">
          <Smartphone className="h-5 w-5 text-emerald-400" />
          <span>Mobile Compatible • Zero Install Required</span>
        </div>
      </div>
    </div>
  );
}
