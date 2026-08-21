"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/shell";
import { MetricCard } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { croData } from "@/lib/data";
import {
  Sparkles,
  ShieldCheck,
  TrendingDown,
  Building,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldAlert,
  Zap,
} from "lucide-react";

export default function RiskOfficerDashboard() {
  const { stage, setReportModalOpen, setTrustModalOpen, can } = useDemo();
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "90D">("30D");

  const isCritical = stage === "alert";

  const handleApproveException = (riskTitle: string) => {
    if (!can("approve_risk_exception")) {
      alert("Permission Denied: Only Chief AI Risk Officer can approve risk exceptions.");
      return;
    }
    alert(`Risk Exception Approved for: "${riskTitle}". Audit trail logged.`);
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="page-head">
        <div>
          <span className="page-kicker">EXECUTIVE GOVERNANCE & AI RISK MANAGEMENT</span>
          <h1>AI Risk Command Center</h1>
          <p>Executive overview of AI risk, trust, and organizational exposure.</p>
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
      <div className="cro-hero-score-card">
        <div className="cro-hero-main">
          <span className="cro-hero-kicker">ORGANIZATION AI TRUST SCORE</span>
          <div className="cro-score-display">
            <strong className={isCritical ? "text-red" : "text-green"}>
              {isCritical ? "74 / 100" : `${croData.heroTrustScore} / 100`}
            </strong>
            <span className={`cro-trust-tag ${isCritical ? "danger" : "safe"}`}>
              {isCritical ? "ATTENTION REQUIRED" : "TRUSTED WORKSPACE"}
            </span>
          </div>
          <p>
            Continuous evaluation across 12,480 behavioral dimensions. Baseline certified across 12 active enterprise AI models.
          </p>
        </div>

        <div className="cro-hero-stats-grid">
          <div className="cro-stat-item">
            <span>ORGANIZATIONAL RISK LEVEL</span>
            <strong className={isCritical ? "text-red" : "text-green"}>{isCritical ? "MEDIUM-HIGH" : croData.riskLevel}</strong>
          </div>
          <div className="cro-stat-item">
            <span>MODELS AT RISK</span>
            <strong className="text-amber">2</strong>
          </div>
          <div className="cro-stat-item">
            <span>CRITICAL ISSUES</span>
            <strong className={isCritical ? "text-red" : "text-green"}>{isCritical ? "1" : "0"}</strong>
          </div>
          <div className="cro-stat-item">
            <span>COMPLIANCE EXPOSURE</span>
            <strong className="text-blue">LOW (92% Pass)</strong>
          </div>
          <div className="cro-stat-item">
            <span>30-DAY RISK TREND</span>
            <strong className="text-green flex items-center gap-1">
              <TrendingDown size={14} /> −8.4% Risk
            </strong>
          </div>
        </div>
      </div>

      {/* AI Risk Distribution Breakdown */}
      <div className="secops-ops-overview-card mt-4">
        <div className="ops-card-head">
          <span className="panel-kicker">PORTFOLIO EXPOSURE</span>
          <h2>AI Model Risk Distribution</h2>
        </div>
        <div className="ops-health-counts-grid">
          <div className="ops-count-box safe">
            <span>LOW RISK</span>
            <strong>{croData.riskDistribution.low}</strong>
            <small>Certified Baseline</small>
          </div>
          <div className="ops-count-box info">
            <span>MEDIUM RISK</span>
            <strong>{croData.riskDistribution.medium}</strong>
            <small>Routine Monitoring</small>
          </div>
          <div className="ops-count-box warn">
            <span>HIGH RISK</span>
            <strong>{croData.riskDistribution.high}</strong>
            <small>Review Required</small>
          </div>
          <div className={`ops-count-box danger ${isCritical ? "critical-pulse" : ""}`}>
            <span>CRITICAL RISK</span>
            <strong>{isCritical ? "2" : "1"}</strong>
            <small>Immediate Mitigation</small>
          </div>
        </div>
      </div>

      {/* AI Executive Summary Card */}
      <section className="panel why-card mt-4">
        <Sparkles size={24} className="text-purple flex-shrink-0" />
        <div>
          <span className="panel-kicker">EXECUTIVE SUMMARY REPORT</span>
          <p className="font-medium text-white text-sm mt-1">
            "{croData.executiveSummary}"
          </p>
        </div>
      </section>

      {/* Top Organizational Risks Table */}
      <section className="panel mt-4">
        <div className="panel-head">
          <div>
            <span className="panel-kicker">EXECUTIVE GOVERNANCE</span>
            <h2>Top Organizational AI Risks</h2>
          </div>
          <div className="time-range-picker">
            {(["7D", "30D", "90D"] as const).map((r) => (
              <button
                key={r}
                className={`range-btn ${timeRange === r ? "active" : ""}`}
                onClick={() => setTimeRange(r)}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Risk Scenario</th>
                <th>Business Impact</th>
                <th>Probability</th>
                <th>Affected Models</th>
                <th>Recommended Action</th>
                <th>Executive Decision</th>
              </tr>
            </thead>
            <tbody>
              {croData.topRisks.map((rk, idx) => (
                <tr key={idx}>
                  <td><b>{rk.name}</b></td>
                  <td>
                    <span className={`risk-tag risk-${rk.impact.toLowerCase()}`}>
                      {rk.impact}
                    </span>
                  </td>
                  <td>{rk.probability}</td>
                  <td><span className="font-mono text-xs">{rk.models}</span></td>
                  <td><small className="text-muted">{rk.action}</small></td>
                  <td>
                    <button
                      className="button secondary sm"
                      onClick={() => handleApproveException(rk.name)}
                    >
                      Approve Exception
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Model Portfolio High-Risk Watchlist */}
      <section className="panel mt-4">
        <div className="panel-head">
          <div>
            <span className="panel-kicker">MODEL PORTFOLIO WATCHLIST</span>
            <h2>High-Risk AI Models Requiring Executive Action</h2>
          </div>
          <Link href="/models" className="button secondary sm">
            View Full Portfolio <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Category</th>
                <th>Trust Score</th>
                <th>Risk Exposure</th>
                <th>Last Certification</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>ContractLens</b> (v1.2)</td>
                <td>Legal · Extraction</td>
                <td><b>86 / 100</b></td>
                <td><span className="risk-tag risk-high">HIGH</span></td>
                <td>Jul 28, 2026</td>
                <td><span className="status warn">REVIEW REQUIRED</span></td>
              </tr>
              <tr>
                <td><b>MedAssist Triage</b> (v0.9)</td>
                <td>Research Demo · Triage</td>
                <td><b>82 / 100</b></td>
                <td><span className="risk-tag risk-high">HIGH</span></td>
                <td>Jul 15, 2026</td>
                <td><span className="status danger">HIGH RISK</span></td>
              </tr>
              {isCritical && (
                <tr className="row-alert">
                  <td><b>Sentiment Pro</b> (v3.2)</td>
                  <td>NLP · Sentiment</td>
                  <td><b className="text-red">58 / 100</b></td>
                  <td><span className="risk-tag risk-critical">CRITICAL</span></td>
                  <td>Aug 15, 2026</td>
                  <td><span className="status danger">CRITICAL DRIFT</span></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
