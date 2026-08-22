"use client";

import Link from "next/link";
import { AppShell } from "@/components/shell";
import { MetricCard, StatusBadge } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { RoleGuard } from "@/components/role-guard";
import { securityEngineerData } from "@/lib/role-data";
import {
  Boxes,
  ShieldCheck,
  HeartPulse,
  TriangleAlert,
  ArrowUpRight,
  Activity,
  ShieldAlert,
  Zap,
  FlaskConical,
  Eye,
  Radio,
  RotateCcw,
  FileCode,
} from "lucide-react";

export default function SecurityEngineerDashboard() {
  const { stage, setRegisterModalOpen, setTrustModalOpen, setReportModalOpen, setEvidenceOpen, restoreModel, simulateSwap } = useDemo();
  const isCritical = stage === "alert";

  const data = securityEngineerData;

  return (
    <RoleGuard allowedRole="AI_SECURITY_ENGINEER">
      <AppShell>
        {/* Header */}
        <div className="page-head">
          <div>
            <span className="page-kicker">TECHNICAL AI SECURITY ENGINEERING</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
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
            value={`${data.kpis.modelsMonitored}`}
            detail="100% endpoint coverage"
            icon={<Boxes size={18} />}
          />
          <MetricCard
            label="Active Drift Events"
            value={isCritical ? `${data.kpis.activeDriftEvents + 1}` : `${data.kpis.activeDriftEvents}`}
            detail={isCritical ? "Sentiment Pro (41.7% deviation)" : "3 active drift alerts"}
            icon={<Activity className={isCritical ? "text-red" : "text-amber"} size={18} />}
          />
          <MetricCard
            label="Security Test Failures"
            value={`${data.kpis.securityTestFailures}`}
            detail="Prompt injection & Jailbreak"
            icon={<TriangleAlert className="text-amber" size={18} />}
          />
          <MetricCard
            label="Critical Vulnerabilities"
            value={`${data.kpis.criticalVulnerabilities}`}
            detail="Unverified baseline signature"
            icon={<ShieldAlert className="text-red" size={18} />}
          />
          <MetricCard
            label="Average Trust Score"
            value={isCritical ? "74 / 100" : `${data.kpis.avgTrustScore} / 100`}
            detail={isCritical ? "−17 pts (Critical Drift)" : "Top 8% empirical security rank"}
            icon={<ShieldCheck className={isCritical ? "text-red" : "text-green"} size={18} />}
            onClick={() => setTrustModalOpen(true)}
          />
          <MetricCard
            label="Tests Run Today"
            value={`${data.kpis.testsRunToday}`}
            detail="Automated probe suite"
            icon={<HeartPulse size={18} />}
          />
        </div>

        {/* Engineering Quick Actions */}
        <section className="dashboard-actions">
          <article>
            <span className="action-card-icon danger"><Radio /></span>
            <div>
              <h2>Simulate Model Swap</h2>
              <p>Trigger live behavioral drift against certified baseline.</p>
            </div>
            <button className="action-card-cta" onClick={simulateSwap}>Run Demo <ArrowUpRight /></button>
          </article>
          <article>
            <span className="action-card-icon"><FlaskConical /></span>
            <div>
              <h2>Run Adversarial Probe</h2>
              <p>Execute prompt injection attack probes against active models.</p>
            </div>
            <Link href="/playground" className="action-card-cta">Playground <ArrowUpRight /></Link>
          </article>
          <article>
            <span className="action-card-icon amber"><FileCode /></span>
            <div>
              <h2>Security Audit Report</h2>
              <p>Generate technical security forensics report.</p>
            </div>
            <button className="action-card-cta" onClick={() => setReportModalOpen(true)}>Generate Report <ArrowUpRight /></button>
          </article>
        </section>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Active Security Findings */}
          <section className="panel system-card">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">BEHAVIORAL FORENSICS</span>
                <h2>Active Security Findings</h2>
              </div>
              <StatusBadge status={isCritical ? "CRITICAL DRIFT" : "MONITORING"} />
            </div>

            <div className="table-wrap mt-2">
              <table>
                <thead>
                  <tr>
                    <th>Model Name</th>
                    <th>Category</th>
                    <th>Provider</th>
                    <th>Trust Score</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.models.map((m) => (
                    <tr key={m.id}>
                      <td><b>{m.name}</b></td>
                      <td>{m.category}</td>
                      <td>{m.provider}</td>
                      <td><b className={m.trust >= 90 ? "text-green" : "text-amber"}>{m.trust}%</b></td>
                      <td>
                        <span className={`status ${m.status === "PASSED" ? "safe" : m.status === "VULNERABLE" ? "danger" : "warn"}`}>
                          {m.status}
                        </span>
                      </td>
                      <td>
                        <Link href="/playground" className="button secondary sm">
                          Test Model
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Vulnerability Findings */}
          <section className="panel attention">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">VULNERABILITY ASSESSMENT</span>
                <h2>Critical Vulnerabilities</h2>
              </div>
            </div>

            <div className="secops-actions-list">
              {data.vulnerabilityFindings.map((v) => (
                <div key={v.id} className="feed-event-item critical">
                  <ShieldAlert size={18} className="text-red" />
                  <div className="feed-content">
                    <strong>{v.title} ({v.severity})</strong>
                    <p>Target: <b>{v.target}</b> — {v.impact}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="demo-trigger-box mt-4">
              {isCritical ? (
                <button className="button secondary w-full" onClick={restoreModel}>
                  <RotateCcw size={14} /> Restore Certified Baseline
                </button>
              ) : (
                <button className="button danger w-full" onClick={simulateSwap}>
                  <Radio size={14} /> Simulate Model Swap Incident
                </button>
              )}
            </div>
          </section>
        </div>

        {/* Recent Security Tests */}
        <section className="panel mt-4">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">AUTOMATED PROBE HISTORY</span>
              <h2>Recent Model Security Tests</h2>
            </div>
            <Link href="/playground" className="button secondary sm">
              Run New Probe <ArrowUpRight size={12} />
            </Link>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Probe Suite Name</th>
                  <th>Test Target</th>
                  <th>Result</th>
                  <th>Behavioral Similarity</th>
                </tr>
              </thead>
              <tbody>
                {data.recentTests.map((t) => (
                  <tr key={t.id}>
                    <td><code>{t.id}</code></td>
                    <td><b>{t.name}</b></td>
                    <td>{t.suite}</td>
                    <td>
                      <span className={`status ${t.result === "PASSED" ? "safe" : "danger"}`}>
                        {t.result}
                      </span>
                    </td>
                    <td><b>{t.similarity}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </AppShell>
    </RoleGuard>
  );
}
