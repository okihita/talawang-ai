"use client";

import { useI18n } from "@/i18n/I18nContext";
import { Globe2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function LanguageToggle() {
  const { lang, toggleLang } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-20 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900" />
    );
  }

  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      className="flex h-10 items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-3 text-xs font-bold text-zinc-700 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer shadow-sm"
    >
      <Globe2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
      <span className="tracking-wide uppercase">
        {lang === "id" ? "ID" : "EN"}
      </span>
      <span className="text-[10px] text-zinc-400 font-normal">
        {lang === "id" ? "• IDN" : "• ENG"}
      </span>
    </button>
  );
}
