"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell";
import { TrustScore, Verified } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import { Sparkles, Check, ChevronDown, Plus, X } from "lucide-react";

export default function Compare() {
  const { modelsList } = useDemo();

  const [selectedIds, setSelectedIds] = useState<string[]>([
    "sentiment-pro",
    "fraudshield",
    "support-gpt",
  ]);

  const handleSelectModel = (index: number, newId: string) => {
    const updated = [...selectedIds];
    updated[index] = newId;
    setSelectedIds(updated);
  };

  const chosenModels = selectedIds.map(
    (id) => modelsList.find((m) => m.id === id) || modelsList[0]
  );

  const metrics = [
    { name: "Trust Score", key: "trust", values: chosenModels.map((m) => m.trust) },
    { name: "Accuracy Benchmark", key: "accuracy", values: chosenModels.map((m) => m.certifiedMetrics.accuracy) },
    { name: "Behavioral Consistency", key: "consistency", values: chosenModels.map((m) => m.certifiedMetrics.consistency) },
    { name: "Robustness Guarantee", key: "robustness", values: chosenModels.map((m) => m.certifiedMetrics.robustness) },
    { name: "Safety Policy Compliance", key: "safety", values: chosenModels.map((m) => m.certifiedMetrics.safety) },
    { name: "Demographic Equity", key: "bias", values: chosenModels.map((m) => m.certifiedMetrics.bias) },
    { name: "Reliability & Uptime", key: "reliability", values: chosenModels.map((m) => m.certifiedMetrics.reliability) },
    { name: "Response Style Anchor", key: "responseStyle", values: chosenModels.map((m) => m.certifiedMetrics.responseStyle) },
  ];

  return (
    <AppShell>
      {/* Page Header */}
      <div className="page-head">
        <div>
          <span className="page-kicker">DECISION INTELLIGENCE</span>
          <h1>Compare Models Before You Deploy</h1>
          <p>Multi-dimensional normalized evidence evaluation for production AI selection.</p>
        </div>
      </div>

      {/* Model Picker Header Columns */}
      <div className="comparison" style={{ gridTemplateColumns: `repeat(${chosenModels.length}, 1fr)` }}>
        {chosenModels.map((m, i) => (
          <div className={i === 0 ? "compare-col recommended" : "compare-col"} key={`${m.id}-${i}`}>
            {i === 0 && (
              <span className="recommend-label">
                <Sparkles size={12} /> BEST FOR YOUR WORKLOAD
              </span>
            )}

            <div className="picker-wrapper">
              <select
                value={m.id}
                onChange={(e) => handleSelectModel(i, e.target.value)}
                className="model-picker-select"
              >
                {modelsList.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name} ({opt.creator})
                  </option>
                ))}
              </select>
            </div>

            <TrustScore score={m.trust} size="lg" />
            {m.verified && <Verified />}

            <div className="compare-facts">
              <span>Latency <b>{m.latency}</b></span>
              <span>Cost/1k <b>{m.cost}</b></span>
              <span>Version <b>{m.version}</b></span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparative Metrics Table */}
      <section className="panel comparison-metrics">
        <h2>Independent Benchmark Matrix</h2>
        {metrics.map((row) => (
          <div className="metric-row" key={row.name} style={{ gridTemplateColumns: `180px repeat(${chosenModels.length}, 1fr)` }}>
            <b>{row.name}</b>
            {row.values.map((v, idx) => (
              <div key={idx} className="metric-bar-cell">
                <div className="metric-bar-bg">
                  <span className="metric-bar-fill" style={{ width: `${v}%` }} />
                </div>
                <strong>{v}%</strong>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* AI Recommendation Card */}
      <section className="why-card">
        <Sparkles size={28} className="text-blue" />
        <div>
          <span className="panel-kicker text-blue">MODELSENTINEL WORKLOAD RECOMMENDATION</span>
          <h2>Why Sentiment Pro for Customer Evaluation?</h2>
          <p>
            <b>Sentiment Pro</b> offers the optimal balance of 96.4% classification accuracy, sub-85ms latency, and lowest cost ($0.002) for high-volume customer feedback analysis.
            While <b>FraudShield</b> scores higher overall in trust (96 vs 94), its specialized financial fraud tuning adds unnecessary inference cost without improving sentiment task performance.
          </p>
        </div>
        <Check size={24} className="text-green ml-auto" />
      </section>
    </AppShell>
  );
}
