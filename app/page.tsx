"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Fingerprint, Radar, ShieldCheck, CheckCircle2, Lock, Cpu, Database } from "lucide-react";
import { Brand } from "@/components/brand";
import { Button, DemoBadge, SectionTitle, TrustScore } from "@/components/ui";

const logs = [
  "Running probe suite...",
  "Behavioral fingerprint generated",
  "Comparing production response",
  "⚠ Behavioral deviation detected",
  "Drift score: 41.7%",
  "ALERT SENT",
];

export default function Landing() {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <Brand />
        <div className="navlinks">
          <a href="#platform">Platform</a>
          <a href="#drift">Drift Sentinel</a>
          <Link href="/models">Model Registry</Link>
        </div>
        <div className="landing-nav-actions">
          <Link className="button ghost" href="/login">
            Sign in
          </Link>
          <Link className="button primary" href="/signup">
            Create Account <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero Section — Balanced 2-Column SaaS Layout */}
      <section className="hero">
        <div className="hero-glow" />
        
        {/* Left Column: Copy, CTAs, Stats */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="hero-copy">
          <span className="eyebrow">
            <i /> AI MODEL TRUST INFRASTRUCTURE
          </span>
          <h1>
            Trust what your AI is <em>actually doing.</em>
          </h1>
          <p>
            ModelSentinel independently verifies AI models, fingerprints their behavior, and continuously monitors production endpoints for silent changes.
          </p>
          
          <div className="hero-actions">
            <Link className="button primary large" href="/dashboard">
              Open Command Center <ArrowRight size={16} />
            </Link>
            <Link className="button secondary large" href="/monitoring">
              <Activity size={16} /> See drift detection
            </Link>
          </div>

          <div className="proof">
            <span>
              <ShieldCheck size={14} className="text-green" /> Independent verification
            </span>
            <span>
              <Radar size={14} className="text-blue" /> Continuous monitoring
            </span>
            <DemoBadge />
          </div>

          {/* Hero Live Metrics Bar — Fills lower-left area */}
          <div className="hero-metrics-bar mt-6">
            <div className="hero-metric-item">
              <span>ACTIVE MODELS</span>
              <strong>12 Monitored</strong>
            </div>
            <div className="hero-metric-item">
              <span>TRUST SCORE</span>
              <strong className="text-green">94/100 TRUSTED</strong>
            </div>
            <div className="hero-metric-item">
              <span>VERIFICATION</span>
              <strong>SHA-256 Ledger</strong>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Live Model Health Monitor Showcase */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.3 }} className="hero-right-showcase">
          <div className="health-monitor">
            <div className="window-head">
              <div>
                <i />
                <i />
                <i />
              </div>
              <span>MODEL HEALTH MONITOR</span>
              <small>LIVE</small>
            </div>
            <div className="monitor-body">
              <div className="monitor-label">
                <span>MODEL STATUS</span>
                <b>
                  <i /> CERTIFIED & HEALTHY
                </b>
              </div>
              <div className="score-row">
                <TrustScore />
                <div>
                  <span>TRUST SCORE</span>
                  <h3>
                    94<small>/100</small>
                  </h3>
                  <p>Top 8% in category</p>
                </div>
              </div>
              <div className="pulse-viz">
                <div className="radar-ring r1" />
                <div className="radar-ring r2" />
                <div className="radar-ring r3" />
                <div className="sweep" />
                <span />
                <svg viewBox="0 0 500 80">
                  <path d="M0 45 L70 45 L88 42 L100 52 L112 18 L128 62 L144 36 L160 45 L230 45 L245 43 L258 48 L274 30 L289 52 L306 42 L330 45 L500 45" />
                </svg>
              </div>
              <div className="health-stats">
                <div>
                  <span>Behavioral stability</span>
                  <strong>98.2%</strong>
                </div>
                <div>
                  <span>Last verification</span>
                  <strong>2 min ago</strong>
                </div>
              </div>
            </div>
            <div className="monitor-footer">
              <span>
                <i /> Production endpoint connected
              </span>
              <span>MS-SEN-0421</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="steps" id="platform">
        <SectionTitle
          eyebrow="THE MODEL PASSPORT"
          title="AI models change. Your trust shouldn't."
          copy="A continuous evidence layer between model claims and production reality."
        />
        <div className="step-grid">
          {[
            ["01", "VERIFY", ShieldCheck, "Independently test accuracy, robustness, bias, and safety."],
            ["02", "FINGERPRINT", Fingerprint, "Capture a unique signature of observed model behavior."],
            ["03", "MONITOR", Radar, "Detect silent changes after the model reaches production."],
          ].map(([n, t, I, c]: any) => (
            <div className="step" key={n}>
              <span>{n}</span>
              <I />
              <h3>{t}</h3>
              <p>{c}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="silent-section" id="drift">
        <div>
          <span className="eyebrow">
            <i /> THE SILENT SWAP PROBLEM
          </span>
          <h2>
            Your endpoint looks the same.
            <br />
            <em>The model behind it doesn't.</em>
          </h2>
          <p>ModelSentinel catches behavioral changes that uptime monitors and API health checks cannot see.</p>
          <div className="flow">
            {["CERTIFIED MODEL", "PRODUCTION", "BEHAVIOR CHANGES", "DRIFT DETECTED", "BUYER ALERTED"].map((x, i) => (
              <div key={x}>
                <span className={i > 1 ? "red" : ""}>{i > 2 ? "!" : i + 1}</span>
                <b>{x}</b>
                {i < 4 && <ArrowRight size={14} />}
              </div>
            ))}
          </div>
          <Link className="button primary large" href="/monitoring">
            Experience the live demo <ArrowRight size={16} />
          </Link>
        </div>
        <div className="terminal">
          <div className="terminal-head">
            <span>
              <i />
              <i />
              <i />
            </span>
            <b>sentinel.live — probe suite</b>
            <em>● STREAMING</em>
          </div>
          {logs.map((l, i) => (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.2 }} className={i > 2 ? "log alert" : "log"} key={l}>
              <span>[14:32:0{i + 1}]</span>
              <code>{l}</code>
              {i < 3 && <CheckCircle2 size={14} />}
            </motion.div>
          ))}
        </div>
      </section>

      <footer>
        <Brand />
        <p>The trust and accountability layer for AI models.</p>
        <span>© 2026 ModelSentinel · Demo environment</span>
      </footer>
    </div>
  );
}
