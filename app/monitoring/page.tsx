"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell";
import { Button, StatusBadge } from "@/components/ui";
import { DriftChart, ModelRadar } from "@/components/charts";
import { healthyChart, driftChart, hash, rootCauseAnalysis, businessImpact } from "@/lib/data";
import { useDemo } from "@/components/demo-provider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Radio,
  ShieldCheck,
  AlertTriangle,
  Eye,
  BellRing,
  X,
  ArrowRight,
  CheckCircle2,
  Server,
  Search,
  RotateCcw,
  FileText,
  GitCompare,
  Sliders,
  ShieldAlert,
  Download,
  Info,
  IndianRupee,
  UsersRound,
  Gauge,
} from "lucide-react";
import Link from "next/link";

export default function Monitoring() {
  const { stage, setStage, drifted, setDrifted, evidenceOpen, setEvidenceOpen, setReportModalOpen, simulateSwap, restoreModel, addToast } = useDemo();

  const isCritical = stage === "alert" || drifted;

  return (
    <AppShell>
      {/* Top Header */}
      <div className="page-head">
        <div>
          <span className="page-kicker">CONTINUOUS VERIFICATION ENGINE</span>
          <h1>Drift Sentinel</h1>
          <p>Real-time continuous verification of production model endpoints against certified baselines.</p>
        </div>
        <div className={isCritical ? "overall danger" : "overall"}>
          <i />
          {isCritical ? "CRITICAL DRIFT DETECTED" : "ALL SYSTEMS OPERATIONAL"}
        </div>
      </div>

      <AnimatePresence>
        {(stage === "changed" || stage === "probing") && (
          <motion.section className="swap-sequence" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .98 }}>
            <div className="sequence-head"><span className="spinner"/><div><span>LIVE VERIFICATION SEQUENCE</span><h2>{stage === "changed" ? "Production endpoint version changed" : "Re-running certified probe suite"}</h2></div><b>{stage === "changed" ? "STAGE 1 / 3" : "STAGE 2 / 3"}</b></div>
            <div className="sequence-steps">
              {["Classification", "Robustness", "Safety", "Response consistency", "Behavioral fingerprint"].map((item,index)=><div className={stage === "probing" || index < 2 ? "complete" : ""} key={item}>{stage === "probing" || index < 2 ? <CheckCircle2/> : <span/>}<b>{item}</b><small>{stage === "probing" || index < 2 ? "Probe complete" : "Queued"}</small></div>)}
            </div>
            <div className="similarity-drop"><span>98.7%</span><ArrowRight/><span>94.2%</span><ArrowRight/><span>88.1%</span><ArrowRight/><span>74.5%</span><ArrowRight/><strong>58.3%</strong></div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Dynamic Status Banner */}
      <section className={isCritical ? "monitor-status critical" : "monitor-status"}>
        <div>
          <span className="status-orb">
            {isCritical ? <AlertTriangle className="text-red" size={24} /> : <ShieldCheck className="text-green" size={24} />}
          </span>
          <div>
            <span>PRODUCTION ENDPOINT HEALTH</span>
            <h2>{isCritical ? "BEHAVIORAL DRIFT DETECTED" : "MODEL HEALTHY & VERIFIED"}</h2>
            <p>
              Sentiment Pro (v3.2) · Endpoint <code>api.neuralforge.ai/v3/eval</code> ·{" "}
              <b>{isCritical ? "Deviation exceeds threshold — action required" : "Live 24/7 probe monitoring active"}</b>
            </p>
          </div>
        </div>

        <div className="similarity">
          <span>BEHAVIORAL SIMILARITY</span>
          <strong>
            {isCritical ? "58.3" : "98.7"}
            <small>%</small>
          </strong>
          <em>{isCritical ? "−40.4% from baseline (>95%)" : "+0.2% variance within tolerance"}</em>
        </div>
      </section>

      {/* Drift Comparison Chart Panel */}
      <section className="panel chart-panel">
        <div className="panel-head">
          <div>
            <span className="panel-kicker">LIVE BEHAVIORAL SIGNAL vs CERTIFIED BASELINE</span>
            <h2>Certified Baseline vs Current Production Behavior</h2>
          </div>
          <div className="metrics-chip-row">
            <span className="chip active">Behavioral Similarity</span>
            <span className="chip">Classification Consistency</span>
            <span className="chip">Response Style</span>
            <span className="chip">Safety & Robustness</span>
          </div>
        </div>

        <DriftChart data={isCritical ? driftChart : healthyChart} danger={isCritical} showRanges={true} />
      </section>

      {/* Critical Alert & Deviation Callout Box */}
      <AnimatePresence>
        {isCritical && (
          <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="drift-alert">
            <div className="alert-icon">
              <ShieldAlert size={28} />
            </div>

            <div className="alert-main">
              <span className="alert-code">CRITICAL SIGNAL · MS-ALT-8821 · DETECTED 2 MINUTES AGO</span>
              <h2>Behavioral Deviation Detected: Possible Model Swap</h2>
              <p>
                Model behavior has deviated <b>41.7%</b> from its certified baseline signature (<code>fp_7a91c4e8b32f</code>).
                Classification boundaries and response distributions match an uncertified lightweight architecture.
              </p>

              {/* Exact Metrics Box */}
              <div className="deviation-callout-grid">
                <div className="dev-box">
                  <span>EXPECTED SIMILARITY</span>
                  <strong>&gt; 95%</strong>
                </div>
                <div className="dev-box">
                  <span>CURRENT SIMILARITY</span>
                  <strong className="text-red">58.3%</strong>
                </div>
                <div className="dev-box">
                  <span>DEVIATION</span>
                  <strong className="text-red">41.7%</strong>
                </div>
                <div className="dev-box">
                  <span>RISK LEVEL</span>
                  <span className="status danger">CRITICAL</span>
                </div>
              </div>
            </div>

            <div className="alert-actions-panel">
              <Button variant="danger" onClick={() => setReportModalOpen(true)}>
                <FileText size={14} /> Generate Incident Report
              </Button>
              <Button variant="secondary" onClick={() => setEvidenceOpen(true)}>
                <Eye size={14} /> View Cryptographic Evidence
              </Button>
              <Link href="/compare">
                <Button variant="secondary">
                  <GitCompare size={14} /> Compare Versions
                </Button>
              </Link>
              <Button variant="secondary" onClick={restoreModel}>
                <RotateCcw size={14} /> Rollback to v3.2
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* WHY DID THIS HAPPEN? Root Cause Analysis (Major Feature) */}
      {isCritical && (
        <section className="panel root-cause-panel">
          <div className="panel-head">
            <div>
              <span className="panel-kicker font-mono text-red">DIAGNOSTIC ENGINE</span>
              <h2>"WHY DID THIS HAPPEN?" — AI Root Cause Analysis</h2>
            </div>
            <span className="status danger">CONFIDENCE RATING: HIGH (94%)</span>
          </div>

          <div className="rca-summary-box">
            <p>
              Behavioral deviation increased <b>41.7%</b> immediately after the latest deployment sequence at 14:32:01 IST.
              ModelSentinel automated probe forensics identified 5 contributing factors:
            </p>
          </div>

          <div className="causes-confidence-grid">
            {rootCauseAnalysis.causes.map((c) => (
              <div key={c.cause} className="cause-bar-card">
                <div className="cause-card-head">
                  <strong>{c.cause}</strong>
                  <span className="cause-pct">{c.confidence}% Confidence</span>
                </div>
                <div className="cause-bar-track">
                  <div
                    className={`cause-bar-fill ${c.confidence > 70 ? "bg-red" : c.confidence > 40 ? "bg-amber" : "bg-blue"}`}
                    style={{ width: `${c.confidence}%` }}
                  />
                </div>
                <div className="cause-card-foot">
                  <small>{c.status}</small>
                  {c.verified && <span className="verified-tag">✔ Evidence Verified</span>}
                </div>
              </div>
            ))}
          </div>

          {/* RECOMMENDED ACTION CARD */}
          <div className="recommendation-action-banner">
            <div className="rec-icon">
              <ShieldCheck size={24} className="text-green" />
            </div>
            <div className="rec-text">
              <span>RECOMMENDED ACTION</span>
              <h3>Pause deployment and compare production fingerprint with certified v3.2 baseline.</h3>
              <p>Restoring traffic to endpoint snapshot <code>v3.2</code> will immediately resolve production risk.</p>
            </div>
            <div className="rec-buttons">
              <Button variant="danger" onClick={restoreModel}>
                <RotateCcw size={14} /> Rollback Now
              </Button>
              <Button variant="secondary" onClick={() => setReportModalOpen(true)}>
                <FileText size={14} /> Export Report
              </Button>
            </div>
          </div>
        </section>
      )}

      {isCritical && (
        <section className="business-impact-panel">
          <div className="business-impact-copy"><span className="panel-kicker">DEMO ESTIMATE · BUSINESS IMPACT</span><h2>Technical drift is now operational exposure.</h2><p>Estimated from affected traffic volume and the observed classification consistency drop. This is a simulated scenario, not a financial prediction.</p></div>
          <div className="impact-metrics">
            <div><AlertTriangle/><span>Risk level</span><strong>{businessImpact.riskLevel}</strong></div>
            <div><UsersRound/><span>Affected requests</span><strong>{businessImpact.affectedRequests.toLocaleString()}</strong></div>
            <div><Gauge/><span>Potential incorrect responses</span><strong>~{businessImpact.potentialIncorrectResponses.toLocaleString()}</strong></div>
            <div><IndianRupee/><span>Estimated exposure</span><strong>{businessImpact.estimatedExposure}</strong></div>
            <div><ShieldAlert/><span>SLA risk</span><strong>{businessImpact.slaRisk}</strong></div>
          </div>
        </section>
      )}

      {/* Streaming Probes & Demo Control */}
      <div className="monitor-lower">
        <section className="panel live-probes">
          <div className="panel-head">
            <div>
              <span className="panel-kicker">STREAMING AUDIT LOG</span>
              <h2>Live Probe Stream</h2>
            </div>
            <span className="live">
              <i /> LIVE
            </span>
          </div>

          {[
            ["14:32:01", "Routine classification test", "98.7%"],
            ["14:32:04", "Robustness & typo test", "97.9%"],
            ["14:32:07", "Behavioral similarity scan", isCritical ? "61.4%" : "98.4%"],
            ["14:32:10", "Classification consistency probe", isCritical ? "58.3%" : "98.9%"],
            ["14:32:14", "Safety refusal policy check", isCritical ? "78.0%" : "96.5%"],
          ].map((r, i) => (
            <div className={isCritical && i > 1 ? "probe failed" : "probe"} key={r[0]}>
              <span>{r[0]}</span>
              <i>{isCritical && i > 1 ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}</i>
              <div>
                <b>Sentiment Pro</b>
                <small>{r[1]}</small>
              </div>
              <strong>{r[2]}</strong>
            </div>
          ))}
        </section>

        <section className="panel demo-control">
          <span className="panel-kicker">HACKATHON DEMO CONTROLLER</span>
          <h2>Simulate a Silent Model Swap</h2>
          <p>Secretly switch the production endpoint to a weaker uncertified model and watch ModelSentinel detect it.</p>

          <div className="swap-diagram">
            <span>
              Sentiment Pro v3.2
              <small>CERTIFIED (98.7%)</small>
            </span>
            <ArrowRight size={16} />
            <span className="weak">
              Lite Model v0.8
              <small>UNVERIFIED (58.3%)</small>
            </span>
          </div>

          <Button
            variant={isCritical ? "secondary" : "danger"}
            onClick={isCritical ? restoreModel : simulateSwap}
          >
            {isCritical ? (
              <>
                <RotateCcw size={14} /> Restore Certified Baseline (v3.2)
              </>
            ) : (
              <>
                <Radio size={14} /> Simulate Model Swap
              </>
            )}
          </Button>

          <small>No real endpoint is changed. This runs locally inside the demo state.</small>
        </section>
      </div>

      {/* Evidence Drawer Modal */}
      <EvidenceDrawer open={evidenceOpen} close={() => setEvidenceOpen(false)} />
    </AppShell>
  );
}

