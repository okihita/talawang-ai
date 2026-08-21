"use client";

import { motion } from "framer-motion";

interface DayakShieldBadgeProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export default function DayakShieldBadge({
  className = "",
  size = 36,
  glow = true,
}: DayakShieldBadgeProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {glow && (
        <div
          className="absolute -inset-1 bg-emerald-500/20 blur-md rounded-full"
          style={{ width: size + 8, height: size + 8 }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 transition-transform duration-300 hover:scale-105"
      >
        {/* Talawang Shield Outer Contour */}
        <polygon
          points="32,4 54,16 54,48 32,60 10,48 10,16"
          fill="url(#shieldGrad)"
          stroke="#10b981"
          strokeWidth="2"
        />

        {/* Inner Cyber Circuitry / Dayak Motif Inlay */}
        <path
          d="M32 8 V56"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <path
          d="M18 22 Q32 30 46 22"
          stroke="#06b6d4"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M18 42 Q32 34 46 42"
          stroke="#06b6d4"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Central Defense Core Node */}
        <circle cx="32" cy="32" r="5" fill="#10b981" />
        <circle cx="32" cy="32" r="8" stroke="#34d399" strokeWidth="1" opacity="0.6" />

        {/* Gradients */}
        <defs>
          <linearGradient id="shieldGrad" x1="10" y1="4" x2="54" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#064e3b" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#042f2e" stopOpacity="0.9" />
            <stop offset="1" stopColor="#022c22" stopOpacity="0.95" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
