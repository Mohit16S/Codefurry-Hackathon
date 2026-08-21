"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell";
import { StatusBadge, Button } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import {
  AlertTriangle,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
  Filter,
  Eye,
  X,
  ShieldAlert,
  FileText,
  GitCompare,
  RotateCcw,
  ShieldCheck,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ModelRadar } from "@/components/charts";
import { hash, rootCauseAnalysis } from "@/lib/data";

type AlertItem = {
  id: string;
  level: "CRITICAL" | "WARNING" | "RESOLVED";
  title: string;
  model: string;
  copy: string;
  time: string;
  confidence: string;
  deviation: string;
  icon: any;
};

const initialAlertsList: AlertItem[] = [
  {
    id: "MS-ALT-8821",
    level: "CRITICAL",
    title: "Possible Model Swap",
    model: "Sentiment Pro",
    copy: "41.7% behavioral deviation from certified fingerprint",
    time: "2 minutes ago",
    confidence: "94%",
    deviation: "41.7%",
    icon: ShieldAlert,
  },
  {
    id: "MS-ALT-8819",
    level: "WARNING",
    title: "Latency Degradation Spike",
    model: "VisionGuard",
    copy: "+38ms average p95 latency increase observed",
    time: "4 minutes ago",
    confidence: "88%",
    deviation: "18.2%",
    icon: Clock3,
  },
  {
    id: "MS-ALT-8810",
    level: "RESOLVED",
    title: "Temporary Classification Drift",
    model: "FraudShield",
    copy: "Returned to certified baseline signature fp_9f43a2b1c87e",
    time: "2 hours ago",
    confidence: "99%",
    deviation: "1.2%",
    icon: CheckCircle2,
  },
];

