"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemo, UserRole } from "@/components/demo-provider";
import SecurityEngineerDashboard from "../security/dashboard/page";
import SecOpsDashboard from "../secops/dashboard/page";
import RiskOfficerDashboard from "../risk/dashboard/page";
import ComplianceAuditorDashboard from "../compliance/dashboard/page";

export default function DashboardRouterPage() {
  const { user } = useDemo();
  const router = useRouter();

  // Optionally keep URL synced or render role-specific dashboard directly
  useEffect(() => {
    switch (user.role) {
      case "AI Security Engineer":
        router.replace("/security/dashboard");
        break;
      case "ML SecOps Lead":
        router.replace("/secops/dashboard");
        break;
      case "Chief AI Risk Officer":
        router.replace("/risk/dashboard");
        break;
      case "Compliance Auditor":
        router.replace("/compliance/dashboard");
        break;
      default:
        router.replace("/security/dashboard");
        break;
    }
  }, [user.role, router]);

  // Render direct fallback matching role
  switch (user.role) {
    case "AI Security Engineer":
      return <SecurityEngineerDashboard />;
    case "ML SecOps Lead":
      return <SecOpsDashboard />;
    case "Chief AI Risk Officer":
      return <RiskOfficerDashboard />;
    case "Compliance Auditor":
      return <ComplianceAuditorDashboard />;
    default:
      return <SecurityEngineerDashboard />;
  }
}
