"use client";

import React from "react";
import Link from "next/link";
import { Brand } from "./brand";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export function AuthLayout({
  children,
  mode,
}: {
  children: React.ReactNode;
  mode: "login" | "signup";
}) {
  return (
    <div className="auth-layout-wrapper">
      <div className="auth-glow-bg" />

      {/* 3. Header */}
      <header className="auth-header">
        <Brand />
        <div className="auth-header-right">
          {mode === "login" ? (
            <>
              <span>Don't have a workspace?</span>
              <Link href="/signup" className="button secondary sm">
                Create Account <ArrowRight size={14} />
              </Link>
            </>
          ) : (
            <>
              <span>Already have a workspace?</span>
              <Link href="/login" className="button secondary sm">
                Sign In <ArrowRight size={14} />
              </Link>
            </>
          )}
        </div>
      </header>

      {/* 2. Desktop Split-Screen Main Container */}
      <main className="auth-split-grid">
        {/* Left Side: Product Branding Panel */}
        <div className="auth-left-brand">
          <div className="brand-badge-pill">
            <ShieldCheck size={14} className="text-blue" />
            <span>AI MODEL SECURITY & TRUST INFRASTRUCTURE</span>
          </div>

          <h1 className="brand-statement">
            Continuously verify that your AI models behave the way you trusted them to.
          </h1>

          <div className="benefits-list">
            <div className="benefit-item">
              <CheckCircle2 size={16} className="text-green" />
              <span>Continuous behavioral monitoring & real-time telemetry</span>
            </div>
            <div className="benefit-item">
              <CheckCircle2 size={16} className="text-green" />
              <span>Silent model swap & prompt injection drift detection</span>
            </div>
            <div className="benefit-item">
              <CheckCircle2 size={16} className="text-green" />
              <span>Evidence-backed SHA-256 trust verification ledger</span>
            </div>
          </div>
        </div>

        {/* Right Side: Centered Auth Card */}
        <div className="auth-right-card">{children}</div>
      </main>

      {/* 14. Clean Footer */}
      <footer className="auth-footer-v2">
        <span>© 2026 ModelSentinel Inc. · AI Model Security & Trust Infrastructure</span>
        <div className="auth-foot-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#security">SOC2 Compliance</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
}
