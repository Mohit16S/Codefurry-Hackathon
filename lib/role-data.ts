import { UserRole } from "@/components/demo-provider";

export type InternalRole =
  | "AI_SECURITY_ENGINEER"
  | "ML_SECOPS_LEAD"
  | "CHIEF_AI_RISK_OFFICER"
  | "COMPLIANCE_AUDITOR";

export function toInternalRole(role: UserRole | string): InternalRole {
  if (role === "ML SecOps Lead" || role === "ML_SECOPS_LEAD") return "ML_SECOPS_LEAD";
  if (role === "Chief AI Risk Officer" || role === "CHIEF_AI_RISK_OFFICER") return "CHIEF_AI_RISK_OFFICER";
  if (role === "Compliance Auditor" || role === "COMPLIANCE_AUDITOR") return "COMPLIANCE_AUDITOR";
  return "AI_SECURITY_ENGINEER";
}

export function toDisplayRole(role: InternalRole | UserRole | string): UserRole {
  if (role === "ML_SECOPS_LEAD" || role === "ML SecOps Lead") return "ML SecOps Lead";
  if (role === "CHIEF_AI_RISK_OFFICER" || role === "Chief AI Risk Officer") return "Chief AI Risk Officer";
  if (role === "COMPLIANCE_AUDITOR" || role === "Compliance Auditor") return "Compliance Auditor";
  return "AI Security Engineer";
}

export function getRoleAccentClass(role: InternalRole | UserRole | string): string {
  const r = toInternalRole(role);
  switch (r) {
    case "AI_SECURITY_ENGINEER":
      return "role-accent-blue";
    case "ML_SECOPS_LEAD":
      return "role-accent-cyan";
    case "CHIEF_AI_RISK_OFFICER":
      return "role-accent-purple";
    case "COMPLIANCE_AUDITOR":
      return "role-accent-green";
  }
}

// 1. AI Security Engineer Data
export const securityEngineerData = {
  title: "MY SECURITY WORKSPACE",
  subtitle: "Technical model security testing, continuous probe validation, and behavioral drift forensics.",
  kpis: {
    modelsMonitored: 8,
    activeDriftEvents: 3,
    securityTestFailures: 2,
    criticalVulnerabilities: 1,
    avgTrustScore: 91,
    testsRunToday: 27,
  },
  models: [
    { id: "fraud-detection-ai", name: "Fraud Detection AI", category: "Risk & Fraud", provider: "NeuralForge Managed", trust: 88, status: "DRIFT_WARNING" },
    { id: "customer-support-ai", name: "Customer Support AI", category: "Support", provider: "Resolve Gateway", trust: 94, status: "PASSED" },
    { id: "document-classifier", name: "Document Classifier", category: "Legal", provider: "In-House PyTorch", trust: 96, status: "PASSED" },
    { id: "risk-prediction-model", name: "Risk Prediction Model", category: "Risk & Fraud", provider: "Scikit-Learn Endpoint", trust: 86, status: "VULNERABLE" },
  ],
  vulnerabilityFindings: [
    { id: "VULN-2026-01", severity: "CRITICAL", title: "Prompt Injection Bypass", target: "Fraud Detection AI", impact: "System prompt leakage under multi-turn attack" },
    { id: "VULN-2026-02", severity: "HIGH", title: "Logit Variance Anomalies", target: "Risk Prediction Model", impact: "Output distribution shifted 18.4% from baseline" },
    { id: "VULN-2026-03", severity: "MEDIUM", title: "Unicode Typo Vulnerability", target: "Document Classifier", impact: "Homoglyph attack causes classification bypass" },
  ],
  recentTests: [
    { id: "TST-8821", name: "Adversarial Jailbreak Probe", suite: "Prompt Injection Resistance", result: "FAILED", similarity: "58.3%" },
    { id: "TST-8820", name: "Demographic Bias Check", suite: "Cohort Consistency", result: "PASSED", similarity: "98.1%" },
    { id: "TST-8819", name: "Noise Robustness Evaluation", suite: "Synthetic Perturbation", result: "PASSED", similarity: "96.4%" },
  ],
  actions: [
    { id: "run-test", label: "Run Security Test", href: "/playground", primary: true },
    { id: "run-probe", label: "Run Adversarial Probe", href: "/playground" },
    { id: "investigate-drift", label: "Investigate Drift", href: "/monitoring" },
    { id: "compare-versions", label: "Compare Versions", href: "/compare" },
  ],
};

