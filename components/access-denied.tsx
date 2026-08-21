"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, RefreshCw, Lock } from "lucide-react";
import { useDemo, UserRole } from "./demo-provider";

export function AccessDenied({
  requiredRole,
  actionName,
}: {
  requiredRole?: UserRole;
  actionName?: string;
}) {
  const { user, switchRole } = useDemo();

  const getDashboardRoute = (role: UserRole) => {
    switch (role) {
      case "AI Security Engineer":
        return "/security/dashboard";
      case "ML SecOps Lead":
        return "/secops/dashboard";
      case "Chief AI Risk Officer":
        return "/risk/dashboard";
      case "Compliance Auditor":
        return "/compliance/dashboard";
      default:
        return "/security/dashboard";
    }
  };

  return (
    <div className="access-denied-container">
      <div className="access-denied-card">
        <div className="access-denied-icon">
          <ShieldAlert size={36} className="text-red" />
        </div>
        <span className="denied-code-tag">403 RESTRICTED OPERATIONAL AREA</span>
        <h1>Access Denied</h1>
        <p>
          You don't have permission to perform <b>{actionName || "this operational action"}</b> as a{" "}
          <span className="user-role-pill">{user.role}</span>.
        </p>

        {requiredRole && (
          <div className="required-role-box">
            <Lock size={14} className="text-amber" />
            <span>
              This operation requires authority granted to: <b>{requiredRole}</b>
            </span>
          </div>
        )}

        <div className="denied-actions">
          <Link href={getDashboardRoute(user.role)} className="button primary">
            <ArrowLeft size={14} /> Return to Your Dashboard
          </Link>
          {requiredRole && (
            <button
              className="button secondary"
              onClick={() => switchRole(requiredRole)}
            >
              <RefreshCw size={14} /> Switch Persona to {requiredRole} (Demo)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
