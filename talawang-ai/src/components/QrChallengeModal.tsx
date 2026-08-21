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

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
    hackUrl
  )}&color=059669&bgcolor=ffffff`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-2xl text-center space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-semibold">
          <Smartphone className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Audience Mobile Sandbox</span>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Test on Your Smartphone
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Scan this QR code with your phone camera to test prompt injection attacks against Bank Nusa AI.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="pt-2 flex flex-col items-center justify-center">
          <div className="p-4 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-md">
            <img
              src={qrApiUrl}
              alt="Scan QR Code to Open Mobile Sandbox"
              className="w-56 h-56 rounded-2xl"
            />
          </div>

          <a
            href="/hack"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
          >
            <span>{hackUrl}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800/80 pt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          <span>Zero installation required</span>
        </div>
      </div>
    </div>
  );
}