// 2. ML SecOps Lead Data
export const secOpsLeadData = {
  title: "ML SECOPS COMMAND CENTER",
  subtitle: "Real-time production AI security operations, incident containment, and endpoint health.",
  kpis: {
    productionModels: 24,
    activeIncidents: 4,
    criticalAlerts: 2,
    modelsAtRisk: 5,
    deploymentChanges: 7,
    mttr: "18m",
  },
  liveIncidentFeed: [
    { time: "10:42", level: "CRITICAL", title: "Possible Model Swap", target: "Fraud Detection AI", detail: "HTTP response signatures match lightweight model v0.8" },
    { time: "10:37", level: "INFO", title: "Production Deployment", target: "Customer Support AI v4.2", detail: "Traffic routed to certified baseline snapshot" },
    { time: "10:29", level: "WARNING", title: "Safety Score Degradation", target: "Document Intelligence", detail: "Refusal policy compliance dropped to 78.0%" },
    { time: "10:14", level: "CRITICAL", title: "Endpoint P95 Latency Spike", target: "Risk Prediction Model", detail: "Latency elevated to 245ms (+162ms)" },
  ],
  productionHealth: [
    { model: "Fraud Detection AI", endpoint: "api.neuralforge.ai/v3/eval", status: "CONTAINED", qps: "1,240", errorRate: "0.02%" },
    { model: "Customer Support AI", endpoint: "api.resolve.ai/v1/chat", status: "HEALTHY", qps: "3,890", errorRate: "0.00%" },
    { model: "Document Intelligence", endpoint: "api.internal.ocr/v2/parse", status: "DEGRADED", qps: "850", errorRate: "1.42%" },
    { model: "Risk Prediction Model", endpoint: "api.risk.internal/predict", status: "HEALTHY", qps: "620", errorRate: "0.01%" },
  ],
  deployments: [
    { version: "v3.2.4", model: "Customer Support AI", status: "LIVE", deployedAt: "Today, 10:37", verified: true },
    { version: "v2.1.0", model: "Fraud Detection AI", status: "ROLLED_BACK", deployedAt: "Today, 09:15", verified: false },
    { version: "v1.8.2", model: "Document Intelligence", status: "STAGING", deployedAt: "Yesterday", verified: true },
  ],
  actions: [
    { id: "ack", label: "Acknowledge Alert" },
    { id: "investigate", label: "Investigate Endpoint", href: "/monitoring" },
    { id: "contain", label: "Contain Incident", primary: true },
    { id: "resolve", label: "Resolve Incident" },
  ],
};

