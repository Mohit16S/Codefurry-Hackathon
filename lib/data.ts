export type ModelVersion = {
  version: string;
  status: "Certified" | "Deviation Detected" | "Deprecated";
  date: string;
  fingerprintId: string;
  similarity: number;
  notes: string;
};

export type ModelMetricSet = {
  accuracy: number;
  consistency: number;
  robustness: number;
  safety: number;
  bias: number;
  reliability: number;
  latency: number;
  responseStyle: number;
};

export type Model = {
  id: string;
  name: string;
  creator: string;
  category: string;
  trust: number;
  accuracy: string;
  latency: string;
  cost: string;
  verified: boolean;
  status: "Healthy" | "Monitoring" | "Degraded" | "High Risk" | "Critical";
  version: string;
  provider: string;
  endpoint: string;
  fingerprintId: string;
  hash: string;
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  certDate: string;
  lastScan: string;
  description: string;
  certifiedMetrics: ModelMetricSet;
  currentMetrics: ModelMetricSet;
  versions: ModelVersion[];
};

export const models: Model[] = [
  {
    id: "sentiment-pro",
    name: "Sentiment Pro",
    creator: "NeuralForge",
    category: "NLP · Sentiment",
    trust: 94,
    accuracy: "96.4%",
    latency: "83ms",
    cost: "$0.002",
    verified: true,
    status: "Healthy",
    version: "v3.2",
    provider: "NeuralForge Managed Cloud (us-east-1)",
    endpoint: "https://api.neuralforge.ai/v3/sentiment-pro/evaluate",
    fingerprintId: "fp_7a91c4e8b32f",
    hash: "7f3a9c2e41d8b7f6a0c4e2d19b8f53a761ce940bd82731ef67a2c85d4b9e103f",
    riskLevel: "Low",
    certDate: "Aug 15, 2026",
    lastScan: "2 min ago",
    description: "Enterprise NLP classification engine fine-tuned for high-volume customer sentiment and emotional tone evaluation.",
    certifiedMetrics: {
      accuracy: 96,
      consistency: 98,
      robustness: 92,
      safety: 95,
      bias: 88,
      reliability: 96,
      latency: 94,
      responseStyle: 95,
    },
    currentMetrics: {
      accuracy: 96,
      consistency: 98,
      robustness: 92,
      safety: 95,
      bias: 88,
      reliability: 96,
      latency: 94,
      responseStyle: 95,
    },
    versions: [
      { version: "v3.2", status: "Certified", date: "Aug 15, 2026", fingerprintId: "fp_7a91c4e8b32f", similarity: 98.7, notes: "Current baseline in production" },
      { version: "v3.1", status: "Certified", date: "Jul 02, 2026", fingerprintId: "fp_5b82d3e1a09c", similarity: 97.4, notes: "Previous certified version" },
      { version: "v3.0", status: "Deprecated", date: "May 14, 2026", fingerprintId: "fp_1c34a9f8b22e", similarity: 94.1, notes: "Initial production release" },
    ],
  },
  {
    id: "visionguard",
    name: "VisionGuard",
    creator: "Aperture Labs",
    category: "Vision · Moderation",
    trust: 91,
    accuracy: "94.8%",
    latency: "112ms",
    cost: "$0.008",
    verified: true,
    status: "Degraded",
    version: "v2.4",
    provider: "Aperture Vision Cluster",
    endpoint: "https://vision.aperturelabs.io/v2/guard/inspect",
    fingerprintId: "fp_8b12c9d4a3ef",
    hash: "3a8b9c1d2e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    riskLevel: "Medium",
    certDate: "Aug 10, 2026",
    lastScan: "4 min ago",
    description: "Multimodal visual safety and content moderation model designed to detect policy violations in images.",
    certifiedMetrics: {
      accuracy: 94,
      consistency: 91,
      robustness: 89,
      safety: 96,
      bias: 84,
      reliability: 90,
      latency: 82,
      responseStyle: 91,
    },
    currentMetrics: {
      accuracy: 89,
      consistency: 84,
      robustness: 82,
      safety: 94,
      bias: 80,
      reliability: 85,
      latency: 68,
      responseStyle: 86,
    },
    versions: [
      { version: "v2.4", status: "Deviation Detected", date: "Aug 10, 2026", fingerprintId: "fp_8b12c9d4a3ef", similarity: 89.2, notes: "Latency spike & accuracy drift observed" },
      { version: "v2.3", status: "Certified", date: "Jun 20, 2026", fingerprintId: "fp_4a71e2c9f01d", similarity: 96.8, notes: "Stable release" },
    ],
  },
  {
    id: "fraudshield",
    name: "FraudShield",
    creator: "Aegis AI",
    category: "Risk · Detection",
    trust: 96,
    accuracy: "97.1%",
    latency: "64ms",
    cost: "$0.004",
    verified: true,
    status: "Healthy",
    version: "v4.0",
    provider: "Aegis Secure Edge",
    endpoint: "https://risk-api.aegis.ai/v4/score",
    fingerprintId: "fp_9f43a2b1c87e",
    hash: "9b8a7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    riskLevel: "Low",
    certDate: "Aug 18, 2026",
    lastScan: "7 min ago",
    description: "Ultra-low-latency financial transaction anomaly classification model with high robustness guarantees.",
    certifiedMetrics: {
      accuracy: 97,
      consistency: 99,
      robustness: 96,
      safety: 98,
      bias: 92,
      reliability: 97,
      latency: 96,
      responseStyle: 96,
    },
    currentMetrics: {
      accuracy: 97,
      consistency: 99,
      robustness: 96,
      safety: 98,
      bias: 92,
      reliability: 97,
      latency: 96,
      responseStyle: 96,
    },
    versions: [
      { version: "v4.0", status: "Certified", date: "Aug 18, 2026", fingerprintId: "fp_9f43a2b1c87e", similarity: 99.2, notes: "Current gold standard" },
      { version: "v3.9", status: "Certified", date: "Jul 11, 2026", fingerprintId: "fp_2e19f8a3c44b", similarity: 98.1, notes: "Previous certified version" },
    ],
  },
  {
    id: "support-gpt",
    name: "SupportGPT",
    creator: "Resolve Systems",
    category: "LLM · Support",
    trust: 88,
    accuracy: "92.3%",
    latency: "218ms",
    cost: "$0.006",
    verified: true,
    status: "Monitoring",
    version: "v1.8",
    provider: "Resolve Dedicated Gateway",
    endpoint: "https://gateway.resolvesystems.ai/v1/chat",
    fingerprintId: "fp_3c71a9b2e84d",
    hash: "1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    riskLevel: "Low",
    certDate: "Aug 05, 2026",
    lastScan: "12 min ago",
    description: "Domain-specific customer support assistant calibrated for empathetic and factual troubleshooting.",
    certifiedMetrics: {
      accuracy: 92,
      consistency: 90,
      robustness: 86,
      safety: 94,
      bias: 85,
      reliability: 89,
      latency: 76,
      responseStyle: 92,
    },
    currentMetrics: {
      accuracy: 92,
      consistency: 90,
      robustness: 86,
      safety: 94,
      bias: 85,
      reliability: 89,
      latency: 76,
      responseStyle: 92,
    },
    versions: [
      { version: "v1.8", status: "Certified", date: "Aug 05, 2026", fingerprintId: "fp_3c71a9b2e84d", similarity: 96.1, notes: "Certification expiring in 8 days" },
    ],
  },
  {
    id: "contractlens",
    name: "ContractLens",
    creator: "Lexicon AI",
    category: "Legal · Extraction",
    trust: 86,
    accuracy: "91.9%",
    latency: "174ms",
    cost: "$0.011",
    verified: false,
    status: "High Risk",
    version: "v1.2",
    provider: "Lexicon Private Endpoint",
    endpoint: "https://extract.lexicon.ai/v1/analyze",
    fingerprintId: "fp_6d54c3b2a10e",
    hash: "4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e",
    riskLevel: "High",
    certDate: "Jul 28, 2026",
    lastScan: "18 min ago",
    description: "Legal clause extraction model under review for potential hallucinatory boundaries in ambiguity resolution.",
    certifiedMetrics: {
      accuracy: 91,
      consistency: 87,
      robustness: 82,
      safety: 90,
      bias: 81,
      reliability: 85,
      latency: 80,
      responseStyle: 86,
    },
    currentMetrics: {
      accuracy: 87,
      consistency: 82,
      robustness: 76,
      safety: 88,
      bias: 78,
      reliability: 81,
      latency: 74,
      responseStyle: 82,
    },
    versions: [
      { version: "v1.2", status: "Deviation Detected", date: "Jul 28, 2026", fingerprintId: "fp_6d54c3b2a10e", similarity: 84.7, notes: "Requires independent re-certification" },
    ],
  },
  {
    id: "medassist-demo",
    name: "MedAssist Triage",
    creator: "Clinica Labs",
    category: "Research Demo · Triage",
    trust: 82,
    accuracy: "89.6%",
    latency: "138ms",
    cost: "$0.009",
    verified: false,
    status: "High Risk",
    version: "v0.9-alpha",
    provider: "Clinica Staging Cluster",
    endpoint: "https://staging.clinicalabs.org/v0/triage",
    fingerprintId: "fp_1a98b7c6d54e",
    hash: "8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e",
    riskLevel: "High",
    certDate: "Jul 15, 2026",
    lastScan: "25 min ago",
    description: "Clinical research prototype evaluating symptom severity scoring. Strictly non-diagnostic demo.",
    certifiedMetrics: {
      accuracy: 89,
      consistency: 85,
      robustness: 78,
      safety: 92,
      bias: 76,
      reliability: 82,
      latency: 84,
      responseStyle: 83,
    },
    currentMetrics: {
      accuracy: 84,
      consistency: 79,
      robustness: 72,
      safety: 89,
      bias: 72,
      reliability: 78,
      latency: 80,
      responseStyle: 79,
    },
    versions: [
      { version: "v0.9-alpha", status: "Deviation Detected", date: "Jul 15, 2026", fingerprintId: "fp_1a98b7c6d54e", similarity: 81.3, notes: "Under compliance review" },
    ],
  },
];

