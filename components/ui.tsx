"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, ShieldCheck, X, Info, HelpCircle, ArrowUpRight, ShieldAlert, Radio } from "lucide-react";
import { useDemo } from "./demo-provider";
import { trustBreakdown } from "@/lib/data";

export function DemoBadge() {
  return <span className="demo-badge">SIMULATED DEMO ENVIRONMENT</span>;
}

export function StatusBadge({ status }: { status: string }) {
  const isCritical = /Critical|Drift/.test(status);
  const isHighRisk = /High Risk|Degraded/.test(status);
  const isWarn = /Monitoring|Review|Warning/.test(status);

  let className = "status safe";
  let Icon = CheckCircle2;

  if (isCritical) {
    className = "status danger critical-pulse";
    Icon = ShieldAlert;
  } else if (isHighRisk) {
    className = "status danger";
    Icon = AlertTriangle;
  } else if (isWarn) {
    className = "status warn";
    Icon = Radio;
  }

  return (
    <span className={className}>
      <Icon size={12} />
      {status}
    </span>
  );
}

export function TrustScore({ score = 94, size = "lg", onClick }: { score?: number; size?: "sm" | "lg" | "xl"; onClick?: () => void }) {
  const { setTrustModalOpen } = useDemo();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setTrustModalOpen(true);
    }
  };

  return (
    <div
      className={`trust ${size} clickable`}
      style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}
      onClick={handleClick}
      title="Click to view Trust Score Calculation Breakdown"
    >
      <div>
        <strong>{score}</strong>
        {size !== "sm" && <small>/100</small>}
      </div>
    </div>
  );
}

export function TrustScoreModal() {
  const { trustModalOpen, setTrustModalOpen } = useDemo();

  if (!trustModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={() => setTrustModalOpen(false)}>
        <motion.div
          className="modal-card trust-modal"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="report-badge">
              <ShieldCheck className="text-blue" size={16} />
              <span>TRUST SCORE METHODOLOGY & AUDIT</span>
            </div>
            <button className="icon-btn" onClick={() => setTrustModalOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="trust-modal-body">
            <div className="trust-overview">
              <div className="trust-score-hero">
                <TrustScore score={94} size="xl" />
                <div>
                  <span className="trust-status-tag">STATUS: TRUSTED</span>
                  <h2>94 / 100 Overall AI Trust Score</h2>
                  <p>Calculated from 12,480 continuous independent behavioral probes executed across 7 core security dimensions.</p>
                </div>
              </div>
            </div>

            <h3>Dimension Weighting & Empirical Scores</h3>
            <div className="trust-dimensions-list">
              {trustBreakdown.map((item) => (
                <div key={item.metric} className="dimension-row">
                  <div className="dimension-meta">
                    <strong>{item.metric}</strong>
                    <span>Weight: <b>{item.weight}</b></span>
                  </div>
                  <p>{item.description}</p>
                  <div className="dimension-bar-wrap">
                    <div className="dimension-bar" style={{ width: `${item.score}%` }} />
                    <span className="dimension-score">{item.score}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="trust-audit-info">
              <Info size={16} className="text-blue" />
              <div>
                <strong>How is this calculated?</strong>
                <p>
                  The AI Trust Score is an aggregated weighted index normalized across accuracy benchmarks, prompt injection vulnerability scans, demographic bias parity, and P95 latency distributions over the past 30 rolling days.
                </p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="button primary w-full" onClick={() => setTrustModalOpen(false)}>
              Close Breakdown
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function ToastContainer() {
  const { toasts, removeToast } = useDemo();

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className={`toast toast-${toast.type || "info"}`}
          >
            <div className="toast-icon">
              {toast.type === "error" && <AlertTriangle className="text-red" size={18} />}
              {toast.type === "warning" && <AlertTriangle className="text-amber" size={18} />}
              {toast.type === "success" && <CheckCircle2 className="text-green" size={18} />}
              {(!toast.type || toast.type === "info") && <Info className="text-blue" size={18} />}
            </div>
            <div className="toast-content">
              <strong>{toast.title}</strong>
              <p>{toast.copy}</p>
            </div>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  icon,
  onClick,
}: {
  label: string;
  value: string;
  detail: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} className={`metric-card ${onClick ? "clickable" : ""}`} onClick={onClick}>
      <div className="metric-head">
        <span>{label}</span>
        {icon}
      </div>
      <strong>{value}</strong>
      <small>{detail}</small>
    </motion.div>
  );
}

export function Button({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "ghost" }) {
  return (
    <button className={`button ${variant}`} {...props}>
      {children}
    </button>
  );
}

export function SectionTitle({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) {
  return (
    <div className="section-title">
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export function Verified() {
  return (
    <span className="verified">
      <ShieldCheck size={13} /> Independently verified
    </span>
  );
}