export default function Alerts() {
  const { stage, setStage, setReportModalOpen, setEvidenceOpen, restoreModel, addToast } = useDemo();
  const [filterLevel, setFilterLevel] = useState<string>("ALL");
  const [selectedAlert, setSelectedAlert] = useState<number>(0);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  const filteredAlerts = initialAlertsList.filter((a) => {
    if (resolvedIds.includes(a.id)) return filterLevel === "ALL" || filterLevel === "RESOLVED";
    if (filterLevel === "ALL") return true;
    if (filterLevel === "CRITICAL") return a.level === "CRITICAL";
    if (filterLevel === "WARNING") return a.level === "WARNING";
    if (filterLevel === "RESOLVED") return a.level === "RESOLVED";
    return true;
  });

  const handleResolve = (id: string) => {
    setResolvedIds((prev) => [...prev, id]);
    if (id === "MS-ALT-8821") {
      restoreModel();
    } else {
      addToast("Alert Resolved", `Signal ${id} marked as resolved.`, "success");
    }
  };

  const currentAlert = filteredAlerts[selectedAlert] || initialAlertsList[0];

  return (
    <AppShell>
      {/* Page Header */}
      <div className="page-head">
        <div>
          <span className="page-kicker">SECURITY OPERATIONS CONSOLE</span>
          <h1>Alert Center & Incident Management</h1>
          <p>Investigate behavioral anomalies, model swaps, and security signals across your supply chain.</p>
        </div>
        <button className="button secondary">
          <Filter size={14} /> Filter Console
        </button>
      </div>

      <div className="alerts-layout">
        {/* Left Alert List */}
        <div className="alert-list">
          <div className="alert-tabs">
            <button className={filterLevel === "ALL" ? "active" : ""} onClick={() => setFilterLevel("ALL")}>
              All <b>{initialAlertsList.length}</b>
            </button>
            <button className={filterLevel === "CRITICAL" ? "active" : ""} onClick={() => setFilterLevel("CRITICAL")}>
              Critical <b>1</b>
            </button>
            <button className={filterLevel === "WARNING" ? "active" : ""} onClick={() => setFilterLevel("WARNING")}>
              Warnings <b>1</b>
            </button>
            <button className={filterLevel === "RESOLVED" ? "active" : ""} onClick={() => setFilterLevel("RESOLVED")}>
              Resolved
            </button>
          </div>

          {filteredAlerts.map((a, i) => {
            const isResolved = resolvedIds.includes(a.id) || a.level === "RESOLVED";
            const Icon = isResolved ? CheckCircle2 : a.icon;

            return (
              <button
                key={a.id}
                onClick={() => setSelectedAlert(i)}
                className={`alert-card ${isResolved ? "resolved" : a.level.toLowerCase()} ${selectedAlert === i ? "selected" : ""}`}
              >
                <Icon size={20} />
                <div>
                  <div className="alert-card-top">
                    <StatusBadge status={isResolved ? "RESOLVED" : a.level} />
                    <span className="alert-id-code">{a.id}</span>
                  </div>
                  <h2>{a.title}</h2>
                  <p>
                    <b>{a.model}</b> · {a.copy}
                  </p>
                  <div className="alert-meta-line">
                    <span>Confidence: {a.confidence}</span>
                    <span>Deviation: {a.deviation}</span>
                  </div>
                </div>
                <span className="alert-time">
                  {a.time} <ArrowUpRight size={14} />
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Incident Details Pane */}
        <section className="panel alert-detail">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">INCIDENT INVESTIGATION</span>
              <h2>Incident Console — {currentAlert.id}</h2>
            </div>
            <StatusBadge status={resolvedIds.includes(currentAlert.id) ? "RESOLVED" : currentAlert.level} />
          </div>

          <div className="incident-title">
            <ShieldAlert className={currentAlert.level === "CRITICAL" ? "text-red" : "text-amber"} size={32} />
            <div>
              <h2>{currentAlert.title}</h2>
              <p>
                Affected Model: <b>{currentAlert.model}</b> · Detected Aug 21, 2026 at 14:32 IST · First Seen 2m ago
              </p>
            </div>
          </div>

          {/* WHAT CHANGED SECTION */}
          <div className="incident-section">
            <h3>1. WHAT CHANGED? (BEHAVIORAL DELTAS)</h3>
            <div className="incident-score">
              <div>
                <span>Classification Consistency</span>
                <strong className="text-red">↓ 31.0%</strong>
              </div>
              <div>
                <span>Safety Refusal Policy</span>
                <strong className="text-amber">↓ 27.0%</strong>
              </div>
              <div>
                <span>Response Lexical Density</span>
                <strong className="text-red">↓ 22.0%</strong>
              </div>
              <div>
                <span>Confidence Calibration</span>
                <strong className="text-amber">↓ 18.0%</strong>
              </div>
            </div>
          </div>

          {/* EVIDENCE SECTION */}
          <div className="incident-section">
            <h3>2. CRYPTOGRAPHIC EVIDENCE & FINGERPRINT COMPARISON</h3>
            <div className="mini-evidence">
              <div>
                <b>Certified Baseline (v3.2)</b>
                <ModelRadar />
              </div>
              <div>
                <b>Observed Production Output</b>
                <ModelRadar current />
              </div>
            </div>

            <div className="hash">
              <span>SHA-256 EVIDENCE PROOF HASH</span>
              <code>{hash}</code>
            </div>
          </div>

          {/* ROOT CAUSE ANALYSIS SECTION */}
          <div className="incident-section">
            <h3>3. AUTOMATED AI ROOT CAUSE DIAGNOSIS</h3>
            <p className="assessment">
              The production model's output logits, token distributions, and refusal boundaries differ materially from certified baseline signature <code>fp_7a91c4e8b32f</code>.
              High-confidence diagnostics indicate an unannounced proxy model swap or temperature configuration drift.
            </p>
            <div className="cause-list-mini">
              <div className="cause-pill">Model Version Swap at Endpoint — <b>82%</b></div>
              <div className="cause-pill">System Prompt Mismatch — <b>74%</b></div>
              <div className="cause-pill">Endpoint Configuration Change — <b>51%</b></div>
            </div>
          </div>

          {/* RECOMMENDED ACTION & BUTTONS */}
          <div className="incident-section">
            <h3>4. RECOMMENDED ACTION & REMEDIATION</h3>
            <p className="recommendation-text">
              Pause deployment routing immediately and compare production fingerprint with certified v3.2 baseline.
            </p>
            <div className="detail-actions">
              <Button variant="danger" onClick={() => setReportModalOpen(true)}>
                <FileText size={14} /> Generate Incident Report
              </Button>
              <Button variant="secondary" onClick={() => setEvidenceOpen(true)}>
                <Eye size={14} /> View Evidence
              </Button>
              <Button variant="secondary" onClick={() => handleResolve(currentAlert.id)}>
                <Check size={14} /> {resolvedIds.includes(currentAlert.id) ? "Resolved" : "Mark as Resolved"}
              </Button>
            </div>
          </div>
        </section>
      </div>

      <p className="disclaimer">All incidents and evidence shown are verified simulated governance records.</p>
    </AppShell>
  );
}