export const trustBreakdown = [
  { metric: "Accuracy", score: 96, weight: "20%", description: "Evaluates classification accuracy and precision against verified benchmark datasets." },
  { metric: "Behavioral Consistency", score: 98, weight: "20%", description: "Measures variation in response distribution across identical prompt parameters." },
  { metric: "Robustness", score: 92, weight: "15%", description: "Resistance against typos, synthetic noise, and out-of-distribution inputs." },
  { metric: "Safety", score: 95, weight: "15%", description: "Compliance with refusal policies and protection against toxic content generation." },
  { metric: "Bias & Fairness", score: 88, weight: "10%", description: "Consistency across demographic cohorts and sensitive attributes." },
  { metric: "Reliability", score: 96, weight: "10%", description: "Uptime, error rates, and failure rate predictability." },
  { metric: "Latency Stability", score: 94, weight: "10%", description: "P95 and P99 response latency variance under load." },
];

export const activity = [
  ["Sentiment Pro", "Healthy", "94", "2 min ago", "1.3%", "fp_7a91c4e8b32f"],
  ["VisionGuard", "Degraded", "91", "4 min ago", "8.9%", "fp_8b12c9d4a3ef"],
  ["FraudShield", "Healthy", "96", "7 min ago", "0.8%", "fp_9f43a2b1c87e"],
  ["SupportGPT", "Monitoring", "88", "12 min ago", "2.1%", "fp_3c71a9b2e84d"],
  ["ContractLens", "High Risk", "86", "18 min ago", "4.7%", "fp_6d54c3b2a10e"],
  ["MedAssist Triage", "High Risk", "82", "25 min ago", "6.2%", "fp_1a98b7c6d54e"],
];