function EvidenceDrawer({ open, close }: { open: boolean; close: () => void }) {
  const { setReportModalOpen, addToast } = useDemo();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} />
          <motion.aside className="evidence" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}>
            <div className="evidence-head">
              <div>
                <span className="font-mono text-red">CRYPTOGRAPHIC FORENSICS</span>
                <h2>Fingerprint Deviation Evidence</h2>
              </div>
              <button className="icon-btn" onClick={close}>
                <X size={16} />
              </button>
            </div>
            <p>Captured Aug 21, 2026 at 14:32:07 IST · Signed evidence package</p>

            <div className="evidence-radars">
              <div>
                <b>Certified Baseline (v3.2)</b>
                <ModelRadar />
              </div>
              <div>
                <b>Current Production Output</b>
                <ModelRadar current />
              </div>
            </div>

            <div className="evidence-score">
              <span>Behavioral Similarity</span>
              <strong>58.3%</strong>
              <div>
                <small>Expected threshold: <b>&gt;95.0%</b></small>
                <small>Observed similarity: <b>58.3%</b></small>
              </div>
            </div>

            <h3>Observed Metric Failures</h3>
            {[
              ["Behavioral Consistency", "−40.4%"],
              ["Classification Boundaries", "−37.7%"],
              ["Response Lexical Density", "−40.0%"],
              ["Safety Refusal Policy", "−18.5%"],
            ].map(([metric, dev]) => (
              <div className="failure" key={metric}>
                <AlertTriangle size={14} className="text-red" />
                <span>{metric}</span>
                <b className="text-red">{dev}</b>
              </div>
            ))}

            <div className="hash">
              <span>CRYPTOGRAPHIC EVIDENCE HASH · SHA-256</span>
              <code>{hash}</code>
            </div>

            <div className="evidence-actions">
              <Button
                variant="primary"
                onClick={() => {
                  close();
                  setReportModalOpen(true);
                }}
              >
                <FileText size={14} /> Open Full Incident Audit Report
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
