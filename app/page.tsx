"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Fingerprint,
  Radar,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Cpu,
  Database,
  Sparkles,
  AlertTriangle,
  FileText,
  Play,
  RotateCcw,
  Check,
  XCircle,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { Button, DemoBadge, SectionTitle, TrustScore } from "@/components/ui";
import { TrustCore3D } from "@/components/landing/TrustCore3D";

// Reusable CountUp Numeric Component
function CountUpNumber({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const totalSteps = 30;
    const stepTime = (duration * 1000) / totalSteps;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Landing() {
  const [simulatedDrift, setSimulatedDrift] = useState(false);
  const [similarityScore, setSimilarityScore] = useState(98.7);
  const [activeScanIndex, setActiveScanIndex] = useState(0);
  const [typedHash, setTypedHash] = useState("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");

  // Simulated Drift Countdown Animation
  const handleToggleDrift = (isDrift: boolean) => {
    setSimulatedDrift(isDrift);
    if (isDrift) {
      setSimilarityScore(98.7);
      setTimeout(() => setSimilarityScore(94.2), 300);
      setTimeout(() => setSimilarityScore(86.7), 600);
      setTimeout(() => setSimilarityScore(71.4), 900);
    } else {
      setSimilarityScore(98.7);
    }
  };

  const scanMetrics = [
    { name: "Prompt Injection Resistance", score: "99.4%", status: "PASS" },
    { name: "Safety & Refusal Policy", score: "98.7%", status: "PASS" },
    { name: "Demographic Bias Consistency", score: "96.2%", status: "PASS" },
    { name: "Hallucination Boundary", score: "97.5%", status: "PASS" },
    { name: "P95 Latency SLA", score: "83ms", status: "PASS" },
  ];

  // Framer Motion Hero Load Variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="landing-v3">
      {/* Sticky Glass Navbar */}
      <motion.nav
        className="landing-nav-v3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Brand />
        <div className="navlinks">
          <a href="#verify">Verify</a>
          <a href="#fingerprint">Fingerprint</a>
          <a href="#drift">Drift Sentinel</a>
          <Link href="/models">Model Registry</Link>
        </div>
        <div className="landing-nav-actions">
          <Link className="button ghost" href="/login">
            Sign in
          </Link>
          <Link className="button primary" href="/signup">
            Create Account <ArrowRight size={14} className="arrow-icon" />
          </Link>
        </div>
      </motion.nav>

      {/* HERO SECTION — 3D AI TRUST CORE WITH STAGGERED ENTRANCE */}
      <section className="hero-v3">
        <div className="hero-glow-v3" />

        {/* Left Column: Story Copy & CTAs */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="show"
          className="hero-copy-v3"
        >
          <motion.div variants={heroItemVariants} className="brand-badge-pill mb-2">
            <ShieldCheck size={14} className="text-blue" />
            <span>AI MODEL TRUST INFRASTRUCTURE</span>
          </motion.div>

          <motion.h1 variants={heroItemVariants} className="hero-title-v3">
            Trust what your AI is <span className="text-gradient">actually doing.</span>
          </motion.h1>

          <motion.p variants={heroItemVariants} className="hero-subtitle-v3">
            ModelSentinel independently verifies AI models, fingerprints their behavior, and continuously monitors production endpoints for silent changes.
          </motion.p>

          <motion.div variants={heroItemVariants} className="hero-actions-v3">
            <Link className="button primary large" href="/dashboard">
              Open Command Center <ArrowRight size={16} className="arrow-icon" />
            </Link>
            <Link className="button secondary large" href="/monitoring">
              <Activity size={16} /> See drift detection
            </Link>
          </motion.div>

          {/* Integrated Hero Stats Bar with Hover & Entry Animations */}
          <motion.div variants={heroItemVariants} className="hero-stats-row-v3">
            <motion.div whileHover={{ y: -3 }} className="hero-stat-card animated-box">
              <strong>
                <CountUpNumber target={12} />
              </strong>
              <span>MODELS MONITORED</span>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} className="hero-stat-card animated-box">
              <strong className="text-green">
                <CountUpNumber target={94} />/100
              </strong>
              <span>TRUST SCORE</span>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} className="hero-stat-card animated-box">
              <strong>SHA-256</strong>
              <span>EVIDENCE LEDGER</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive 3D AI Trust Core Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-3d-stage"
        >
          {/* 3D Canvas Core */}
          <TrustCore3D />

          {/* 4 Off-Sync Floating Telemetry UI Cards around 3D Core with Hover Lift */}
          <motion.div whileHover={{ scale: 1.05 }} className="telemetry-card card-top-left float-card-1">
            <div className="tel-head">
              <ShieldCheck size={13} className="text-green" />
              <span>BEHAVIORAL TRUST</span>
            </div>
            <strong>94 / 100</strong>
            <span className="badge-pass">● TRUSTED</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="telemetry-card card-top-right float-card-2">
            <div className="tel-head">
              <Activity size={13} className="text-blue" />
              <span>BEHAVIORAL DRIFT</span>
            </div>
            <strong>0.8%</strong>
            <span className="badge-pass">● NORMAL</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="telemetry-card card-bottom-left float-card-3">
            <div className="tel-head">
              <Radar size={13} className="text-purple" />
              <span>MODEL STATUS</span>
            </div>
            <strong>v3.4.2 Baseline</strong>
            <span className="badge-pass">● MONITORING</span>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="telemetry-card card-bottom-right float-card-4">
            <div className="tel-head">
              <Fingerprint size={13} className="text-green" />
              <span>SHA-256 FINGERPRINT</span>
            </div>
            <code>fp_7a91c4e8b32f</code>
            <span className="badge-pass">● CERTIFIED</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Workflow Connector Line */}
      <div className="workflow-line-connector" />

      {/* 3D SECTION 1: VERIFY */}
      <motion.section
        className="section-story"
        id="verify"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle
          eyebrow="01 · VERIFY"
          title="Know what you certified."
          copy="Execute automated probe suites evaluating accuracy, robustness, bias, and refusal policy before deployment."
        />

        <div className="verify-grid-v3">
          <motion.div whileHover={{ y: -4 }} className="verify-controls-card animated-box">
            <h3>Baseline Probe Suite Execution</h3>
            <p>12,480 response dimensions independently evaluated across production baseline targets.</p>

            <div className="scan-metrics-list">
              {scanMetrics.map((sm, i) => (
                <motion.div
                  key={sm.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 4, backgroundColor: "#141c2c" }}
                  transition={{ delay: i * 0.08, duration: 0.25 }}
                  viewport={{ once: true }}
                  className={`scan-item ${activeScanIndex === i ? "active" : ""}`}
                  onClick={() => setActiveScanIndex(i)}
                >
                  <CheckCircle2 size={16} className="text-green" />
                  <div>
                    <strong>{sm.name}</strong>
                    <small>Similarity: {sm.score}</small>
                  </div>
                  <span className="badge-pass">● {sm.status}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="verify-scan-visual animated-box">
            <div className="scan-radar-head">
              <Radar size={16} className="text-blue" />
              <span>BEHAVIORAL RADAR FINGERPRINT</span>
            </div>
            <div className="scan-canvas-box">
              <div className="scan-laser-line" />
              <div className="radar-grid-bg" />
              <div className="scan-center-badge">
                <ShieldCheck size={32} className="text-green" />
                <span>BASELINE VERIFIED</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Workflow Connector Line */}
      <div className="workflow-line-connector" />

      {/* 3D SECTION 2: FINGERPRINT */}
      <motion.section
        className="section-story"
        id="fingerprint"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle
          eyebrow="02 · FINGERPRINT"
          title="Capture a unique behavioral identity."
          copy="Generate an immutable cryptographic SHA-256 fingerprint signature representing certified model behavior."
        />

        <div className="fingerprint-stage-v3">
          <motion.div whileHover={{ y: -4 }} className="fingerprint-card-v3 animated-box">
            <div className="fp-head-v3">
              <Fingerprint size={36} className="text-green" />
              <div>
                <h2>SHA-256 BEHAVIORAL LEDGER</h2>
                <span>Fingerprint ID: fp_7a91c4e8b32f</span>
              </div>
            </div>

            <motion.div whileHover={{ borderColor: "#6366F1" }} className="hash-code-block">
              <span>CRYPTOGRAPHIC BASELINE SIGNATURE</span>
              <code>{typedHash}</code>
            </motion.div>

            <div className="fp-facts-grid">
              <motion.div whileHover={{ y: -2 }} className="fp-fact-card">
                <span>CERTIFICATION DATE</span>
                <strong>21 Aug 2026</strong>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="fp-fact-card">
                <span>PROBE DIMENSIONS</span>
                <strong>12,480 Evaluated</strong>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} className="fp-fact-card">
                <span>TRUST LEVEL</span>
                <strong className="text-green">94 / 100 CERTIFIED</strong>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Workflow Connector Line */}
      <div className="workflow-line-connector" />

      {/* 3D SECTION 3: MONITOR & DRIFT DETECTION */}
      <motion.section
        className="section-story"
        id="drift"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle
          eyebrow="03 · MONITOR & DRIFT SENTINEL"
          title="Detect silent changes after production deployment."
          copy="Catch prompt injections, model swaps, and silent weights degradation that traditional uptime checks miss."
        />

        <div className="drift-demo-banner">
          <div className="drift-toggle-bar">
            <span>DEMO SCENARIO STATE:</span>
            <button
              className={`chip-btn ${!simulatedDrift ? "active" : ""}`}
              onClick={() => handleToggleDrift(false)}
            >
              <CheckCircle2 size={12} /> Normal Production (v3.2)
            </button>
            <button
              className={`chip-btn danger ${simulatedDrift ? "active" : ""}`}
              onClick={() => handleToggleDrift(true)}
            >
              <AlertTriangle size={12} /> Simulate Silent Model Swap
            </button>
          </div>

          {/* Slide-In Drift Alert Notification Card */}
          {simulatedDrift && (
            <motion.div
              className="drift-alert-pop mb-4"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <AlertTriangle size={18} className="text-red" />
              <div>
                <strong>⚠ BEHAVIORAL DRIFT DETECTED</strong>
                <span>Model: Sentiment Pro · Deviation: 27.3% · Confidence: 94%</span>
              </div>
              <span className="badge-fail ml-auto">CRITICAL ALERT</span>
            </motion.div>
          )}

          <div className="drift-comparison-grid">
            {/* Left: Certified Baseline Card with Hover Animation */}
            <motion.div whileHover={{ y: -4 }} className="drift-card-v3 animated-box">
              <span className="card-kicker">CERTIFIED BASELINE</span>
              <h3>Sentiment Pro (v3.2)</h3>
              <div className="drift-score-big text-green">98.7%</div>
              <p>Behavioral Similarity</p>
              <span className="badge-pass">● CERTIFIED & SAFE</span>
            </motion.div>

            {/* Middle: Divergence Indicator */}
            <div className="drift-arrow-center">
              <Activity size={24} className={simulatedDrift ? "text-red" : "text-green"} />
              <span>{simulatedDrift ? "27.3% DRIFT" : "0.8% DRIFT"}</span>
            </div>

            {/* Right: Production Target Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className={`drift-card-v3 animated-box ${simulatedDrift ? "critical" : ""}`}
            >
              <span className="card-kicker">PRODUCTION ENDPOINT</span>
              <h3>api.neuralforge.ai/predict</h3>
              <div className={`drift-score-big ${simulatedDrift ? "text-red" : "text-green"}`}>
                {similarityScore.toFixed(1)}%
              </div>
              <p>{simulatedDrift ? "BEHAVIORAL DEVIATION DETECTED" : "Within Certified Range"}</p>
              {simulatedDrift ? (
                <span className="badge-fail">⚠ SILENT SWAP DETECTED</span>
              ) : (
                <span className="badge-pass">● HEALTHY</span>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Workflow Connector Line */}
      <div className="workflow-line-connector" />

      {/* SECTION 4: PRODUCT PREVIEW WITH 3D PERSPECTIVE TILT */}
      <motion.section
        className="section-story"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4 }}
      >
        <SectionTitle
          eyebrow="400+ AUDIT CHECKS"
          title="Investigate. Explain. Respond."
          copy="Complete operational command center for AI Security Engineers, SecOps Leads, Risk Officers, and Compliance Auditors."
        />

        <div className="perspective-tilt-frame">
          <div className="window-head">
            <div>
              <i />
              <i />
              <i />
            </div>
            <span>MODEL SENTINEL ENTERPRISE SECURITY CONSOLE</span>
            <small>v1.0.0</small>
          </div>
          <div className="tilt-preview-content">
            <div className="preview-hero-stats">
              <motion.div whileHover={{ y: -3, borderColor: "#6366F1" }} className="animated-box">
                <span>MONITORED MODELS</span>
                <strong>
                  <CountUpNumber target={12} />
                </strong>
              </motion.div>
              <motion.div whileHover={{ y: -3, borderColor: "#F59E0B" }} className="animated-box">
                <span>ACTIVE DRIFT EVENTS</span>
                <strong className="text-amber">1 ALERT</strong>
              </motion.div>
              <motion.div whileHover={{ y: -3, borderColor: "#22C55E" }} className="animated-box">
                <span>TEST FAILURES</span>
                <strong className="text-green">0 TODAY</strong>
              </motion.div>
              <motion.div whileHover={{ y: -3, borderColor: "#6366F1" }} className="animated-box">
                <span>AVG TRUST SCORE</span>
                <strong className="text-green">
                  <CountUpNumber target={94} /> / 100
                </strong>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FINAL HACKATHON CTA BANNER */}
      <section className="landing-cta-banner">
        <motion.div whileHover={{ scale: 1.01 }} className="cta-content animated-box">
          <h2>Start continuous AI model trust and security verification today.</h2>
          <p>Deploy ModelSentinel's evidence layer between your AI models and production endpoints.</p>
          <div className="cta-buttons">
            <Link className="button primary large" href="/signup">
              Create Sentinel Account <ArrowRight size={16} className="arrow-icon" />
            </Link>
            <Link className="button secondary large" href="/login">
              Sign In to Workspace
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="landing-footer-v3">
        <Brand />
        <p>The continuous trust and security infrastructure for enterprise AI models.</p>
        <span>© 2026 ModelSentinel Inc.</span>
      </footer>
    </div>
  );
}
