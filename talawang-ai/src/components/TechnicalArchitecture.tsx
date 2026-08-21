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

export default function TechnicalArchitecture() {
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
          Architecture & Zero-Trust Pipeline
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Multi-Layer Defense Pipeline (&lt;15ms Overhead)
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Talawang operates as a zero-trust edge gateway situated inline between your application and downstream LLMs, enforcing mathematical and semantic guardrails before token generation begins.
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
                Layer 1 • ~0.8ms
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Pre-Tokenizer De-Cloaking
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Code-Point & Entropy Sanitizer
              </p>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Inspects raw character code points prior to tokenization. Strips invisible zero-width Unicode characters (<code>U+200B</code> - <code>U+200D</code>, <code>U+FEFF</code>), neutralizes bidirectional override trojans, and calculates character-level <strong>Shannon Entropy</strong> to detect obfuscated shell payloads.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-sans">
            <div><strong className="text-zinc-700 dark:text-zinc-300">Defense Scope:</strong> Zero-Width Smuggling, Homoglyphs</div>
            <div><strong className="text-zinc-700 dark:text-zinc-300">Entropy Threshold:</strong> 4.85 bits/char</div>
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
                Layer 2 • ~4.2ms
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                384D Multi-Lingual Latent Space
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Indonesian & Dialect Vectors
              </p>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Embeds input tokens into a quantized 384-dimensional dense semantic manifold fine-tuned for Bahasa Indonesia, Bahasa Jawa, Sundanese, and colloquial slang. Computes <strong>Cosine Vector Proximity</strong> against known attack topologies to intercept authority impersonation and indirect prompt overrides.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-sans">
            <div><strong className="text-zinc-700 dark:text-zinc-300">Defense Scope:</strong> Regional Jailbreaks, Roleplay Overrides</div>
            <div><strong className="text-zinc-700 dark:text-zinc-300">Embedding Engine:</strong> Quantized 384D Dense ONNX</div>
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
                Layer 3 • ~0.9ms
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                Zero-Trust Reverse Proxy
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Pre-Execution Interception
              </p>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Compatible drop-in proxy for standard OpenAI, DeepSeek, and LangChain endpoints. Intercepts threats at the network edge before hitting downstream model inference (saving 100% of LLM token costs) and streams structured audit logs to enterprise SIEM/SOC infrastructure.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400 space-y-1 font-sans">
            <div><strong className="text-zinc-700 dark:text-zinc-300">Compliance:</strong> UU PDP (UU 27/2022), OWASP LLM Top 10</div>
            <div><strong className="text-zinc-700 dark:text-zinc-300">Integration:</strong> 1-Line <code>baseURL</code> Drop-in</div>
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
                Deploy in 60 Seconds (1 Line of Code)
              </h3>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              No SDK rewrites or model retraining. Just point your client base URL to Talawang.
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
              <span>{copied ? "Copied" : "Copy Code"}</span>
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
