"use client";

import { useState } from "react";
import { X, Copy, Check, Download, ShieldCheck, Terminal } from "lucide-react";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500/10 p-2.5 text-emerald-400 border border-emerald-500/20">
              <Terminal className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">
                KASPERSKY YARA RULE EXPORTER
              </h3>
              <p className="text-sm text-zinc-400">
                Automated threat intelligence signature compatible with Kaspersky SIEM & YARA scanners.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Code View */}
        <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/90 p-5 font-mono text-sm text-emerald-400 overflow-x-auto max-h-[340px]">
          <pre>{ruleContent}</pre>
        </div>

        {/* Modal Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-300 font-mono">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <span>Syntax: YARA v4.3+ Spec</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-200 transition hover:bg-zinc-700 hover:text-white"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? "Copied" : "Copy Signature"}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/50 transition hover:bg-emerald-500"
            >
              <Download className="h-4 w-4" />
              <span>Download .YAR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
