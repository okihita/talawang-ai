"use client";

import { useState } from "react";
import { X, Copy, Check, Download, ShieldCheck, Terminal, FileCode2 } from "lucide-react";
import { generateYaraRule } from "@/server/telemetry/threat-store";

interface YaraExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function YaraExporterModal({ isOpen, onClose }: YaraExporterModalProps) {
  const [copied, setCopied] = useState(false);
  const ruleContent = generateYaraRule();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(ruleContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([ruleContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "talawang_adversarial_rule.yar";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <FileCode2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Kaspersky YARA Rule Generator
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Threat signature output formatted for enterprise SIEM ingestion.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Code View */}
        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 p-5 text-xs text-emerald-400 overflow-x-auto max-h-[320px]">
          <pre>{ruleContent}</pre>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>YARA v4.3+ Spec Compliant</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-500 dark:hover:bg-emerald-400 px-5 py-2.5 text-xs font-bold text-white dark:text-zinc-950 shadow-md transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download .YAR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
