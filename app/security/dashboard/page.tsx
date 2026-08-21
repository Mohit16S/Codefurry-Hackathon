"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/shell";
import { MetricCard, StatusBadge, TrustScore } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { probeLibrary } from "@/lib/data";
import {
  Boxes,
  ShieldCheck,
  HeartPulse,
  TriangleAlert,
  ArrowUpRight,
  Activity,
  PlusCircle,
  ShieldAlert,
  Zap,
  FlaskConical,
  Eye,
  RotateCcw,
  CheckCircle2,
  FileCode,
  Radio,
} from "lucide-react";

export default function SecurityEngineerDashboard() {
  const { modelsList, stage, setRegisterModalOpen, setTrustModalOpen, setReportModalOpen, setEvidenceOpen, restoreModel, simulateSwap } = useDemo();

  const isCritical = stage === "alert";

  return (
    <AppShell>
      {/* Header */}
      <div className="page-head">
        <div>
          <span className="page-kicker">TECHNICAL AI SECURITY ENGINEERING</span>
          <h1>AI Security Engineering</h1>
          <p>Monitor model behavior, investigate anomalies, and validate AI security.</p>
        </div>
        <div className="head-actions">
          <Link href="/playground" className="button primary">
            <FlaskConical size={15} /> Run Security Test
          </Link>
          <Link href="/monitoring" className="button secondary">
            <Activity size={15} /> Open Drift Sentinel
          </Link>
        </div>
      </div>

      {/* 6 Technical KPIs */}
      <div className="metric-grid kpi-6-grid">
        <MetricCard
          label="Models Under Monitoring"
          value={`${modelsList.length}`}
          detail="100% endpoint coverage"
          icon={<Boxes size={18} />}
        />
        <MetricCard
          label="Active Drift Events"
          value={isCritical ? "1" : "0"}
          detail={isCritical ? "Sentiment Pro (41.7% deviation)" : "Zero active drift events"}
          icon={<Activity className={isCritical ? "text-red" : "text-green"} size={18} />}
        />
        <MetricCard
          label="Security Test Failures"
          value="4"
          detail="Bias & Hallucination probes"
          icon={<TriangleAlert className="text-amber" size={18} />}
        />
        <MetricCard
          label="Critical Vulnerabilities"
          value="2"
          detail="Unverified baseline signatures"
          icon={<ShieldAlert className="text-red" size={18} />}
        />
        <MetricCard
          label="Average Model Trust"
          value={isCritical ? "74 / 100" : "94 / 100"}
          detail={isCritical ? "−20 pts (Critical Drift Event)" : "Top 8% in category"}
          icon={<ShieldCheck className={isCritical ? "text-red" : "text-green"} size={18} />}
          onClick={() => setTrustModalOpen(true)}
        />
        <MetricCard
          label="Tests Run Today"
          value="1,240"
          detail="Automated probe suite"
          icon={<HeartPulse size={18} />}
        />
      </div>

      {/* Main Sections */}
      <div className="dashboard-grid">
        {/* Section 1: Active Security Events */}
        <section className="panel system-card">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">BEHAVIORAL FORENSICS</span>
              <h2>Active Security Events</h2>
            </div>
            <StatusBadge status={isCritical ? "CRITICAL DRIFT" : "HEALTHY"} />
          </div>

          <div className="table-wrap mt-2">
            <table>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Event</th>
                  <th>Severity</th>
                  <th>Deviation</th>
                  <th>Detected</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className={isCritical ? "row-alert" : ""}>
                  <td><b>Sentiment Pro</b> (v3.2)</td>
                  <td>{isCritical ? "Possible Model Swap" : "Routine Verification"}</td>
                  <td><span className={`status ${isCritical ? "danger" : "safe"}`}>{isCritical ? "CRITICAL" : "NORMAL"}</span></td>
                  <td><b className={isCritical ? "text-red" : "text-green"}>{isCritical ? "41.7%" : "1.3%"}</b></td>
                  <td>Just now</td>
                  <td>
                    {isCritical ? (
                      <button className="button danger sm" onClick={() => setEvidenceOpen(true)}>
                        <Eye size={12} /> Investigate
                      </button>
                    ) : (
                      <span className="status safe">PASS</span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td><b>VisionGuard</b> (v2.4)</td>
                  <td>Latency Degradation Spike</td>
                  <td><span className="status warn">HIGH</span></td>
                  <td>8.9%</td>
                  <td>4m ago</td>
                  <td><span className="status warn">DEGRADED</span></td>
                </tr>
                <tr>
                  <td><b>ContractLens</b> (v1.2)</td>
                  <td>Hallucination Boundary Fail</td>
                  <td><span className="status danger">HIGH</span></td>
                  <td>4.7%</td>
                  <td>18m ago</td>
                  <td><span className="status warn">REVIEW</span></td>
                </tr>
                <tr>
                  <td><b>MedAssist Triage</b> (v0.9)</td>
                  <td>Demographic Bias Variance</td>
                  <td><span className="status danger">CRITICAL</span></td>
                  <td>6.2%</td>
                  <td>25m ago</td>
                  <td><span className="status danger">HIGH RISK</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Demo Simulation Launchpad */}
        <section className="panel attention">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">ENGINEERING CONTROLS</span>
              <h2>Primary Actions</h2>
            </div>
          </div>

          <div className="engineering-actions-list">
            <Link href="/playground" className="eng-action-btn">
              <FlaskConical size={16} className="text-blue" />
              <div>
                <strong>Run Security Test</strong>
                <small>Execute prompt injection and jailbreak probes</small>
              </div>
            </Link>

            <Link href="/monitoring" className="eng-action-btn">
              <Activity size={16} className="text-amber" />
              <div>
                <strong>Investigate Behavioral Drift</strong>
                <small>Inspect 12,480 dimension similarity deltas</small>
              </div>
            </Link>

            <Link href="/compare" className="eng-action-btn">
              <Zap size={16} className="text-green" />
              <div>
                <strong>Compare Model Versions</strong>
                <small>Diff certified v3.2 baseline vs production v3.3</small>
              </div>
            </Link>

            <button className="eng-action-btn" onClick={() => setRegisterModalOpen(true)}>
              <FileCode size={16} className="text-purple" />
              <div>
                <strong>Generate Baseline Fingerprint</strong>
                <small>Run 5-step certification wizard and SHA-256 hash</small>
              </div>
            </button>
          </div>

          <div className="demo-trigger-box mt-4">
            <span className="panel-kicker">DEMO SCENARIO CONTROL</span>
            {isCritical ? (
              <button className="button secondary w-full" onClick={restoreModel}>
                <RotateCcw size={14} /> Restore Certified Model (v3.2)
              </button>
            ) : (
              <button className="button danger w-full" onClick={simulateSwap}>
                <Radio size={14} /> Simulate Silent Model Swap
              </button>
            )}
          </div>
        </section>
      </div>

      {/* Section 3: Recent Security Tests */}
      <section className="panel mt-4">
        <div className="panel-head">
          <div>
            <span className="panel-kicker">AUTOMATED TEST HISTORY</span>
            <h2>Recent Security Tests</h2>
          </div>
          <Link href="/playground" className="button secondary sm">
            View All Tests <ArrowUpRight size={12} />
          </Link>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Test Probe Name</th>
                <th>Target Model</th>
                <th>Result</th>
                <th>Risk Rating</th>
                <th>Execution Time</th>
              </tr>
            </thead>
            <tbody>
              {probeLibrary.slice(0, 5).map((prb) => (
                <tr key={prb.id}>
                  <td><b>{prb.name}</b></td>
                  <td>Sentiment Pro</td>
                  <td>
                    <span className={`status ${prb.lastResult === "FAIL" ? "danger" : prb.lastResult === "WARNING" ? "warn" : "safe"}`}>
                      {prb.lastResult}
                    </span>
                  </td>
                  <td><span className={`risk-tag risk-${prb.severity.toLowerCase()}`}>{prb.severity}</span></td>
                  <td>{prb.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
