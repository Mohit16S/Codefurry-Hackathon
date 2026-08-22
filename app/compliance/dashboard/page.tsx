"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/shell";
import { MetricCard } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { RoleGuard } from "@/components/role-guard";
import { complianceAuditorData } from "@/lib/role-data";
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  ShieldCheck,
  ArrowUpRight,
  FileText,
  Lock,
} from "lucide-react";

export default function ComplianceAuditorDashboard() {
  const { setReportModalOpen, setEvidenceOpen, addToast } = useDemo();
  const data = complianceAuditorData;
  const [controls, setControls] = useState(data.controlChecklist);

  const handleVerifyControl = (ctrlName: string) => {
    setControls((prev) =>
      prev.map((c) => (c.name === ctrlName ? { ...c, status: "PASS", detail: "Verified by Compliance Auditor" } : c))
    );
    addToast("Control Verified", `Control Verified: ${ctrlName}. Signed audit trail updated.`, "success");
  };

  return (
    <RoleGuard allowedRole="COMPLIANCE_AUDITOR">
      <AppShell>
        {/* Header */}
        <div className="page-head">
          <div>
            <span className="page-kicker">EVIDENCE-DRIVEN AI COMPLIANCE & AUDIT</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </div>
          <div className="head-actions">
            <button className="button primary" onClick={() => setReportModalOpen(true)}>
              <FileText size={15} /> Generate Full Audit Report
            </button>
            <button className="button secondary" onClick={() => setEvidenceOpen(true)}>
              <FileCode2 size={15} /> Open Evidence Vault
            </button>
          </div>
        </div>

        {/* 6 Compliance KPIs */}
        <div className="metric-grid kpi-6-grid">
          <MetricCard
            label="Models Under Audit"
            value={`${data.kpis.modelsUnderAudit}`}
            detail="18 models actively tracked"
            icon={<FileCheck size={18} />}
          />
          <MetricCard
            label="Compliance Rate"
            value={data.kpis.complianceRate}
            detail="EU AI Act & NIST AI RMF"
            icon={<ShieldCheck className="text-green" size={18} />}
          />
          <MetricCard
            label="Open Findings"
            value={`${data.kpis.openFindings}`}
            detail="6 findings requiring review"
            icon={<AlertTriangle className="text-amber" size={18} />}
          />
          <MetricCard
            label="Evidence Completeness"
            value={data.kpis.evidenceCompleteness}
            detail="Cryptographically verified"
            icon={<FileCode2 size={18} />}
          />
          <MetricCard
            label="Controls Passed"
            value={data.kpis.controlsPassed}
            detail="52 total controls evaluated"
            icon={<CheckCircle2 className="text-green" size={18} />}
          />
          <MetricCard
            label="Pending Reviews"
            value={`${data.kpis.pendingReviews}`}
            detail="Awaiting auditor signature"
            icon={<Lock size={18} />}
          />
        </div>

        {/* Auditor Quick Actions */}
        <section className="dashboard-actions">
          <article>
            <span className="action-card-icon"><FileCheck /></span>
            <div>
              <h2>Start Audit Review</h2>
              <p>Initiate formal verification for high-impact AI model.</p>
            </div>
            <button className="action-card-cta" onClick={() => addToast("Audit Started", "Formal Audit Review initialized", "info")}>Start Audit <ArrowUpRight /></button>
          </article>
          <article>
            <span className="action-card-icon amber"><FileCode2 /></span>
            <div>
              <h2>Review Evidence Vault</h2>
              <p>Inspect raw cryptographic payload hashes and certificates.</p>
            </div>
            <button className="action-card-cta" onClick={() => setEvidenceOpen(true)}>Vault <ArrowUpRight /></button>
          </article>
          <article>
            <span className="action-card-icon green"><FileText /></span>
            <div>
              <h2>Generate Audit Report</h2>
              <p>Export certified JSON/PDF evidence bundle.</p>
            </div>
            <button className="action-card-cta" onClick={() => setReportModalOpen(true)}>Generate Report <ArrowUpRight /></button>
          </article>
        </section>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Control Checklist Section */}
          <section className="panel system-card">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">GOVERNANCE CONTROLS</span>
                <h2>Control Checklist</h2>
              </div>
            </div>

            <div className="table-wrap mt-2">
              <table>
                <thead>
                  <tr>
                    <th>Control Name</th>
                    <th>Framework Standard</th>
                    <th>Status</th>
                    <th>Evidence Detail</th>
                    <th>Auditor Action</th>
                  </tr>
                </thead>
                <tbody>
                  {controls.map((ctrl) => (
                    <tr key={ctrl.name}>
                      <td><b>{ctrl.name}</b></td>
                      <td><code>{ctrl.framework}</code></td>
                      <td>
                        <span className={`status ${ctrl.status === "PASS" ? "safe" : "warn"}`}>
                          {ctrl.status}
                        </span>
                      </td>
                      <td><small className="text-muted">{ctrl.detail}</small></td>
                      <td>
                        {ctrl.status !== "PASS" ? (
                          <button className="button primary sm" onClick={() => handleVerifyControl(ctrl.name)}>
                            Verify Control
                          </button>
                        ) : (
                          <span className="text-green text-xs">Verified ✓</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Audit Findings Section */}
          <section className="panel attention">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">NON-COMPLIANCE FINDINGS</span>
                <h2>Audit Findings</h2>
              </div>
            </div>

            <div className="secops-actions-list">
              {data.auditFindings.map((f) => (
                <div key={f.id} className="feed-event-item">
                  <AlertTriangle size={18} className={f.severity === "HIGH" ? "text-red" : "text-amber"} />
                  <div className="feed-content">
                    <strong>{f.title} ({f.severity})</strong>
                    <p>Target: <b>{f.target}</b> · Reported {f.age}</p>
                  </div>
                  <button className="button secondary sm ml-auto" onClick={() => addToast("Finding Reviewed", `Reviewed ${f.id}`, "info")}>
                    Review
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </AppShell>
    </RoleGuard>
  );
}