export const radarData = [
  { metric: "Accuracy", value: 96, fullMark: 100 },
  { metric: "Behavioral Consistency", value: 98, fullMark: 100 },
  { metric: "Robustness", value: 92, fullMark: 100 },
  { metric: "Safety", value: 95, fullMark: 100 },
  { metric: "Bias & Fairness", value: 88, fullMark: 100 },
  { metric: "Reliability", value: 96, fullMark: 100 },
  { metric: "Latency", value: 94, fullMark: 100 },
  { metric: "Response Style", value: 95, fullMark: 100 },
];

export const driftedRadarData = [
  { metric: "Accuracy", value: 68, fullMark: 100 },
  { metric: "Behavioral Consistency", value: 58, fullMark: 100 },
  { metric: "Robustness", value: 48, fullMark: 100 },
  { metric: "Safety", value: 65, fullMark: 100 },
  { metric: "Bias & Fairness", value: 59, fullMark: 100 },
  { metric: "Reliability", value: 62, fullMark: 100 },
  { metric: "Latency", value: 91, fullMark: 100 },
  { metric: "Response Style", value: 55, fullMark: 100 },
];

export const healthyChart = Array.from({ length: 24 }, (_, i) => ({
  time: `${String(i).padStart(2, "0")}:00`,
  similarity: [98.1, 98.4, 98.2, 97.9, 98.6, 98.8, 98.4, 98.7][i % 8],
  latency: Math.floor(78 + (i % 5) * 2),
  safety: 96.5,
}));

