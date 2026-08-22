"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDemo } from "@/components/demo-provider";
import { toInternalRole } from "@/lib/role-data";
import SecurityEngineerDashboard from "../security/dashboard/page";
import SecOpsDashboard from "../secops/dashboard/page";
import RiskOfficerDashboard from "../risk/dashboard/page";
import ComplianceAuditorDashboard from "../compliance/dashboard/page";

export default function DashboardRouterPage() {
  const { user } = useDemo();
  const router = useRouter();
  const internalRole = user.roleId || toInternalRole(user.role);

  useEffect(() => {
    switch (internalRole) {
      case "AI_SECURITY_ENGINEER":
        router.replace("/security/dashboard");
        break;
      case "ML_SECOPS_LEAD":
        router.replace("/secops/dashboard");
        break;
      case "CHIEF_AI_RISK_OFFICER":
        router.replace("/risk/dashboard");
        break;
      case "COMPLIANCE_AUDITOR":
        router.replace("/compliance/dashboard");
        break;
      default:
        router.replace("/security/dashboard");
        break;
    }
  }, [internalRole, router]);

  switch (internalRole) {
    case "AI_SECURITY_ENGINEER":
      return <SecurityEngineerDashboard />;
    case "ML_SECOPS_LEAD":
      return <SecOpsDashboard />;
    case "CHIEF_AI_RISK_OFFICER":
      return <RiskOfficerDashboard />;
    case "COMPLIANCE_AUDITOR":
      return <ComplianceAuditorDashboard />;
    default:
      return <SecurityEngineerDashboard />;
  }
}
