"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/shell";
import { MetricCard, StatusBadge } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { secOpsData } from "@/lib/data";
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
  Zap,
  Eye,
  Bell,
  ShieldCheck,
} from "lucide-react";

export default function SecOpsDashboard() {
  const { stage, setReportModalOpen, setEvidenceOpen, restoreModel, simulateSwap, can } = useDemo();
  const [incidents, setIncidents] = useState(secOpsData.incidentQueue);

  const isCritical = stage === "alert";

  const handleContainModel = (incId: string) => {
    if (!can("suspend_model")) {
      alert("Permission Denied: Only ML SecOps Lead can suspend production endpoints.");
      return;
    }
    restoreModel();
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === incId ? { ...inc, status: "Contained" } : inc))
    );
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="page-head">
        <div>
          <span className="page-kicker">PRODUCTION OPERATIONS & COMMAND CENTER</span>
          <h1>ML SecOps Command Center</h1>
          <p>Real-time operational visibility across the AI model ecosystem.</p>
        </div>
        <div className="head-actions">
          <Link href="/alerts" className="button primary">
            <Bell size={15} /> Open Incidents Console
          </Link>
          <button className="button secondary" onClick={() => setReportModalOpen(true)}>
            <Activity size={15} /> Generate Incident Audit Report
          </button>
        </div>
      </div>

      {/* 6 Operational KPIs */}
      <div className="metric-grid kpi-6-grid">
        <MetricCard
          label="Models in Production"
          value={`${secOpsData.kpis.inProduction}`}
          detail="10 active production endpoints"
          icon={<Radio className="text-blue" size={18} />}
        />
        <MetricCard
          label="Active Incidents"
          value={isCritical ? "2" : "1"}
          detail={isCritical ? "1 Critical, 1 High Severity" : "1 High Severity"}
          icon={<TriangleAlert className={isCritical ? "text-red" : "text-amber"} size={18} />}
        />
        <MetricCard
          label="Critical Alerts"
          value={isCritical ? "2" : "0"}
          detail={isCritical ? "Behavioral drift breach" : "Normal operating range"}
          icon={<ShieldAlert className={isCritical ? "text-red" : "text-green"} size={18} />}
        />
        <MetricCard
          label="Models at Risk"
          value="3"
          detail="Sentiment Pro, VisionGuard, ContractLens"
          icon={<Activity className="text-amber" size={18} />}
        />
        <MetricCard
          label="Deployment Changes"
          value={`${secOpsData.kpis.deploymentsToday}`}
          detail="4 version updates today"
          icon={<Zap className="text-purple" size={18} />}
        />
        <MetricCard
          label="Mean Time to Resolve"
          value={secOpsData.kpis.mttr}
          detail="Top 5% SecOps benchmark"
          icon={<Clock size={18} />}
        />
      </div>

      {/* Operational Status Breakdown Banner */}
      <div className="secops-ops-overview-card mt-2">
        <div className="ops-card-head">
          <span className="panel-kicker">AI SECURITY OPERATIONS STATUS</span>
          <h2>Production Ecosystem Health Overview</h2>
        </div>
        <div className="ops-health-counts-grid">
          <div className="ops-count-box safe">
            <span>HEALTHY</span>
            <strong>{secOpsData.operationalCounts.healthy}</strong>
            <small>Endpoints Certified</small>
          </div>
          <div className="ops-count-box info">
            <span>MONITORING</span>
            <strong>{secOpsData.operationalCounts.monitoring}</strong>
            <small>Active Probes Running</small>
          </div>
          <div className="ops-count-box warn">
            <span>DEGRADED</span>
            <strong>{secOpsData.operationalCounts.degraded}</strong>
            <small>Latency Variance</small>
          </div>
          <div className={`ops-count-box danger ${isCritical ? "critical-pulse" : ""}`}>
            <span>CRITICAL</span>
            <strong>{isCritical ? "2" : "1"}</strong>
            <small>Action Required</small>
          </div>
        </div>
      </div>

      <div className="dashboard-grid mt-4">
        {/* Section 1: Live Incident Feed */}
        <section className="panel system-card">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">REAL-TIME OPERATIONAL STREAM</span>
              <h2>Live Incident & Event Feed</h2>
            </div>
            <span className="live-feed-badge">
              <span className="pulse-dot-inline" /> REAL-TIME STREAM
            </span>
          </div>

          <div className="live-incident-feed-list">
            {isCritical && (
              <div className="feed-event-item critical">
                <span className="feed-time">10:42:07</span>
                <ShieldAlert size={14} className="text-red" />
                <div className="feed-content">
                  <strong>CRITICAL DRIFT DETECTED</strong>
                  <p>Sentiment Pro behavioral similarity dropped to 58.3% (deviation threshold breached).</p>
                </div>
                <button className="button danger xs" onClick={() => setEvidenceOpen(true)}>
                  <Eye size={10} /> Inspect
                </button>
              </div>
            )}
            {secOpsData.liveFeed.map((evt, idx) => (
              <div className={`feed-event-item ${evt.severity.toLowerCase()}`} key={idx}>
                <span className="feed-time">{evt.time}</span>
                {evt.severity === "CRITICAL" || evt.severity === "HIGH" ? (
                  <AlertTriangle size={14} className={evt.severity === "CRITICAL" ? "text-red" : "text-amber"} />
                ) : (
                  <CheckCircle2 size={14} className="text-blue" />
                )}
                <div className="feed-content">
                  <strong>{evt.severity} EVENT</strong>
                  <p>{evt.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Operational Containment Launchpad */}
        <section className="panel attention">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">SECOPS CONTAINMENT & ACTIONS</span>
              <h2>Operational Controls</h2>
            </div>
          </div>

          <div className="secops-actions-list">
            <button className="secops-action-btn danger" onClick={() => handleContainModel("INC-8821")}>
              <PauseCircle size={16} />
              <div>
                <strong>Suspend / Contain Model Endpoint</strong>
                <small>Route traffic away from degraded endpoint</small>
              </div>
            </button>

            <button className="secops-action-btn primary" onClick={restoreModel}>
              <RotateCcw size={16} />
              <div>
                <strong>Rollback Deployment</strong>
                <small>Restore Sentiment Pro to certified v3.2 baseline</small>
              </div>
            </button>

            <Link href="/monitoring" className="secops-action-btn secondary">
              <Activity size={16} />
              <div>
                <strong>Investigate Deployment Drift</strong>
                <small>Inspect expected vs production behavior</small>
              </div>
            </Link>

            <button className="secops-action-btn secondary" onClick={simulateSwap}>
              <Radio size={16} />
              <div>
                <strong>Simulate Production Swap</strong>
                <small>Trigger live incident demo scenario</small>
              </div>
            </button>
          </div>
        </section>
      </div>

      {/* Section 3: Deployment Activity */}
      <section className="panel mt-4">
        <div className="panel-head">
          <div>
            <span className="panel-kicker">INFRASTRUCTURE CHANGES</span>
            <h2>Deployment Activity</h2>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Model</th>
                <th>Previous Version</th>
                <th>Current Version</th>
                <th>Deployment Time</th>
                <th>Behavior Change</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {secOpsData.deployments.map((dep, idx) => (
                <tr key={idx}>
                  <td><b>{dep.model}</b></td>
                  <td><span className="version-code">{dep.prevVer}</span></td>
                  <td><span className="version-code">{dep.currVer}</span></td>
                  <td>{dep.time}</td>
                  <td><b className={dep.status.includes("Drift") ? "text-red" : "text-green"}>{dep.change}</b></td>
                  <td><StatusBadge status={dep.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Incident Queue */}
      <section className="panel mt-4">
        <div className="panel-head">
          <div>
            <span className="panel-kicker">OPERATIONAL INCIDENT QUEUE</span>
            <h2>Active Incidents Queue</h2>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Incident ID</th>
                <th>Title</th>
                <th>Severity</th>
                <th>Owner</th>
                <th>Age</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((inc) => (
                <tr key={inc.id}>
                  <td><span className="font-mono text-xs">{inc.id}</span></td>
                  <td><b>{inc.title}</b></td>
                  <td><span className={`risk-tag risk-${inc.severity.toLowerCase()}`}>{inc.severity}</span></td>
                  <td>{inc.owner}</td>
                  <td>{inc.age}</td>
                  <td><span className="status warn">{inc.status}</span></td>
                  <td>
                    <button
                      className="button secondary sm"
                      onClick={() => handleContainModel(inc.id)}
                    >
                      Contain
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
