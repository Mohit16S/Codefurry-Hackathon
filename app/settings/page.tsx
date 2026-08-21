"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell";
import { Button, DemoBadge } from "@/components/ui";
import { useDemo } from "@/components/demo-provider";
import {
  Bell,
  KeyRound,
  Radio,
  User,
  Shield,
  Sliders,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function Settings() {
  const { addToast } = useDemo();
  const [activeTab, setActiveTab] = useState<
    "profile" | "monitoring" | "thresholds" | "notifications" | "api" | "security" | "team"
  >("profile");

  const [driftThreshold, setDriftThreshold] = useState("5%");
  const [scanFrequency, setScanFrequency] = useState("5m");

  const handleSave = () => {
    addToast("Settings Saved", "Workspace preferences updated successfully.", "success");
  };

  return (
    <AppShell>
      {/* Page Header */}
      <div className="page-head">
        <div>
          <span className="page-kicker">WORKSPACE MANAGEMENT</span>
          <h1>Settings & Configuration</h1>
          <p>Configure monitoring thresholds, alert sensitivity, notification webhooks, and team access.</p>
        </div>
        <DemoBadge />
      </div>

      <div className="settings-layout">
        {/* Navigation Sidebar */}
        <nav>
          {[
            [User, "Profile", "profile"],
            [Radio, "Monitoring", "monitoring"],
            [Sliders, "Alert Thresholds", "thresholds"],
            [Bell, "Notifications", "notifications"],
            [KeyRound, "API Access", "api"],
            [Shield, "Security", "security"],
            [Users, "Team", "team"],
          ].map(([Icon, label, key]: any) => (
            <button
              key={key}
              className={activeTab === key ? "active" : ""}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {/* Tab Form Content */}
        <section className="panel settings-form">
          {activeTab === "profile" && (
            <>
              <h2>Profile & Workspace Identity</h2>
              <p>Manage your account workspace identity and preferences.</p>
              <div className="form-row">
                <label>
                  Display Name
                  <input defaultValue="Mohit Kumar" />
                </label>
                <label>
                  Role
                  <input defaultValue="Lead AI Security Engineer" />
                </label>
              </div>
              <label>
                Work Email Address
                <input defaultValue="mohit@modelsentinel.demo" />
              </label>
              <label>
                Workspace Name
                <input defaultValue="Enterprise AI Lab — Security Workspace" />
              </label>

              <div className="form-check">
                <div>
                  <b>Demo Environment Labels</b>
                  <span>Display simulated watermark indicators throughout the dashboard.</span>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </>
          )}

          {activeTab === "monitoring" && (
            <>
              <h2>Monitoring & Scan Frequency</h2>
              <p>Configure how frequently Sentinel executes background evaluation probe suites.</p>

              <label>
                Probe Evaluation Frequency
                <select value={scanFrequency} onChange={(e) => setScanFrequency(e.target.value)}>
                  <option value="1m">Continuous Stream (Every 1 minute)</option>
                  <option value="5m">High Sensitivity (Every 5 minutes)</option>
                  <option value="15m">Standard Interval (Every 15 minutes)</option>
                  <option value="1h">Hourly Batch (Every 1 hour)</option>
                </select>
              </label>

              <label>
                Evaluation Probe Suite Depth
                <select defaultValue="full">
                  <option value="full">Full Audit Suite (12,480 probe dimensions)</option>
                  <option value="fast">Fast Probe Suite (1,200 dimensions)</option>
                  <option value="safety">Safety-Only Suite (500 dimensions)</option>
                </select>
              </label>
            </>
          )}

          {activeTab === "thresholds" && (
            <>
              <h2>Behavioral Drift Thresholds</h2>
              <p>Define deviation percentages that automatically trigger critical incident alerts.</p>

              <label>
                Critical Drift Alert Threshold
                <select value={driftThreshold} onChange={(e) => setDriftThreshold(e.target.value)}>
                  <option value="3%">Strict (&gt;3% deviation triggers critical signal)</option>
                  <option value="5%">Standard (&gt;5% deviation triggers critical signal)</option>
                  <option value="10%">Relaxed (&gt;10% deviation triggers critical signal)</option>
                </select>
              </label>

              <label>
                Latency Variance Sensitivity
                <select defaultValue="30ms">
                  <option value="15ms">Strict (+15ms increase alert)</option>
                  <option value="30ms">Standard (+30ms increase alert)</option>
                  <option value="50ms">Relaxed (+50ms increase alert)</option>
                </select>
              </label>
            </>
          )}

          {activeTab === "notifications" && (
            <>
              <h2>Notification Webhooks & Channels</h2>
              <p>Receive real-time alerts when behavioral drift or model swaps are detected.</p>

              <label>
                Slack Webhook URL
                <input defaultValue="https://hooks.slack.com/services/T00/B00/XXXXX" />
              </label>

              <label>
                PagerDuty Integration Key
                <input defaultValue="pd_key_live_9921c83a01f" />
              </label>

              <div className="form-check">
                <div>
                  <b>Email Alert Digest</b>
                  <span>Send instant emails on Critical & High Risk security events.</span>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </>
          )}

          {activeTab === "api" && (
            <>
              <h2>API Access & Sentinel Tokens</h2>
              <p>Use API tokens to connect your deployment pipelines with ModelSentinel CLI.</p>

              <label>
                Sentinel Master API Key
                <input type="password" defaultValue="ms_live_7a91c4e8b32f9a0c4e2d19b8f53a761c" />
              </label>
            </>
          )}

          {activeTab === "security" && (
            <>
              <h2>Security & Compliance Ledger</h2>
              <p>Cryptographic SHA-256 evidence logging & access audit policy.</p>

              <div className="form-check">
                <div>
                  <b>SHA-256 Immutable Audit Ledger</b>
                  <span>Sign all verification fingerprints with workspace private key.</span>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </>
          )}

          {activeTab === "team" && (
            <>
              <h2>Team Members & Access Control</h2>
              <p>Manage security engineers and workspace administrators.</p>

              <div className="team-list">
                <div className="team-member">
                  <strong>Mohit Kumar</strong>
                  <span>mohit@modelsentinel.demo · Admin</span>
                </div>
                <div className="team-member">
                  <strong>Security Operations Team</strong>
                  <span>secops@modelsentinel.demo · Viewer</span>
                </div>
              </div>
            </>
          )}

          <div className="mt-4">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
