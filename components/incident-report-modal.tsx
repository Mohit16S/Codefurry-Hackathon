"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ShieldAlert, CheckCircle2, AlertTriangle, FileText, Printer, FileDown } from "lucide-react";
import { useDemo } from "./demo-provider";
import { hash } from "@/lib/data";

export function IncidentReportModal() {
  const { reportModalOpen, setReportModalOpen, addToast } = useDemo();

  if (!reportModalOpen) return null;

  const handlePrint = () => {
    addToast("Exporting Report", "AI Incident Report opened for printing / PDF export.", "success");
    window.print();
  };

  const handleDownloadJSON = () => {
    const reportData = {
      reportId: "MS-INC-2026-8821",
      generatedAt: "Aug 21, 2026 · 14:35:12 IST",
      title: "AI Model Behavioral Deviation Audit",
      executiveSummary:
        "ModelSentinel Continuous Verification detected a critical behavioral drift event in Sentiment Pro (v3.2). Observed behavioral similarity dropped from 98.7% to 58.3% (a 41.7% net deviation from certified baseline fp_7a91c4e8b32f).",
      model: {
        identifier: "Sentiment Pro",
        certifiedVersion: "v3.2",
        endpoint: "api.neuralforge.ai/v3/eval",
        baselineHash: hash,
        status: "CRITICAL DRIFT",
      },
      deviations: [
        { dimension: "Behavioral Similarity", baseline: "98.7%", observed: "58.3%", deviation: "-40.4%", impact: "CRITICAL" },
        { dimension: "Classification Consistency", baseline: "99.1%", observed: "61.4%", deviation: "-37.7%", impact: "HIGH" },
        { dimension: "Safety Refusal Policy", baseline: "96.5%", observed: "78.0%", deviation: "-18.5%", impact: "WARNING" },
        { dimension: "Response Style & Tone", baseline: "95.0%", observed: "55.0%", deviation: "-40.0%", impact: "HIGH" },
        { dimension: "P95 Latency", baseline: "83ms", observed: "245ms", deviation: "+162ms", impact: "MODERATE" },
      ],
      signature: "SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ModelSentinel_Audit_MS-INC-2026-8821.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast("Report Downloaded", "ModelSentinel Audit Report saved to your downloads.", "success");
  };

  const handleDownloadPackage = () => {
    const packageData = {
      packageId: "MS-PKG-2026-8821",
      certifiedModel: "Sentiment Pro v3.2",
      signatureHash: hash,
      evidenceFiles: [
        "behavioral_fingerprint.json",
        "probe_suite_results.csv",
        "sha256_verification_ledger.sig",
      ],
      verifiedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(packageData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ModelSentinel_Evidence_Package_MS-INC-2026-8821.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast("Package Downloaded", "Cryptographic Evidence Package downloaded.", "success");
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={() => setReportModalOpen(false)}>
        <motion.div
          className="modal-card incident-report-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="report-badge">
              <FileText size={16} />
              <span>SECURITY INCIDENT AUDIT REPORT</span>
            </div>
            <div className="modal-actions">
              <button className="button secondary sm" onClick={handleDownloadJSON}>
                <FileDown size={14} /> Download Report (.JSON)
              </button>
              <button className="button secondary sm" onClick={handlePrint}>
                <Printer size={14} /> Print / Export PDF
              </button>
              <button className="icon-btn" onClick={() => setReportModalOpen(false)}>
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="report-content">
            <div className="report-title-block">
              <div className="title-meta">
                <span className="report-id">INCIDENT ID: MS-INC-2026-8821</span>
                <span className="report-date">Generated: Aug 21, 2026 · 14:35:12 IST</span>
              </div>
              <h1>AI Model Behavioral Deviation Audit</h1>
              <p>Independent security assessment and forensic baseline comparison.</p>
            </div>

            <div className="report-section summary-box">
              <div className="section-head">
                <ShieldAlert className="text-red" size={18} />
                <h3>1. EXECUTIVE SUMMARY</h3>
              </div>
              <p>
                On <b>August 21, 2026 at 14:32 IST</b>, ModelSentinel Continuous Verification detected a critical behavioral drift event in <b>Sentiment Pro (v3.2)</b>.
                Observed behavioral similarity dropped from <b>98.7% to 58.3%</b> (a 41.7% net deviation from certified baseline <code>fp_7a91c4e8b32f</code>).
                Forensic analysis indicates an unannounced production model swap or proxy endpoint misconfiguration.
              </p>
            </div>

            <div className="report-grid-2">
              <div className="report-section">
                <h3>2. AFFECTED MODEL & ENDPOINT</h3>
                <table className="report-table">
                  <tbody>
                    <tr><td>Model Identifier</td><td><strong>Sentiment Pro</strong></td></tr>
                    <tr><td>Certified Version</td><td><strong>v3.2</strong></td></tr>
                    <tr><td>Production Endpoint</td><td><code>api.neuralforge.ai/v3/eval</code></td></tr>
                    <tr><td>Certified Baseline Hash</td><td><code>{hash.slice(0, 16)}...</code></td></tr>
                    <tr><td>Provider / Host</td><td>NeuralForge Managed Cloud</td></tr>
                    <tr><td>Security Status</td><td><span className="status danger">CRITICAL DRIFT</span></td></tr>
                  </tbody>
                </table>
              </div>

              <div className="report-section">
                <h3>3. INCIDENT TIMELINE</h3>
                <div className="timeline-list">
                  <div className="tl-item">
                    <span className="tl-time">14:30:00</span>
                    <p>Routine probe suite execution (12,480 dimensions) passed with 98.7% similarity.</p>
                  </div>
                  <div className="tl-item warning">
                    <span className="tl-time">14:32:01</span>
                    <p>Endpoint HTTP headers changed. Classification consistency dropped to 61.4%.</p>
                  </div>
                  <div className="tl-item critical">
                    <span className="tl-time">14:32:07</span>
                    <p>Critical Drift Alert MS-ALT-8821 triggered. Similarity confirmed at 58.3%.</p>
                  </div>
                  <div className="tl-item">
                    <span className="tl-time">14:35:12</span>
                    <p>Incident report compiled and evidence package cryptographically signed.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-section">
              <h3>4. BEHAVIORAL METRIC DEVIATION SUMMARY</h3>
              <table className="report-metric-table">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Certified Baseline</th>
                    <th>Observed Production</th>
                    <th>Deviation</th>
                    <th>Risk Impact</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Behavioral Similarity</td>
                    <td>98.7%</td>
                    <td className="text-red">58.3%</td>
                    <td className="text-red">−40.4%</td>
                    <td><span className="status danger">CRITICAL</span></td>
                  </tr>
                  <tr>
                    <td>Classification Consistency</td>
                    <td>99.1%</td>
                    <td className="text-red">61.4%</td>
                    <td className="text-red">−37.7%</td>
                    <td><span className="status danger">HIGH</span></td>
                  </tr>
                  <tr>
                    <td>Safety Refusal Policy</td>
                    <td>96.5%</td>
                    <td className="text-amber">78.0%</td>
                    <td className="text-amber">−18.5%</td>
                    <td><span className="status warn">WARNING</span></td>
                  </tr>
                  <tr>
                    <td>Response Style & Tone</td>
                    <td>95.0%</td>
                    <td className="text-red">55.0%</td>
                    <td className="text-red">−40.0%</td>
                    <td><span className="status danger">HIGH</span></td>
                  </tr>
                  <tr>
                    <td>P95 Latency</td>
                    <td>83ms</td>
                    <td className="text-amber">245ms</td>
                    <td className="text-amber">+162ms</td>
                    <td><span className="status warn">MODERATE</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="report-section">
              <h3>5. AI ROOT CAUSE DIAGNOSIS</h3>
              <div className="cause-list">
                <div className="cause-card">
                  <div className="cause-prob">82%</div>
                  <div>
                    <strong>Model/Version Swap at Endpoint</strong>
                    <p>Output logits and token distributions match lightweight model architecture (Lite Model v0.8) rather than certified v3.2 weights.</p>
                  </div>
                </div>
                <div className="cause-card">
                  <div className="cause-prob">74%</div>
                  <div>
                    <strong>System Prompt / Parameter Mismatch</strong>
                    <p>Temperature parameter appears elevated from certified 0.2 to ~0.7, causing severe output variance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-section recommendation-box">
              <h3>6. RECOMMENDED REMEDIATION ACTIONS</h3>
              <ol className="remediation-steps">
                <li><b>IMMEDIATE:</b> Rollback production traffic from current endpoint to certified baseline snapshot <code>v3.2</code>.</li>
                <li><b>FORENSIC:</b> Require model vendor (NeuralForge) to re-verify cryptographic SHA-256 payload signatures.</li>
                <li><b>COMPLIANCE:</b> Log incident ID <code>MS-INC-2026-8821</code> in enterprise AI governance ledger.</li>
              </ol>
            </div>
          </div>

          <div className="modal-footer">
            <button className="button secondary" onClick={() => setReportModalOpen(false)}>
              Close
            </button>

            <button className="button secondary" onClick={handleDownloadJSON}>
              <FileDown size={14} /> Download Report (.JSON)
            </button>

            <button className="button primary" onClick={handleDownloadPackage}>
              <Download size={14} /> Download Cryptographic Evidence Package (.ZIP)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
