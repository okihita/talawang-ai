"use client";

import { useState } from "react";
import {
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  Code2,
  Copy,
  Check,
  FileCode2,
  Terminal,
  Server,
  Lock,
} from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

export default function TechnicalArchitecture() {
  const { t } = useI18n();
  const [activeCodeTab, setActiveCodeTab] = useState<"ts" | "py" | "curl">("ts");
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    ts: `import OpenAI from "openai";

// 🛡️ Talawang 1-Line Drop-in Gateway
const client = new OpenAI({
  baseURL: "https://gateway.talawang.okihita.dev/v1",
  apiKey: process.env.TALAWANG_API_KEY,
});

// All prompts are inspected at edge in <15ms before hitting OpenAI
const response = await client.chat.completions.create({
  model: "gpt-4o",
  messages: [{ role: "user", content: "Halo Bank Nusa, refund pesanan #892" }],
});`,
    py: `import os
from openai import OpenAI

# 🛡️ Talawang 1-Line Drop-in Gateway
client = OpenAI(
    base_url="https://gateway.talawang.okihita.dev/v1",
    api_key=os.environ["TALAWANG_API_KEY"],
)

# Multi-lingual & Unicode guardrails evaluated before token generation
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Halo Bank Nusa, refund pesanan #892"}],
)`,
    curl: `# 🛡️ Standard OpenAI-compatible HTTP Reverse Proxy
curl https://gateway.talawang.okihita.dev/v1/chat/completions \\
  -H "Authorization: Bearer $TALAWANG_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Halo Bank Nusa, refund pesanan #892"}]
  }'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="how-it-works" className="scroll-mt-28 space-y-16">
      
      {/* Section Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          {t.architecture.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
          {t.architecture.title}
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          {t.architecture.subtitle}
        </p>
      </div>

      {/* 3 Technical Layer Deep-Dive Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Layer 1 */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 sm:p-10 space-y-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg">
                <FileCode2 className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                {t.architecture.layer1Badge}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {t.architecture.layer1Title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {t.architecture.layer1Sub}
              </p>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.architecture.layer1Desc}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-sans">
            <div><strong className="text-zinc-700 dark:text-zinc-300">{t.architecture.layer1Scope}</strong></div>
            <div><strong className="text-zinc-700 dark:text-zinc-300">{t.architecture.layer1Metric}</strong></div>
          </div>
        </div>

        {/* Layer 2 */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 sm:p-10 space-y-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-teal-500/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 font-bold text-lg">
                <Cpu className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-teal-500/10 px-3 py-1 text-xs font-bold text-teal-700 dark:text-teal-300 border border-teal-500/20">
                {t.architecture.layer2Badge}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {t.architecture.layer2Title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {t.architecture.layer2Sub}
              </p>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.architecture.layer2Desc}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-sans">
            <div><strong className="text-zinc-700 dark:text-zinc-300">{t.architecture.layer2Scope}</strong></div>
            <div><strong className="text-zinc-700 dark:text-zinc-300">{t.architecture.layer2Metric}</strong></div>
          </div>
        </div>

        {/* Layer 3 */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 p-8 sm:p-10 space-y-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-bold text-lg">
                <Server className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300 border border-cyan-500/20">
                {t.architecture.layer3Badge}
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {t.architecture.layer3Title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {t.architecture.layer3Sub}
              </p>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {t.architecture.layer3Desc}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-sans">
            <div><strong className="text-zinc-700 dark:text-zinc-300">{t.architecture.layer3Scope}</strong></div>
            <div><strong className="text-zinc-700 dark:text-zinc-300">{t.architecture.layer3Metric}</strong></div>
          </div>
        </div>

      </div>

      {/* 1-Line Integration Code Box (Production Proof) */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-10 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-emerald-500" />
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                {t.architecture.codeHeader}
              </h3>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {t.architecture.codeSub}
            </p>
          </div>

          {/* Language Switcher Tabs */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 p-1 text-xs font-semibold">
              <button
                onClick={() => setActiveCodeTab("ts")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeCodeTab === "ts"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                TypeScript
              </button>
              <button
                onClick={() => setActiveCodeTab("py")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeCodeTab === "py"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Python
              </button>
              <button
                onClick={() => setActiveCodeTab("curl")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeCodeTab === "curl"
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                cURL
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition shadow-sm"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? t.architecture.copiedBtn : t.architecture.copyBtn}</span>
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="rounded-2xl bg-zinc-900 p-5 text-zinc-100 overflow-x-auto text-xs font-mono leading-relaxed border border-zinc-800">
          <pre>{codeSnippets[activeCodeTab]}</pre>
        </div>
      </div>

    </section>
  );
}
