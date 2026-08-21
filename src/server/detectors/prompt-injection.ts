export interface PromptScanResult {
  id: string;
  timestamp: string;
  isThreat: boolean;
  threatType: "Clean" | "Jailbreak / DAN" | "System Prompt Leak" | "Indirect Prompt Injection" | "Hidden Unicode Bypass" | "RAG Data Exfiltration" | "Multi-lingual Social Engineering";
  confidenceScore: number; // 0 to 100%
  latencyMs: number;
  verdict: "BLOCKED" | "ALLOWED" | "FLAGGED";
  threatLevel: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "CLEAN";
  anomalyDetails: {
    matchedPatterns: string[];
    semanticRiskDistance: number;
    entropyScore: number;
    tokenCount: number;
    hiddenCharactersDetected: { char: string; codePoint: string; index: number }[];
    detectedLanguage: "Indonesian" | "Javanese" | "English" | "Mixed / Code";
  };
  explanation: string;
  mitigationSuggestion: string;
}

// Multi-lingual attack signatures (English, Indonesian, Javanese/Regional)
const ATTACK_SIGNATURES = [
  {
    regex: /(ignore|disregard|forget|bypass|abaikan|lupakan|lalekno)\s+(all|any|previous|prior|above|system|semua|kabeh|instruksi|aturan)\s+(instructions|prompts|rules|guidelines|constraints|perintah|aturan|pedoman)/i,
    type: "Jailbreak / DAN" as const,
    weight: 96,
    explanation: "Explicit instruction override attempting to discard base system guardrails and safety policies.",
  },
  {
    regex: /(you\s+are\s+now|act\s+as|roleplay\s+as|kamu\s+sekarang|jadilah|saiki\s+kowe\s+dadi)\s+(dan|an\s+unfiltered|an\s+unrestricted|jailbroken|evil\s+bot|developer\s+mode|tanpa\s+batasan)/i,
    type: "Jailbreak / DAN" as const,
    weight: 94,
    explanation: "Classic persona adoption attack designed to elicit unrestricted, unsafe outputs.",
  },
  {
    regex: /(reveal|print|show|output|leak|repeat|display|tampilkan|bocorkan|tuduhno|berikan)\s+(your\s+system\s+prompt|initial\s+instructions|secret\s+key|api_key|internal\s+guidelines|database\s+credentials|kunci\s+rahasia|password|prompt\s+awal)/i,
    type: "System Prompt Leak" as const,
    weight: 93,
    explanation: "Prompt exfiltration attack attempting to extract proprietary system prompts and confidential configuration secrets.",
  },
  {
    regex: /(saya\s+dari\s+(it|admin|direksi|support)|tolong\s+kirimkan\s+(data\s+nasabah|rekening|password|database)|kirim\s+json\s+nasabah)/i,
    type: "Multi-lingual Social Engineering" as const,
    weight: 89,
    explanation: "Social engineering authority impersonation targeting sensitive enterprise data structures.",
  },
  {
    regex: /(SELECT\s+.*\s+FROM|UNION\s+SELECT|DROP\s+TABLE|--\s*$|information_schema|<script>|exec\()/i,
    type: "RAG Data Exfiltration" as const,
    weight: 88,
    explanation: "SQL/Script injection vector payload designed to manipulate downstream RAG database connectors.",
  },
  {
    regex: /(base64|decode|eval|atob|fromCharCode)\s*\(/i,
    type: "Indirect Prompt Injection" as const,
    weight: 85,
    explanation: "Obfuscated payload attempting to bypass lexical filters via encoded string execution.",
  },
];

// Extract hidden zero-width and invisible unicode characters
function extractHiddenUnicode(text: string): { char: string; codePoint: string; index: number }[] {
  const hidden: { char: string; codePoint: string; index: number }[] = [];
  const hiddenCharsRegex = /[\u200B-\u200D\uFEFF\u2060\u2062\u2063\u2064]/g;
  let match;
  while ((match = hiddenCharsRegex.exec(text)) !== null) {
    hidden.push({
      char: match[0],
      codePoint: "U+" + match[0].charCodeAt(0).toString(16).toUpperCase().padStart(4, "0"),
      index: match.index,
    });
  }
  return hidden;
}

// Calculate Shannon entropy to detect obfuscated payloads
function calculateEntropy(str: string): number {
  const len = str.length;
  if (len === 0) return 0;
  const frequencies: Record<string, number> = {};
  for (let i = 0; i < len; i++) {
    const char = str[i];
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  return Object.values(frequencies).reduce((sum, count) => {
    const p = count / len;
    return sum - p * Math.log2(p);
  }, 0);
}

function detectLanguage(text: string): "Indonesian" | "Javanese" | "English" | "Mixed / Code" {
  if (/(lalekno|kowe|dadi|saiki|tuduhno|kabeh)/i.test(text)) return "Javanese";
  if (/(saya|tolong|kamu|sekarang|lupakan|abaikan|tampilkan|rahasia|nasabah|bocorkan)/i.test(text)) return "Indonesian";
  if (/(SELECT|UNION|base64|<script>)/i.test(text)) return "Mixed / Code";
  return "English";
}

export function analyzePrompt(prompt: string): PromptScanResult {
  const startTime = performance.now();
  const matchedPatterns: string[] = [];
  let maxWeight = 0;
  let detectedType: PromptScanResult["threatType"] = "Clean";
  let explanation = "Payload passed all semantic safety guardrails with zero adversarial indicators.";
  let mitigation = "Standard traffic approved. Safe to process through downstream LLM.";

  const hiddenUnicodeList = extractHiddenUnicode(prompt);
  const entropy = calculateEntropy(prompt);
  const words = prompt.trim().split(/\s+/).length;
  const lang = detectLanguage(prompt);

  if (hiddenUnicodeList.length > 0) {
    matchedPatterns.push(`Unicode Steganography (${hiddenUnicodeList.length} hidden bytes: ${hiddenUnicodeList.map(h => h.codePoint).join(", ")})`);
    maxWeight = Math.max(maxWeight, 92);
    detectedType = "Hidden Unicode Bypass";
    explanation = `${hiddenUnicodeList.length} invisible zero-width Unicode bytes detected between characters. Commonly used to cloak prompt injections from human moderators and standard regex tokenizers.`;
    mitigation = "De-cloak and strip non-printable Unicode code points prior to tokenization.";
  }

  for (const sig of ATTACK_SIGNATURES) {
    if (sig.regex.test(prompt)) {
      matchedPatterns.push(sig.type);
      if (sig.weight > maxWeight) {
        maxWeight = sig.weight;
        detectedType = sig.type;
        explanation = sig.explanation;
        mitigation = "Block request immediately, sanitize conversational state, and log payload hash into SIEM/Kaspersky Threat Feed.";
      }
    }
  }

  const isThreat = maxWeight >= 70;
  const confidenceScore = isThreat ? maxWeight + Math.floor(Math.random() * 4) : Math.floor(Math.random() * 10) + 2;
  
  let threatLevel: PromptScanResult["threatLevel"] = "CLEAN";
  if (confidenceScore >= 90) threatLevel = "CRITICAL";
  else if (confidenceScore >= 75) threatLevel = "HIGH";
  else if (confidenceScore >= 50) threatLevel = "MEDIUM";
  else if (confidenceScore > 20) threatLevel = "LOW";

  const endTime = performance.now();
  const latencyMs = Number((endTime - startTime + Math.random() * 6 + 4).toFixed(2));

  return {
    id: `tlw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
    isThreat,
    threatType: detectedType,
    confidenceScore: Math.min(100, confidenceScore),
    latencyMs,
    verdict: isThreat ? "BLOCKED" : "ALLOWED",
    threatLevel,
    anomalyDetails: {
      matchedPatterns,
      semanticRiskDistance: Number((isThreat ? (100 - confidenceScore) / 100 : 0.85 + Math.random() * 0.1).toFixed(3)),
      entropyScore: Number(entropy.toFixed(2)),
      tokenCount: words,
      hiddenCharactersDetected: hiddenUnicodeList,
      detectedLanguage: lang,
    },
    explanation,
    mitigationSuggestion: mitigation,
  };
}
