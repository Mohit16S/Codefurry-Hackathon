"use client";

import React from "react";
import Link from "next/link";
import { useDemo } from "./demo-provider";
import { InternalRole, toInternalRole, toDisplayRole } from "@/lib/role-data";
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";

export function RoleGuard({
  allowedRole,
  children,
}: {
  allowedRole: InternalRole | string;
  children: React.ReactNode;
}) {
  const { user } = useDemo();
  const currentInternalRole = user.roleId || toInternalRole(user.role);
  const targetInternalRole = toInternalRole(allowedRole);

  if (currentInternalRole !== targetInternalRole) {
    const currentDisplayName = toDisplayRole(currentInternalRole);
    const requiredDisplayName = toDisplayRole(targetInternalRole);

    return (
      <div className="access-denied-container">
        <div className="access-denied-card">
          <div className="access-denied-icon">
            <Lock size={32} className="text-red" />
          </div>
          <span className="denied-code-tag">ROLE AUTHORIZATION ERROR 403</span>
          <h1>ACCESS DENIED</h1>
          <p>
            You don&apos;t have permission to access this operational workspace. This workspace is restricted to{" "}
            <span className="user-role-pill">{requiredDisplayName}</span>.
          </p>

          <div className="required-role-box">
            <ShieldAlert size={16} />
            <span>
              Your active persona is currently <strong>{currentDisplayName}</strong>.
            </span>
          </div>

          <div className="denied-actions">
            <Link href="/dashboard" className="button primary">
              <ArrowLeft size={14} /> Return to My Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
