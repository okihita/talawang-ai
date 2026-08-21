"use client";

export default function CyberGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Calm ambient gradient backdrop */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[500px] bg-gradient-to-b from-emerald-500/10 dark:from-emerald-500/10 via-teal-500/5 to-transparent blur-3xl rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/5 blur-3xl rounded-full" />
      
      {/* Subtle, calm dot grid adapted for light/dark mode */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.08] text-zinc-900 dark:text-zinc-100"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />
    </div>
  );
}
