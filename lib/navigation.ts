import {
  Activity,
  Bell,
  Boxes,
  FlaskConical,
  GitCompareArrows,
  LayoutDashboard,
  LockKeyhole,
  Settings,
  ShieldAlert,
  Radio,
  FileCheck2,
  PieChart,
  FileText,
  Sliders,
  ShieldCheck,
} from "lucide-react";
import type { UserRole } from "@/components/demo-provider";
import { toInternalRole } from "./role-data";

export const dashboardRouteForRole = (role: UserRole | string) => {
  const internalRole = toInternalRole(role);
  if (internalRole === "ML_SECOPS_LEAD") return "/secops/dashboard";
  if (internalRole === "CHIEF_AI_RISK_OFFICER") return "/risk/dashboard";
  if (internalRole === "COMPLIANCE_AUDITOR") return "/compliance/dashboard";
  return "/security/dashboard";
};

export const appNavigation = (role: UserRole | string) => {
  const internalRole = toInternalRole(role);

  switch (internalRole) {
    case "AI_SECURITY_ENGINEER":
      return [
        { label: "Dashboard", href: "/security/dashboard", icon: LayoutDashboard, keywords: "my security workspace technical" },
        { label: "Models", href: "/models", icon: Boxes, keywords: "registry models baseline" },
        { label: "Security Testing", href: "/playground", icon: FlaskConical, keywords: "probe suite jailbreak injection" },
        { label: "Drift Sentinel", href: "/monitoring", icon: Activity, keywords: "monitoring similarity model swap" },
        { label: "Vulnerabilities", href: "/alerts", icon: ShieldAlert, keywords: "threats vulnerabilities findings" },
        { label: "Compare", href: "/compare", icon: GitCompareArrows, keywords: "model comparison" },
        { label: "Evidence", href: "/audit", icon: FileCheck2, keywords: "evidence proof hashes" },
        { label: "Settings", href: "/settings", icon: Settings, keywords: "preferences settings" },
      ] as const;

    case "ML_SECOPS_LEAD":
      return [
        { label: "Command Center", href: "/secops/dashboard", icon: Radio, keywords: "secops command center production" },
        { label: "Production Monitoring", href: "/monitoring", icon: Activity, keywords: "production health traffic" },
        { label: "Models", href: "/models", icon: Boxes, keywords: "models endpoints" },
        { label: "Incidents & Alerts", href: "/alerts", icon: Bell, keywords: "incidents alerts queue" },
        { label: "Deployments", href: "/governance", icon: LockKeyhole, keywords: "deployments rollback" },
        { label: "Evidence & Logs", href: "/audit", icon: FileCheck2, keywords: "audit logs evidence" },
        { label: "Settings", href: "/settings", icon: Settings, keywords: "settings" },
      ] as const;

    case "CHIEF_AI_RISK_OFFICER":
      return [
        { label: "Executive Dashboard", href: "/risk/dashboard", icon: PieChart, keywords: "risk command center trust score" },
        { label: "Model Portfolio", href: "/models", icon: Boxes, keywords: "portfolio high risk models" },
        { label: "Governance & Policies", href: "/governance", icon: LockKeyhole, keywords: "governance risk approvals" },
        { label: "Compliance Status", href: "/compliance/dashboard", icon: ShieldCheck, keywords: "compliance framework" },
        { label: "Incidents & Exposure", href: "/alerts", icon: Bell, keywords: "financial impact risk" },
        { label: "Executive Reports", href: "/audit", icon: FileText, keywords: "executive reports audit" },
        { label: "Settings", href: "/settings", icon: Settings, keywords: "settings" },
      ] as const;

    case "COMPLIANCE_AUDITOR":
      return [
        { label: "Audit Dashboard", href: "/compliance/dashboard", icon: ShieldCheck, keywords: "compliance audit center" },
        { label: "Models Under Audit", href: "/models", icon: Boxes, keywords: "models under audit" },
        { label: "Control Checklist", href: "/compliance/dashboard", icon: FileText, keywords: "controls NIST EU AI Act" },
        { label: "Evidence Vault", href: "/audit", icon: FileCheck2, keywords: "evidence cryptographic hashes" },
        { label: "Audit Findings", href: "/alerts", icon: Bell, keywords: "findings non-compliance" },
        { label: "Settings", href: "/settings", icon: Settings, keywords: "settings" },
      ] as const;
  }
};

export const isNavigationActive = (pathname: string, href: string) => {
  if (href.endsWith("/dashboard")) return pathname === href || pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
};