// 3. Chief AI Risk Officer Data
export const riskOfficerData = {
  title: "AI RISK COMMAND CENTER",
  subtitle: "Executive AI governance overview, organizational trust index, and enterprise risk exposure.",
  heroTrust: {
    score: 94,
    max: 100,
    status: "TRUSTED",
    description: "Calculated across 12,480 continuous independent behavioral probes.",
  },
  kpis: {
    totalAIModels: 24,
    highRiskModels: 4,
    criticalRisks: 1,
    complianceExposure: "8%",
    riskTrend: "↓ 12%",
  },
  executiveSummary:
    "Overall AI risk decreased 12% this month. Four models require additional review. One critical production incident remains under investigation. Financial loss exposure has been contained within safe operational boundaries.",
  topAIRisks: [
    { model: "Fraud Detection AI", category: "Risk & Fraud", riskLevel: "HIGH", businessImpact: "Critical", probability: "Medium", lossExposure: "$240,000" },
    { model: "Customer Support AI", category: "Support", riskLevel: "MEDIUM", businessImpact: "High", probability: "Low", lossExposure: "$45,000" },
    { model: "Document Classifier", category: "Legal", riskLevel: "LOW", businessImpact: "Moderate", probability: "Low", lossExposure: "$12,000" },
    { model: "Risk Prediction Model", category: "Risk & Fraud", riskLevel: "HIGH", businessImpact: "Critical", probability: "High", lossExposure: "$380,000" },
  ],
  riskHeatmap: [
    { dimension: "Model Swap Risk", score: "88/100", status: "SAFE" },
    { dimension: "Hallucination & Refusal", score: "92/100", status: "SAFE" },
    { dimension: "Demographic Bias", score: "94/100", status: "SAFE" },
    { dimension: "Data Privacy Exposure", score: "76/100", status: "WARNING" },
  ],
  actions: [
    { id: "review-risk", label: "Review Risk Profile", href: "/governance", primary: true },
    { id: "approve-exception", label: "Approve Exception" },
    { id: "view-high-risk", label: "View High-Risk Models", href: "/models" },
    { id: "generate-exec-report", label: "Generate Executive Report" },
  ],
};

// 4. Compliance Auditor Data
export const complianceAuditorData = {
  title: "AI COMPLIANCE & AUDIT CENTER",
  subtitle: "EU AI Act & NIST AI RMF audit readiness, evidence completeness, and control verification.",
  kpis: {
    modelsUnderAudit: 18,
    complianceRate: "94%",
    openFindings: 6,
    evidenceCompleteness: "91%",
    controlsPassed: "47/52",
    pendingReviews: 5,
  },
  controlChecklist: [
    { name: "Model Certification", framework: "EU AI Act Art 14", status: "PASS", detail: "Certified signature fp_7a91c4e8b32f" },
    { name: "Behavioral Baseline", framework: "NIST AI RMF 2.1", status: "PASS", detail: "98.7% empirical baseline similarity" },
    { name: "Version Tracking", framework: "ISO/IEC 42001", status: "PASS", detail: "SHA-256 immutable audit trail" },
    { name: "Security Testing", framework: "OWASP LLM Top 10", status: "PASS", detail: "Continuous automated probe suite" },
    { name: "Evidence Hash Verification", framework: "Enterprise Policy", status: "PASS", detail: "Cryptographic payload signed" },
    { name: "Reviewer Metadata Audit Trail", framework: "SOC 2 Type II", status: "WARNING", detail: "Missing reviewer digital signature" },
  ],
  auditFindings: [
    { id: "FIND-101", severity: "HIGH", title: "Missing model certification evidence", target: "Risk Prediction Model", age: "2 days ago" },
    { id: "FIND-102", severity: "MEDIUM", title: "Incomplete version history metadata", target: "Document Intelligence", age: "5 days ago" },
    { id: "FIND-103", severity: "LOW", title: "Missing reviewer metadata tags", target: "Customer Support AI", age: "1 week ago" },
  ],
  actions: [
    { id: "start-audit", label: "Start Audit Review", primary: true },
    { id: "review-evidence", label: "Review Evidence Vault" },
    { id: "verify-control", label: "Verify Control" },
    { id: "create-finding", label: "Create Audit Finding" },
    { id: "generate-report", label: "Generate Audit Report" },
  ],
};

export function getRoleDashboardData(role: UserRole | string) {
  const internalRole = toInternalRole(role);
  switch (internalRole) {
    case "AI_SECURITY_ENGINEER":
      return { role: internalRole, ...securityEngineerData };
    case "ML_SECOPS_LEAD":
      return { role: internalRole, ...secOpsLeadData };
    case "CHIEF_AI_RISK_OFFICER":
      return { role: internalRole, ...riskOfficerData };
    case "COMPLIANCE_AUDITOR":
      return { role: internalRole, ...complianceAuditorData };
  }
}