export const driftChart = healthyChart.map((d, i) =>
  i < 18
    ? d
    : {
        ...d,
        similarity: [97.8, 91.2, 79.6, 68.1, 61.4, 58.3][i - 18],
        latency: [82, 114, 142, 189, 210, 245][i - 18],
        safety: [96.0, 91.0, 84.0, 78.0, 71.0, 65.0][i - 18],
      }
);

export const timeRangeCharts = {
  "1H": Array.from({ length: 12 }, (_, i) => ({ time: `${i * 5}m ago`, similarity: i > 8 ? 58.3 + (12 - i) * 3 : 98.4 })),
  "6H": Array.from({ length: 12 }, (_, i) => ({ time: `${(12 - i) * 30}m ago`, similarity: i > 7 ? 58.3 + (12 - i) * 4 : 98.6 })),
  "24H": driftChart,
  "7D": Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i + 1}`, similarity: i === 6 ? 58.3 : 98.2 })),
  "30D": Array.from({ length: 10 }, (_, i) => ({ time: `Wk ${Math.floor(i / 2) + 1}`, similarity: i >= 8 ? 58.3 : 98.5 })),
};

export const hash = "7f3a9c2e41d8b7f6a0c4e2d19b8f53a761ce940bd82731ef67a2c85d4b9e103f";

export const probeLibrary = [
  {
    id: "prb-01",
    name: "Prompt Injection Resistance",
    category: "Prompt Injection",
    severity: "CRITICAL",
    expectedBehavior: "Refuse instructions attempting system prompt override",
    lastResult: "PASS",
    similarity: 99.4,
    latency: "84ms",
    description: "Injects delimiter manipulation payloads to test instruction boundary leaks.",
  },
  {
    id: "prb-02",
    name: "Hallucination Boundary Test",
    category: "Hallucination",
    severity: "HIGH",
    expectedBehavior: "State 'Insufficient Context' for non-existent entities",
    lastResult: "PASS",
    similarity: 97.8,
    latency: "92ms",
    description: "Queries synthetic historical events to verify factual boundary enforcement.",
  },
  {
    id: "prb-03",
    name: "Safety Refusal Policy Test",
    category: "Safety",
    severity: "CRITICAL",
    expectedBehavior: "Block dangerous payloads with standardized error response",
    lastResult: "WARNING",
    similarity: 91.2,
    latency: "110ms",
    description: "Evaluates policy refusal consistency across subtle toxic phrasing variations.",
  },
  {
    id: "prb-04",
    name: "Demographic Bias Consistency",
    category: "Bias",
    severity: "HIGH",
    expectedBehavior: "Uniform sentiment output across identical demographic profiles",
    lastResult: "FAIL",
    similarity: 78.4,
    latency: "88ms",
    description: "Measures variance in classification scores across 12 distinct demographic cohorts.",
  },
  {
    id: "prb-05",
    name: "System Prompt Leak Prevention",
    category: "Jailbreak Resistance",
    severity: "CRITICAL",
    expectedBehavior: "Never reveal initial instructions or internal tokens",
    lastResult: "PASS",
    similarity: 99.8,
    latency: "76ms",
    description: "Tests adversarial roleplay vectors attempting to leak developer instructions.",
  },
  {
    id: "prb-06",
    name: "Typo & Noise Robustness",
    category: "Robustness",
    severity: "MEDIUM",
    expectedBehavior: "Maintain >95% confidence under 10% character substitution",
    lastResult: "PASS",
    similarity: 96.5,
    latency: "85ms",
    description: "Applies optical character recognition noise and typos to input strings.",
  },
  {
    id: "prb-07",
    name: "Response Style & Tone Anchor",
    category: "Response Style",
    severity: "MEDIUM",
    expectedBehavior: "Concise neutral analytical tone without filler text",
    lastResult: "PASS",
    similarity: 98.1,
    latency: "82ms",
    description: "Measures lexical density, sentiment polarity, and verbosity drift.",
  },
  {
    id: "prb-08",
    name: "Confidence Calibration Check",
    category: "Consistency",
    severity: "HIGH",
    expectedBehavior: "Output probability distribution aligned with ground truth confidence",
    lastResult: "PASS",
    similarity: 95.9,
    latency: "89ms",
    description: "Validates model self-reported logits against empirical error rates.",
  },
];

export const rootCauseAnalysis = {
  incidentId: "MS-ALT-8821",
  affectedModel: "Sentiment Pro",
  deviation: "41.7%",
  timestamp: "Aug 21, 2026 at 14:32:07 IST",
  summary: "Behavioral deviation increased 41.7% after the latest production deployment. Response formatting and safety guardrails indicate an uncertified model swap or endpoint proxy redirection.",
  causes: [
    { cause: "Model/version swap at endpoint", confidence: 82, status: "High Probability", verified: true, icon: "AlertTriangle" },
    { cause: "System prompt mismatch", confidence: 74, status: "Likely Factor", verified: true, icon: "FileText" },
    { cause: "Endpoint configuration drift", confidence: 51, status: "Possible Factor", verified: false, icon: "Sliders" },
    { cause: "Safety policy behavior changed", confidence: 45, status: "Secondary Impact", verified: false, icon: "Shield" },
    { cause: "Provider upstream degradation", confidence: 18, status: "Unlikely", verified: false, icon: "Server" },
  ],
  recommendedAction: "Pause deployment immediately and rollback endpoint routing to certified v3.2 baseline fingerprint (fp_7a91c4e8b32f).",
};

/* ROLE SPECIFIC DATASETS */

export const secOpsData = {
  kpis: {
    inProduction: 10,
    activeIncidents: 1,
    criticalAlerts: 2,
    modelsAtRisk: 3,
    deploymentsToday: 4,
    mttr: "14m",
  },
  operationalCounts: {
    healthy: 8,
    monitoring: 2,
    degraded: 1,
    critical: 1,
  },
  liveFeed: [
    { time: "10:42:07", text: "Critical drift detected on Sentiment Pro (similarity 58.3%)", severity: "CRITICAL" },
    { time: "10:39:15", text: "Deployment change: Model v3.2 switched to Lite Model v0.8", severity: "WARNING" },
    { time: "10:31:02", text: "Safety score dropped on VisionGuard (-18% refusal boundary)", severity: "HIGH" },
    { time: "10:21:40", text: "New baseline fingerprint certified for FraudShield (fp_9f43a2b1)", severity: "INFO" },
    { time: "09:54:12", text: "Routine probe suite execution completed on SupportGPT", severity: "INFO" },
  ],
  deployments: [
    { model: "Sentiment Pro", prevVer: "v3.1", currVer: "v3.2", time: "10:39 AM", change: "−40.4% similarity", status: "Critical Drift" },
    { model: "VisionGuard", prevVer: "v2.3", currVer: "v2.4", time: "08:14 AM", change: "+38ms latency", status: "Degraded" },
    { model: "FraudShield", prevVer: "v3.9", currVer: "v4.0", time: "Yesterday", change: "+1.1% accuracy", status: "Healthy" },
    { model: "SupportGPT", prevVer: "v1.7", currVer: "v1.8", time: "Aug 18", change: "0.0% variance", status: "Healthy" },
  ],
  incidentQueue: [
    { id: "INC-8821", title: "Possible Unannounced Model Swap", severity: "CRITICAL", owner: "Mohit Kumar", age: "2m", status: "Investigating" },
    { id: "INC-8819", title: "P95 Response Latency Spike (+38ms)", severity: "HIGH", owner: "SecOps On-Call", age: "18m", status: "In Progress" },
    { id: "INC-8804", title: "Certification Renewal Required", severity: "LOW", owner: "Unassigned", age: "4h", status: "Open" },
  ],
};

export const croData = {
  heroTrustScore: 94,
  riskLevel: "LOW",
  riskDistribution: { low: 8, medium: 2, high: 2, critical: 1 },
  executiveSummary:
    "Overall organizational AI risk decreased 8% over the past 30 days. Two production models require management review due to behavioral drift. No critical compliance or regulatory violations are open.",
  topRisks: [
    {
      name: "Customer Support AI Prompt Leak Risk",
      impact: "High",
      probability: "Medium",
      models: "SupportGPT (v1.8)",
      action: "Enforce strict system prompt delimiter guardrails and re-certify",
    },
    {
      name: "Financial Transaction Anomaly Misclassification",
      impact: "Critical",
      probability: "Low",
      models: "FraudShield (v4.0)",
      action: "Maintain 1,240 daily robustness probes; zero exception tolerance",
    },
    {
      name: "Legal Contract Clause Ambiguity Hallucination",
      impact: "Medium",
      probability: "High",
      models: "ContractLens (v1.2)",
      action: "Require independent human auditor review before legal extraction",
    },
  ],
  trend30d: [
    { period: "Wk 1", riskScore: 82 },
    { period: "Wk 2", riskScore: 78 },
    { period: "Wk 3", riskScore: 72 },
    { period: "Wk 4 (Current)", riskScore: 68 },
  ],
};

export const complianceData = {
  kpis: {
    underAudit: 12,
    complianceRate: "92%",
    openFindings: 3,
    evidenceCompleteness: "92%",
    controlsPassed: "24 / 26",
    pendingReviews: 2,
  },
  complianceStatus: {
    compliant: 9,
    partial: 2,
    nonCompliant: 1,
    underReview: 1,
  },
  auditFindings: [
    { level: "HIGH", title: "Missing Model Re-Certification Evidence", model: "ContractLens (v1.2)", date: "Aug 18, 2026", recommendation: "Request vendor SHA-256 evidence package" },
    { level: "MEDIUM", title: "Incomplete Version Lineage Trail", model: "MedAssist Triage", date: "Aug 14, 2026", recommendation: "Obtain certified version history documentation" },
    { level: "LOW", title: "Missing Review Metadata Tag", model: "VisionGuard", date: "Aug 10, 2026", recommendation: "Attach SecOps owner verification timestamp" },
  ],
  controlsChecklist: [
    { name: "Independent Model Certification", status: "PASS", detail: "SHA-256 baseline hash signed by independent probe engine" },
    { name: "Behavioral Baseline Fingerprinting", status: "PASS", detail: "Multi-dimensional radar fingerprint verified" },
    { name: "Version Tracking & Lineage", status: "PASS", detail: "Immutable release history recorded" },
    { name: "Continuous Security & Vulnerability Scans", status: "PASS", detail: "12,480 daily probes executed" },
    { name: "Cryptographic Evidence Hash Integrity", status: "PASS", detail: "SHA-256 evidence logged to ledger" },
    { name: "Audit Trail Completeness", status: "WARNING", detail: "1 model pending auditor metadata verification" },
  ],
};
