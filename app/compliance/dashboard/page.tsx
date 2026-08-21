"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/shell";
import { MetricCard } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { complianceData, hash } from "@/lib/data";
import {
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  FileCode2,
  ShieldCheck,
  ArrowUpRight,
  Eye,
  FileText,
  Search,
  Lock,
  Download,
  Clock,
} from "lucide-react";

export default function ComplianceAuditorDashboard() {
  const { setReportModalOpen, setEvidenceOpen } = useDemo();
  const [controls, setControls] = useState(complianceData.controlsChecklist);
  const [findings, setFindings] = useState(complianceData.auditFindings);

  const handleVerifyControl = (ctrlName: string) => {
    setControls((prev) =>
      prev.map((c) => (c.name === ctrlName ? { ...c, status: "PASS", detail: "Verified by Auditor" } : c))
    );
    alert(`Control Verified: ${ctrlName}. Signed audit trail updated.`);
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="page-head">
        <div>
          <span className="page-kicker">EVIDENCE-DRIVEN AI COMPLIANCE & AUDIT</span>
          <h1>AI Compliance & Audit Center</h1>
          <p>Verify AI governance, controls, evidence, and compliance status.</p>
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
          value={`${complianceData.kpis.underAudit}`}
          detail="12 models actively tracked"
          icon={<FileCheck className="text-blue" size={18} />}
        />
        <MetricCard
          label="Compliance Rate"
          value={complianceData.kpis.complianceRate}
          detail="92% pass rate across controls"
          icon={<CheckCircle2 className="text-green" size={18} />}
        />
        <MetricCard
          label="Open Audit Findings"
          value={`${complianceData.kpis.openFindings}`}
          detail="1 High, 1 Medium, 1 Low"
          icon={<AlertTriangle className="text-amber" size={18} />}
        />
        <MetricCard
          label="Evidence Completeness"
          value={complianceData.kpis.evidenceCompleteness}
          detail="Cryptographic SHA-256 evidence"
          icon={<Lock className="text-purple" size={18} />}
        />
        <MetricCard
          label="Controls Passed"
          value={complianceData.kpis.controlsPassed}
          detail="24 of 26 checks verified"
          icon={<ShieldCheck className="text-green" size={18} />}
        />
        <MetricCard
          label="Pending Reviews"
          value={`${complianceData.kpis.pendingReviews}`}
          detail="Awaiting auditor signature"
          icon={<Clock size={18} />}
        />
      </div>

      {/* Compliance Status Overview */}
      <div className="secops-ops-overview-card mt-2">
        <div className="ops-card-head">
          <span className="panel-kicker">GOVERNANCE METRICS</span>
          <h2>Model Compliance Status Breakdown</h2>
        </div>
        <div className="ops-health-counts-grid">
          <div className="ops-count-box safe">
            <span>COMPLIANT</span>
            <strong>{complianceData.complianceStatus.compliant}</strong>
            <small>Full Evidence Passed</small>
          </div>
          <div className="ops-count-box info">
            <span>PARTIALLY COMPLIANT</span>
            <strong>{complianceData.complianceStatus.partial}</strong>
            <small>Minor Evidence Gap</small>
          </div>
          <div className="ops-count-box warn">
            <span>UNDER REVIEW</span>
            <strong>{complianceData.complianceStatus.underReview}</strong>
            <small>Auditor Review Pending</small>
          </div>
          <div className="ops-count-box danger">
            <span>NON-COMPLIANT</span>
            <strong>{complianceData.complianceStatus.nonCompliant}</strong>
            <small>Action Required</small>
          </div>
        </div>
      </div>

      {/* Evidence Completeness Progress Banner */}
      <div className="evidence-completeness-banner mt-4">
        <div className="flex items-center justify-between">
          <span className="panel-kicker">AUDIT READINESS INDEX</span>
          <strong className="text-green font-mono text-sm">92% COMPLETE</strong>
        </div>
        <div className="cause-bar-track mt-2">
          <div className="cause-bar-fill bg-blue" style={{ width: "92%" }} />
        </div>
        <div className="flex justify-between text-xs text-muted mt-2">
          <span>11 of 12 Models have complete cryptographic SHA-256 evidence packages</span>
          <span>Missing: ContractLens re-certification signature</span>
        </div>
      </div>

      <div className="dashboard-grid mt-4">
        {/* Section 1: Control Checklist */}
        <section className="panel system-card">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">COMPLIANCE CONTROL VERIFICATION</span>
              <h2>Control Checklist</h2>
            </div>
          </div>

          <div className="table-wrap mt-2">
            <table>
              <thead>
                <tr>
                  <th>Control Name</th>
                  <th>Status</th>
                  <th>Verification Detail</th>
                  <th>Auditor Action</th>
                </tr>
              </thead>
              <tbody>
                {controls.map((ctrl, idx) => (
                  <tr key={idx}>
                    <td><b>{ctrl.name}</b></td>
                    <td>
                      <span className={`status ${ctrl.status === "PASS" ? "safe" : "warn"}`}>
                        {ctrl.status}
                      </span>
                    </td>
                    <td><small className="text-muted">{ctrl.detail}</small></td>
                    <td>
                      {ctrl.status !== "PASS" ? (
                        <button
                          className="button secondary sm"
                          onClick={() => handleVerifyControl(ctrl.name)}
                        >
                          Verify Control
                        </button>
                      ) : (
                        <span className="text-green text-xs font-mono">VERIFIED ✓</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Auditor Actions Launchpad */}
        <section className="panel attention">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">AUDITOR ACTIONS</span>
              <h2>Primary Audit Tools</h2>
            </div>
          </div>

          <div className="auditor-actions-list">
            <button className="auditor-action-btn" onClick={() => setEvidenceOpen(true)}>
              <FileCode2 size={16} className="text-purple" />
              <div>
                <strong>Inspect Cryptographic Evidence Vault</strong>
                <small>Verify SHA-256 baseline evidence hash: {hash.substring(0, 16)}...</small>
              </div>
            </button>

            <button className="auditor-action-btn" onClick={() => setReportModalOpen(true)}>
              <Download size={16} className="text-green" />
              <div>
                <strong>Export AI Compliance Audit Report</strong>
                <small>Generate print & PDF executive compliance package</small>
              </div>
            </button>

            <Link href="/models" className="auditor-action-btn">
              <Search size={16} className="text-blue" />
              <div>
                <strong>Verify Model Registry Passport</strong>
                <small>Inspect version lineage and certification records</small>
              </div>
            </Link>

            <Link href="/monitoring" className="auditor-action-btn">
              <ShieldCheck size={16} className="text-amber" />
              <div>
                <strong>Review Behavioral Baseline Probes</strong>
                <small>Validate 12,480 dimension evaluation probes</small>
              </div>
            </Link>
          </div>
        </section>
      </div>

      {/* Section 3: Audit Findings */}
      <section className="panel mt-4">
        <div className="panel-head">
          <div>
            <span className="panel-kicker">AUDIT FINDINGS & DEFICIENCIES</span>
            <h2>Open Audit Findings</h2>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Finding Level</th>
                <th>Finding Title</th>
                <th>Affected Model</th>
                <th>Date Discovered</th>
                <th>Remediation Requirement</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {findings.map((f, idx) => (
                <tr key={idx}>
                  <td>
                    <span className={`risk-tag risk-${f.level.toLowerCase()}`}>
                      {f.level}
                    </span>
                  </td>
                  <td><b>{f.title}</b></td>
                  <td><span className="font-mono text-xs">{f.model}</span></td>
                  <td>{f.date}</td>
                  <td><small className="text-muted">{f.recommendation}</small></td>
                  <td>
                    <button className="button secondary sm" onClick={() => setEvidenceOpen(true)}>
                      <Eye size={12} /> Review Evidence
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
