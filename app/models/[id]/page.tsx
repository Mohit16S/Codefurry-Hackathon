"use client";

import React, { useState, use } from "react";
import { AppShell } from "@/components/shell";
import { TrustScore, Verified, StatusBadge } from "@/components/ui";
import { ModelRadar } from "@/components/charts";
import { models as defaultModels, hash, ModelVersion } from "@/lib/data";
import { useDemo } from "@/components/demo-provider";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FlaskConical,
  Download,
  CheckCircle2,
  Fingerprint,
  Activity,
  ShieldCheck,
  AlertTriangle,
  History,
  Lock,
  Layers,
  Zap,
} from "lucide-react";

export default function ModelPassportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { modelsList, setReportModalOpen } = useDemo();

  const model = modelsList.find((m) => m.id === id) || defaultModels.find((m) => m.id === id);

  if (!model) notFound();

  const [activeTab, setActiveTab] = useState<
    "overview" | "fingerprint" | "versions" | "safety" | "evidence" | "activity"
  >("overview");

  const [selectedVersion, setSelectedVersion] = useState<ModelVersion>(
    model.versions?.[0] || {
      version: model.version,
      status: "Certified",
      date: model.certDate,
      fingerprintId: model.fingerprintId,
      similarity: 98.7,
      notes: "Current baseline in production",
    }
  );

  return (
    <AppShell>
      {/* Top Breadcrumb & Actions */}
      <div className="passport-back">
        <Link href="/models">
          <ArrowLeft size={14} /> Back to verified registry
        </Link>
        <span>MODEL PASSPORT AUDIT · MS-2026-PASSPORT</span>
      </div>

      {/* Model Passport Hero */}
      <div className="passport-hero">
        <div className="model-icon large">{model.name.slice(0, 2).toUpperCase()}</div>
        <div>
          <div className="passport-title">
            <h1>{model.name}</h1>
            <span className="version-pill">{selectedVersion.version}</span>
            {model.verified ? <Verified /> : <StatusBadge status={model.status} />}
          </div>
          <p>
            by {model.creator} · {model.category} · Provider: <code>{model.provider}</code>
          </p>
          <div className="passport-tags">
            <span>Commercial Use</span>
            <span>API Endpoint Hosted</span>
            <span>Fingerprint Signed</span>
            <span>SHA-256 Audit Trail</span>
          </div>
        </div>
        <div className="passport-actions">
          <button className="button secondary" onClick={() => setReportModalOpen(true)}>
            <Download size={14} /> Export Incident Report
          </button>
          <Link href="/playground" className="button primary">
            <FlaskConical size={14} /> Test in Playground
          </Link>
        </div>
      </div>

      {/* Passport Tabs Navigation */}
      <div className="passport-nav-tabs">
        {(
          [
            ["overview", "Overview & Health"],
            ["fingerprint", "Behavioral Fingerprint"],
            ["versions", "Version Timeline"],
            ["safety", "Safety & Robustness"],
            ["evidence", "Evidence & Audit Log"],
          ] as const
        ).map(([tabKey, label]) => (
          <button
            key={tabKey}
            className={`tab-btn ${activeTab === tabKey ? "active" : ""}`}
            onClick={() => setActiveTab(tabKey)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="tab-content-pane">
          <div className="passport-grid">
            <section className="panel score-panel">
              <div>
                <span className="panel-kicker">INDEPENDENT TRUST RATING</span>
                <h2>Model Trust Profile</h2>
                <p>Empirically evaluated from 12,480 continuous probe checks.</p>
              </div>
              <TrustScore score={model.trust} size="lg" />
              <div className="score-rank">
                <b>Top 8%</b>
                <span>in {model.category} category</span>
              </div>
            </section>

            <section className="panel radar-panel">
              <div className="panel-head">
                <div>
                  <span className="panel-kicker">BEHAVIORAL DIMENSIONS</span>
                  <h2>Baseline Verification Radar</h2>
                </div>
                <span>0 — 100 Index</span>
              </div>
              <ModelRadar />
            </section>
          </div>

          <section className="panel verification">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">VERIFICATION AUDIT REPORT</span>
                <h2>Independent Evaluation Metrics</h2>
              </div>
              <span>Certified {model.certDate}</span>
            </div>

            <div className="verification-grid">
              <div>
                <span>Accuracy</span>
                <strong>{model.accuracy}</strong>
                <small>vs category baseline</small>
              </div>
              <div>
                <span>Behavioral Similarity</span>
                <strong>{selectedVersion.similarity}%</strong>
                <small>vs fingerprint {selectedVersion.fingerprintId}</small>
              </div>
              <div>
                <span>Robustness Score</span>
                <strong>92.4%</strong>
                <small>1,240 adversarial probes</small>
              </div>
              <div>
                <span>Safety Refusal</span>
                <strong>95.8%</strong>
                <small>420 jailbreak patterns</small>
              </div>
              <div>
                <span>P95 Latency</span>
                <strong>{model.latency}</strong>
                <small>p95 response time</small>
              </div>
              <div>
                <span>Cost / Request</span>
                <strong>{model.cost}</strong>
                <small>per 1K tokens</small>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab Content 2: BEHAVIORAL FINGERPRINT */}
      {activeTab === "fingerprint" && (
        <div className="tab-content-pane">
          <section className="panel fingerprint-panel">
            <div className="panel-head">
              <div>
                <span className="panel-kicker font-mono text-blue">BEHAVIORAL FINGERPRINTING</span>
                <h2>Certified Model Cryptographic Signature</h2>
              </div>
              <Fingerprint size={24} className="text-blue" />
            </div>

            <p>
              This visual signature represents the observed behavioral fingerprint across consistency, tone, robustness, safety, and classification boundaries.
            </p>

            <FingerprintViz />

            <div className="fingerprint-id">
              <div>
                <span>FINGERPRINT ID</span>
                <code>{selectedVersion.fingerprintId}</code>
              </div>
              <div>
                <span>SHA-256 BASELINE HASH</span>
                <code>{model.hash}</code>
              </div>
              <StatusBadge status={selectedVersion.status} />
            </div>
          </section>

          <section className="panel mt-4">
            <div className="panel-head">
              <h2>Certified vs Production Fingerprint Overlay</h2>
            </div>
            <ModelRadar dual={true} />
          </section>
        </div>
      )}

      {/* Tab Content 3: VERSION TIMELINE */}
      {activeTab === "versions" && (
        <div className="tab-content-pane">
          <section className="panel versions-timeline-panel">
            <div className="panel-head">
              <div>
                <span className="panel-kicker">VERSION AUDIT TRAIL</span>
                <h2>Model Release History</h2>
              </div>
            </div>

            <div className="version-timeline-list">
              {(model.versions || []).map((ver) => (
                <div
                  key={ver.version}
                  className={`version-card ${selectedVersion.version === ver.version ? "selected" : ""}`}
                  onClick={() => setSelectedVersion(ver)}
                >
                  <div className="version-card-head">
                    <span className="v-num">{ver.version}</span>
                    <StatusBadge status={ver.status} />
                    <span className="v-date">{ver.date}</span>
                  </div>
                  <div className="version-card-body">
                    <p>{ver.notes}</p>
                    <div className="v-meta">
                      <span>Fingerprint: <code>{ver.fingerprintId}</code></span>
                      <span>Baseline Similarity: <b>{ver.similarity}%</b></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Tab Content 4: SAFETY & ROBUSTNESS */}
      {activeTab === "safety" && (
        <div className="tab-content-pane">
          <section className="panel">
            <div className="panel-head">
              <h2>Safety & Adversarial Resistance Audit</h2>
            </div>
            <div className="verification-grid">
              <div>
                <span>Jailbreak Resistance</span>
                <strong>99.4%</strong>
                <small>Passed 420 attack patterns</small>
              </div>
              <div>
                <span>Prompt Injection Block</span>
                <strong>98.9%</strong>
                <small>Zero system prompt leaks</small>
              </div>
              <div>
                <span>Demographic Parity</span>
                <strong>94.2%</strong>
                <small>Tested across 12 cohorts</small>
              </div>
              <div>
                <span>Toxic Payload Refusal</span>
                <strong>100%</strong>
                <small>Policy compliance guaranteed</small>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Tab Content 5: EVIDENCE */}
      {activeTab === "evidence" && (
        <div className="tab-content-pane">
          <section className="panel">
            <div className="panel-head">
              <h2>Cryptographic SHA-256 Verification Evidence</h2>
            </div>
            <div className="hash">
              <span>SHA-256 BASELINE PROOF HASH</span>
              <code>{model.hash}</code>
            </div>
            <p className="color-muted font-sm">
              All baseline measurements are hashed and verified against the ModelSentinel immutable governance ledger.
            </p>
          </section>
        </div>
      )}

      <p className="disclaimer">
        ModelPassport details contain continuous evaluation audit scores verified by Sentinel security engine.
      </p>
    </AppShell>
  );
}

function FingerprintViz() {
  return (
    <div className="fp-viz">
      <svg viewBox="0 0 700 220">
        <defs>
          <linearGradient id="fp" x1="0" x2="1">
            <stop stopColor="#1677FF" />
            <stop offset="1" stopColor="#2196FF" />
          </linearGradient>
        </defs>
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={i}
            d={`M20 ${20 + i * 18} C 130 ${10 + i * 27}, 180 ${210 - i * 13}, 300 ${40 + i * 10} S 510 ${180 - i * 12}, 680 ${24 + i * 17}`}
          />
        ))}
        <line x1="350" y1="0" x2="350" y2="220" />
      </svg>
      <span>CERTIFIED FINGERPRINT SIGNATURE</span>
    </div>
  );
}
