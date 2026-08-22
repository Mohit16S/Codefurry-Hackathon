"use client";

import Link from "next/link";
import { AppShell } from "@/components/shell";
import { MetricCard } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { RoleGuard } from "@/components/role-guard";
import { riskOfficerData } from "@/lib/role-data";
import {
  Sparkles,
  ShieldCheck,
  Building,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingDown,
} from "lucide-react";

export default function RiskOfficerDashboard() {
  const { stage, setReportModalOpen, setTrustModalOpen, can, addToast } = useDemo();
  const isCritical = stage === "alert";

  const data = riskOfficerData;

  const handleApproveException = (riskTitle: string) => {
    if (!can("approve_risk_exception")) {
      alert("Permission Denied: Only Chief AI Risk Officer can approve risk exceptions.");
      return;
    }
    addToast("Exception Approved", `Risk Exception Approved for: "${riskTitle}". Audit trail signed.`, "success");
  };

  return (
    <RoleGuard allowedRole="CHIEF_AI_RISK_OFFICER">
      <AppShell>
        {/* Header */}
        <div className="page-head">
          <div>
            <span className="page-kicker">EXECUTIVE AI GOVERNANCE & RISK MANAGEMENT</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </div>
          <div className="head-actions">
            <button className="button primary" onClick={() => setReportModalOpen(true)}>
              <FileSpreadsheet size={15} /> Generate Executive Risk Report
            </button>
            <button className="button secondary" onClick={() => setTrustModalOpen(true)}>
              <ShieldCheck size={15} /> Inspect Trust Score Methodology
            </button>
          </div>
        </div>

        {/* Hero Section: Organization AI Trust Score */}
        <div className="cro-hero-score-card mb-4">
          <div className="cro-hero-main">
            <span className="cro-hero-kicker">ORGANIZATION AI TRUST SCORE</span>
            <div className="cro-score-display">
              <strong className={isCritical ? "text-red" : "text-green"}>
                {isCritical ? "74 / 100" : `${data.heroTrust.score} / 100`}
              </strong>
              <span className={`cro-trust-tag ${isCritical ? "danger" : "safe"}`}>
                {isCritical ? "ELEVATED RISK" : data.heroTrust.status}
              </span>
            </div>
            <p>{data.heroTrust.description}</p>
          </div>

          <div className="cro-hero-stats-grid">
            <div className="cro-stat-item">
              <span>FINANCIAL LOSS EXPOSURE</span>
              <strong className="text-red">$677,000</strong>
            </div>
            <div className="cro-stat-item">
              <span>ESTIMATED COMPLIANCE PENALTY</span>
              <strong className="text-amber">$120,000</strong>
            </div>
          </div>
        </div>

        {/* 5 Executive KPIs */}
        <div className="metric-grid kpi-6-grid">
          <MetricCard
            label="Total AI Models"
            value={`${data.kpis.totalAIModels}`}
            detail="Enterprise model portfolio"
            icon={<Building size={18} />}
          />
          <MetricCard
            label="High Risk Models"
            value={`${data.kpis.highRiskModels}`}
            detail="Requires CRO exception review"
            icon={<AlertTriangle className="text-amber" size={18} />}
          />
          <MetricCard
            label="Critical Risks"
            value={`${data.kpis.criticalRisks}`}
            detail="Under active containment"
            icon={<AlertTriangle className="text-red" size={18} />}
          />
          <MetricCard
            label="Compliance Exposure"
            value={data.kpis.complianceExposure}
            detail="EU AI Act Art. 14 gaps"
            icon={<ShieldCheck size={18} />}
          />
          <MetricCard
            label="Risk Trend"
            value={data.kpis.riskTrend}
            detail="Improved vs last month"
            icon={<TrendingDown className="text-green" size={18} />}
          />
        </div>

        {/* Executive Summary AI Callout Box */}
        <section className="panel mt-4">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">EXECUTIVE BRIEFING</span>
              <h2>AI Governance Summary</h2>
            </div>
            <Sparkles size={16} className="text-purple" />
          </div>
          <div className="res-text">
            <p>{data.executiveSummary}</p>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="dashboard-grid mt-4">
          {/* Top AI Risks Table */}
          <section className="panel system-card">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">ENTERPRISE RISK MATRIX</span>
                <h2>Top AI Risks</h2>
              </div>
            </div>

            <div className="table-wrap mt-2">
              <table>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Risk Level</th>
                    <th>Business Impact</th>
                    <th>Loss Exposure</th>
                    <th>CRO Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topAIRisks.map((r) => (
                    <tr key={r.model}>
                      <td><b>{r.model}</b><small className="block text-muted">{r.category}</small></td>
                      <td><span className={`status ${r.riskLevel === "HIGH" ? "danger" : r.riskLevel === "MEDIUM" ? "warn" : "safe"}`}>{r.riskLevel}</span></td>
                      <td>{r.businessImpact}</td>
                      <td><b className="text-red">{r.lossExposure}</b></td>
                      <td>
                        <button className="button primary sm" onClick={() => handleApproveException(r.model)}>
                          Approve Exception
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Organizational Risk Heatmap */}
          <section className="panel attention">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">RISK DIMENSIONS</span>
                <h2>Organizational Risk Heatmap</h2>
              </div>
            </div>

            <div className="secops-actions-list">
              {data.riskHeatmap.map((h) => (
                <div key={h.dimension} className="role-dropdown-item">
                  <div>
                    <strong>{h.dimension}</strong>
                    <small>Score: <b>{h.score}</b></small>
                  </div>
                  <span className={`status ${h.status === "SAFE" ? "safe" : "warn"}`}>{h.status}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <button className="button secondary w-full" onClick={() => setReportModalOpen(true)}>
                Export Risk Assessment PDF <ArrowUpRight size={14} />
              </button>
            </div>
          </section>
        </div>
      </AppShell>
    </RoleGuard>
  );
}
