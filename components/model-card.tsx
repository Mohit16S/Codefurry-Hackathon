"use client";

import Link from "next/link";
import { ArrowUpRight, Zap, ShieldCheck, Fingerprint, Activity, GitCompare } from "lucide-react";
import { Model } from "@/lib/data";
import { TrustScore, Verified, StatusBadge } from "./ui";

export function ModelCard({ model }: { model: Model }) {
  return (
    <article className="model-card">
      <div className="model-top">
        <div className="model-icon">{model.name.slice(0, 2).toUpperCase()}</div>
        <div className="model-name-group">
          <h3>
            {model.name} <span className="version-pill">{model.version}</span>
          </h3>
          <p>by {model.creator}</p>
        </div>
        <TrustScore score={model.trust} size="sm" />
      </div>

      <div className="card-sub-info">
        <span className="category">{model.category}</span>
        <span className="fingerprint-tag">
          <Fingerprint size={10} /> {model.fingerprintId}
        </span>
      </div>

      <div className="model-metrics">
        <div>
          <small>Accuracy</small>
          <strong>{model.accuracy}</strong>
        </div>
        <div>
          <small>Latency</small>
          <strong>{model.latency}</strong>
        </div>
        <div>
          <small>Per request</small>
          <strong>{model.cost}</strong>
        </div>
      </div>

      <div className="card-status-row">
        {model.verified ? <Verified /> : <StatusBadge status={model.status} />}
        <span className={`risk-tag risk-${model.riskLevel.toLowerCase().replace(" ", "-")}`}>
          {model.riskLevel} Risk
        </span>
      </div>

      <div className="card-actions">
        <Link className="button secondary sm" href={`/models/${model.id}`}>
          Passport <ArrowUpRight size={13} />
        </Link>
        <Link className="button ghost sm" href="/playground">
          <Zap size={13} /> Test
        </Link>
        <Link className="button ghost sm" href="/compare">
          <GitCompare size={13} /> Compare
        </Link>
      </div>
    </article>
  );
}
