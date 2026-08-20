"use client";

import { motion } from "framer-motion";

export default function CyberGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-rose-500/5 blur-3xl rounded-full" />
      
      {/* High-tech dot matrix grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `radial-gradient(rgba(16, 185, 129, 0.4) 1px, transparent 1px), radial-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 16px 16px",
        }}
      />

      {/* Cyber circuit horizontal scanline */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        initial={{ top: "0%" }}
        animate={{ top: "100%" }}
        transition={{
          duration: 8,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
