"use client";

import Link from "next/link";
import { AppShell } from "@/components/shell";
import { MetricCard, StatusBadge } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { RoleGuard } from "@/components/role-guard";
import { secOpsLeadData } from "@/lib/role-data";
import {
  Radio,
  Activity,
  TriangleAlert,
  ShieldAlert,
  Clock,
  ArrowUpRight,
  PauseCircle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Bell,
  Check,
} from "lucide-react";
import { useState } from "react";

export default function SecOpsDashboard() {
  const { stage, setReportModalOpen, setEvidenceOpen, restoreModel, simulateSwap, can, addToast } = useDemo();
  const isCritical = stage === "alert";

  const data = secOpsLeadData;
  const [incidents, setIncidents] = useState(data.liveIncidentFeed);

  const handleContain = (title: string) => {
    if (!can("contain_incident")) {
      alert("Permission Denied: Only ML SecOps Lead can execute endpoint containment.");
      return;
    }
    restoreModel();
    addToast("Incident Contained", `Endpoint contained for ${title}`, "success");
  };

  return (
    <RoleGuard allowedRole="ML_SECOPS_LEAD">
      <AppShell>
        {/* Header */}
        <div className="page-head">
          <div>
            <span className="page-kicker">PRODUCTION AI OPERATIONS</span>
            <h1>{data.title}</h1>
            <p>{data.subtitle}</p>
          </div>
          <div className="head-actions">
            <Link href="/alerts" className="button primary">
              <Bell size={15} /> Incident Console
            </Link>
            <button className="button secondary" onClick={() => setReportModalOpen(true)}>
              <Activity size={15} /> Generate Incident Report
            </button>
          </div>
        </div>

        {/* 6 Operational KPIs */}
        <div className="metric-grid kpi-6-grid">
          <MetricCard
            label="Production Models"
            value={`${data.kpis.productionModels}`}
            detail="Active production endpoints"
            icon={<Radio size={18} />}
          />
          <MetricCard
            label="Active Incidents"
            value={isCritical ? `${data.kpis.activeIncidents + 1}` : `${data.kpis.activeIncidents}`}
            detail={isCritical ? "Critical swap incident in progress" : "4 unresolved incidents"}
            icon={<ShieldAlert className={isCritical ? "text-red" : "text-amber"} size={18} />}
          />
          <MetricCard
            label="Critical Alerts"
            value={`${data.kpis.criticalAlerts}`}
            detail="Immediate containment required"
            icon={<AlertTriangle className="text-red" size={18} />}
          />
          <MetricCard
            label="Models At Risk"
            value={`${data.kpis.modelsAtRisk}`}
            detail="Elevated error / latency rate"
            icon={<TriangleAlert className="text-amber" size={18} />}
          />
          <MetricCard
            label="Deployment Changes"
            value={`${data.kpis.deploymentChanges}`}
            detail="Last 24 hours"
            icon={<Activity size={18} />}
          />
          <MetricCard
            label="Mean Time To Resolve"
            value={data.kpis.mttr}
            detail="Operational response SLA"
            icon={<Clock size={18} />}
          />
        </div>

        {/* Operational Quick Actions */}
        <section className="dashboard-actions">
          <article>
            <span className="action-card-icon danger"><PauseCircle /></span>
            <div>
              <h2>Contain Production Incident</h2>
              <p>Trigger emergency circuit breaker to isolate compromised endpoint.</p>
            </div>
            <button className="action-card-cta" onClick={() => handleContain("Fraud Detection AI")}>Contain Now <ArrowUpRight /></button>
          </article>
          <article>
            <span className="action-card-icon"><RotateCcw /></span>
            <div>
              <h2>Zero-Downtime Rollback</h2>
              <p>Restore endpoint to certified v3.2 baseline snapshot instantly.</p>
            </div>
            <button className="action-card-cta" onClick={restoreModel}>Rollback <ArrowUpRight /></button>
          </article>
          <article>
            <span className="action-card-icon amber"><Bell /></span>
            <div>
              <h2>Incident Escalation</h2>
              <p>Escalate incident ticket to Chief AI Risk Officer & Auditor.</p>
            </div>
            <button className="action-card-cta" onClick={() => addToast("Escalated", "Incident ticket escalated to Risk Officer", "warning")}>Escalate <ArrowUpRight /></button>
          </article>
        </section>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          {/* Live Incident Feed */}
          <section className="panel system-card">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">LIVE PRODUCTION FEED</span>
                <h2>Live Incident Feed</h2>
              </div>
              <StatusBadge status={isCritical ? "CRITICAL INCIDENT" : "OPERATIONAL"} />
            </div>

            <div className="live-incident-feed-list">
              {incidents.map((inc, i) => (
                <div key={i} className={`feed-event-item ${inc.level === "CRITICAL" ? "critical" : ""}`}>
                  <span className="feed-time">{inc.time}</span>
                  <div className="feed-content">
                    <strong>{inc.title} — <i>{inc.target}</i></strong>
                    <p>{inc.detail}</p>
                  </div>
                  {inc.level === "CRITICAL" && (
                    <button className="button danger sm ml-auto" onClick={() => handleContain(inc.target)}>
                      Contain
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Production Model Health Grid */}
          <section className="panel attention">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">ENDPOINT STATUS</span>
                <h2>Production Model Health</h2>
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Model Endpoint</th>
                    <th>QPS</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.productionHealth.map((h) => (
                    <tr key={h.model}>
                      <td>
                        <b>{h.model}</b>
                        <small className="block text-muted">{h.endpoint}</small>
                      </td>
                      <td><b>{h.qps}</b></td>
                      <td>
                        <span className={`status ${h.status === "HEALTHY" ? "safe" : h.status === "CONTAINED" ? "warn" : "danger"}`}>
                          {h.status}
                        </span>
                      </td>
                      <td>
                        <button className="button secondary sm" onClick={() => setEvidenceOpen(true)}>
                          Logs
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Deployments History Queue */}
        <section className="panel mt-4">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">DEPLOYMENT QUEUE</span>
              <h2>Recent Model Deployments</h2>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Version Snapshot</th>
                  <th>Target Model</th>
                  <th>Status</th>
                  <th>Deployment Time</th>
                  <th>Certification</th>
                </tr>
              </thead>
              <tbody>
                {data.deployments.map((d) => (
                  <tr key={d.version}>
                    <td><code>{d.version}</code></td>
                    <td><b>{d.model}</b></td>
                    <td><span className={`status ${d.status === "LIVE" ? "safe" : "warn"}`}>{d.status}</span></td>
                    <td>{d.deployedAt}</td>
                    <td>{d.verified ? <span className="verified"><Check size={12} /> Certified</span> : <span className="text-red">Unverified</span>}</td>
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
