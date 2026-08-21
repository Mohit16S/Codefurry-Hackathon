"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, Loader2, Sparkles, Check } from "lucide-react";
import { useDemo } from "./demo-provider";
import { Model } from "@/lib/data";

export function RegisterModelModal() {
  const { registerModalOpen, setRegisterModalOpen, registerModel } = useDemo();
  const [step, setStep] = useState(1);
  const [runningProbes, setRunningProbes] = useState(false);
  const [completedModel, setCompletedModel] = useState<Model | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [creator, setCreator] = useState("");
  const [category, setCategory] = useState("NLP · Classification");
  const [endpoint, setEndpoint] = useState("");
  const [version, setVersion] = useState("v1.0");
  const [scanFreq, setScanFreq] = useState("5m");
  const [description, setDescription] = useState("");

  if (!registerModalOpen) return null;

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      startCertification();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const startCertification = () => {
    setRunningProbes(true);
    setTimeout(() => {
      const generatedId = name.toLowerCase().replace(/\s+/g, "-") || "custom-model";
      const fingerprint = "fp_" + Math.random().toString(36).substring(2, 14);
      const shaHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

      const newModel: Model = {
        id: generatedId,
        name: name || "Custom Security LLM",
        creator: creator || "Internal AI Lab",
        category: category,
        trust: 95,
        accuracy: "96.8%",
        latency: "76ms",
        cost: "$0.003",
        verified: true,
        status: "Healthy",
        version: version || "v1.0",
        provider: "Enterprise Private Cloud",
        endpoint: endpoint || "https://api.internal.ai/v1/predict",
        fingerprintId: fingerprint,
        hash: shaHash,
        riskLevel: "Low",
        certDate: "Just Now",
        lastScan: "Just Now",
        description: description || "Newly registered certified AI model endpoint continuously monitored by Sentinel.",
        certifiedMetrics: {
          accuracy: 97,
          consistency: 96,
          robustness: 94,
          safety: 98,
          bias: 92,
          reliability: 96,
          latency: 95,
          responseStyle: 96,
        },
        currentMetrics: {
          accuracy: 97,
          consistency: 96,
          robustness: 94,
          safety: 98,
          bias: 92,
          reliability: 96,
          latency: 95,
          responseStyle: 96,
        },
        versions: [{ version: version || "v1.0", status: "Certified", date: "Just Now", fingerprintId: fingerprint, similarity: 99.4, notes: "Initial certification baseline" }],
      };

      setCompletedModel(newModel);
      registerModel(newModel);
      setRunningProbes(false);
    }, 2500);
  };

  const handleFinish = () => {
    setRegisterModalOpen(false);
    setStep(1);
    setCompletedModel(null);
  };

  const stepsList = [
    { num: "01", title: "Info" },
    { num: "02", title: "Endpoint" },
    { num: "03", title: "Version" },
    { num: "04", title: "Probes" },
    { num: "05", title: "Monitor" },
  ];

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={() => setRegisterModalOpen(false)}>
        <motion.div
          className="modal-wizard-card"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-wizard-header">
            <h2>
              <ShieldCheck className="text-blue" size={20} />
              <span>MODEL CERTIFICATION WIZARD</span>
            </h2>
            <button className="icon-btn" onClick={() => setRegisterModalOpen(false)}>
              <X size={16} />
            </button>
          </div>

          {!runningProbes && !completedModel && (
            <>
              {/* 12. Visual Stepper Header */}
              <div className="wizard-stepper-bar">
                {stepsList.map((st, i) => {
                  const stepNum = i + 1;
                  const isActive = step === stepNum;
                  const isCompleted = step > stepNum;
                  return (
                    <React.Fragment key={st.num}>
                      <div
                        className={`stepper-step ${isActive ? "active" : isCompleted ? "completed" : ""}`}
                        onClick={() => setStep(stepNum)}
                      >
                        <div className="step-circle">
                          {isCompleted ? <Check size={14} /> : st.num}
                        </div>
                        <span className="step-title">{st.title}</span>
                      </div>
                      {i < stepsList.length - 1 && (
                        <div className={`stepper-line ${isCompleted ? "completed" : ""}`} />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* 13. Certification Form Grid */}
              <div className="wizard-form-body">
                {step === 1 && (
                  <div className="wizard-step-content">
                    <h2>Step 1 — Model Information</h2>
                    <p className="text-muted text-xs mb-4">Enter general identification metadata for the AI model to be certified.</p>
                    
                    <div className="wizard-grid-2">
                      <div className="form-field-group">
                        <label className="field-label">Model Name</label>
                        <input
                          type="text"
                          placeholder="e.g. RiskGuard Pro"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="form-field-group">
                        <label className="field-label">Creator / Vendor</label>
                        <input
                          type="text"
                          placeholder="e.g. Aegis AI Solutions"
                          value={creator}
                          onChange={(e) => setCreator(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-field-group mt-3">
                      <label className="field-label">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="NLP · Classification">NLP · Classification</option>
                        <option value="LLM · Generative Support">LLM · Generative Support</option>
                        <option value="Vision · Content Moderation">Vision · Content Moderation</option>
                        <option value="Risk & Fraud Detection">Risk & Fraud Detection</option>
                        <option value="Legal & Document Extraction">Legal & Document Extraction</option>
                      </select>
                    </div>

                    <div className="form-field-group mt-3">
                      <label className="field-label">Description</label>
                      <textarea
                        rows={3}
                        placeholder="Brief summary of workload purpose and evaluation targets..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="wizard-step-content">
                    <h2>Step 2 — Production Endpoint</h2>
                    <p className="text-muted text-xs mb-4">Configure the API target endpoint for real-time behavioral probing.</p>
                    
                    <div className="form-field-group">
                      <label className="field-label">Target API Endpoint URL</label>
                      <input
                        type="text"
                        placeholder="https://api.yourdomain.com/v1/predict"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                      />
                    </div>

                    <div className="wizard-grid-2 mt-3">
                      <div className="form-field-group">
                        <label className="field-label">Hosting Infrastructure</label>
                        <input type="text" defaultValue="AWS us-west-2 (Dedicated Cluster)" />
                      </div>
                      <div className="form-field-group">
                        <label className="field-label">Authentication Type</label>
                        <select defaultValue="Bearer Token">
                          <option value="Bearer Token">Bearer Token / API Key</option>
                          <option value="mTLS Certificate">mTLS Certificate</option>
                          <option value="AWS IAM SigV4">AWS IAM SigV4</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="wizard-step-content">
                    <h2>Step 3 — Baseline Versioning</h2>
                    <p className="text-muted text-xs mb-4">Define version numbers and baseline release benchmarks.</p>
                    
                    <div className="wizard-grid-2">
                      <div className="form-field-group">
                        <label className="field-label">Release Version</label>
                        <input
                          type="text"
                          placeholder="v1.0"
                          value={version}
                          onChange={(e) => setVersion(e.target.value)}
                        />
                      </div>
                      <div className="form-field-group">
                        <label className="field-label">Architecture Baseline</label>
                        <input type="text" defaultValue="Transformer 7B (Quantized FP16)" />
                      </div>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="wizard-step-content">
                    <h2>Step 4 — Behavioral Certification Probes</h2>
                    <p className="text-muted text-xs mb-4">Select automated probe suites to execute during baseline certification.</p>
                    
                    <div className="secops-actions-list">
                      <label className="secops-action-btn">
                        <input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} />
                        <div>
                          <strong>Prompt Injection & Jailbreak Resistance (1,240 probes)</strong>
                          <small>Verify instruction boundary protection against jailbreaks</small>
                        </div>
                      </label>
                      <label className="secops-action-btn">
                        <input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} />
                        <div>
                          <strong>Demographic Bias & Fairness Audit (840 probes)</strong>
                          <small>Measure classification parity across demographic cohorts</small>
                        </div>
                      </label>
                      <label className="secops-action-btn">
                        <input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} />
                        <div>
                          <strong>Output Consistency & Response Style (5,400 probes)</strong>
                          <small>Fingerprint lexical density and classification boundaries</small>
                        </div>
                      </label>
                      <label className="secops-action-btn">
                        <input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} />
                        <div>
                          <strong>Hallucination Boundary Verification (2,000 probes)</strong>
                          <small>Validate factual assertions against ground truth</small>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="wizard-step-content">
                    <h2>Step 5 — Continuous Monitoring Settings</h2>
                    <p className="text-muted text-xs mb-4">Configure automated verification scan frequencies and alert triggers.</p>
                    
                    <div className="wizard-grid-2">
                      <div className="form-field-group">
                        <label className="field-label">Scan Frequency</label>
                        <select value={scanFreq} onChange={(e) => setScanFreq(e.target.value)}>
                          <option value="1m">Continuous (Every 1 minute)</option>
                          <option value="5m">High Sensitivity (Every 5 minutes)</option>
                          <option value="15m">Standard (Every 15 minutes)</option>
                          <option value="1h">Hourly Batch (Every 1 hour)</option>
                        </select>
                      </div>
                      <div className="form-field-group">
                        <label className="field-label">Drift Alert Threshold</label>
                        <select defaultValue="5%">
                          <option value="5%">Strict (Alert on &gt;5% deviation)</option>
                          <option value="10%">Standard (Alert on &gt;10% deviation)</option>
                          <option value="20%">Relaxed (Alert on &gt;20% deviation)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 14. Next Step Button Bottom Right */}
              <div className="wizard-footer">
                {step > 1 ? (
                  <button className="button secondary" onClick={handleBack}>
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : (
                  <div />
                )}

                <button className="button primary" onClick={handleNext}>
                  {step === 5 ? (
                    <>
                      <Sparkles size={14} /> Run Baseline Certification
                    </>
                  ) : (
                    <>
                      Next Step <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </>
          )}

          {runningProbes && (
            <div className="certification-running">
              <Loader2 className="spinner-lg text-blue" size={48} />
              <h2>Executing Baseline Certification Probes...</h2>
              <p>Evaluating 12,480 response dimensions across safety, bias, and robustness.</p>
              <div className="cert-progress-steps">
                <div className="cert-step active">✔ Connecting to endpoint API</div>
                <div className="cert-step active">✔ Running 12,480 adversarial probes</div>
                <div className="cert-step active">✔ Generating behavioral radar fingerprint</div>
                <div className="cert-step active">✔ Cryptographically hashing SHA-256 signature</div>
              </div>
            </div>
          )}

          {completedModel && (
            <div className="certification-success">
              <div className="success-icon-wrap">
                <CheckCircle2 size={56} className="text-green" />
              </div>
              <span className="badge-certified">CERTIFIED BASELINE GENERATED</span>
              <h2>{completedModel.name} is Certified!</h2>
              <p>ModelSentinel has verified behavioral baseline and saved SHA-256 fingerprint signature.</p>

              <div className="cert-result-card">
                <div className="cert-row">
                  <span>FINGERPRINT ID</span>
                  <code>{completedModel.fingerprintId}</code>
                </div>
                <div className="cert-row">
                  <span>SHA-256 BASELINE HASH</span>
                  <code>{completedModel.hash.slice(0, 32)}...</code>
                </div>
                <div className="cert-row">
                  <span>TRUST SCORE</span>
                  <strong className="text-green">{completedModel.trust} / 100</strong>
                </div>
                <div className="cert-row">
                  <span>STATUS</span>
                  <span className="badge-pass">● PASS · CERTIFIED</span>
                </div>
              </div>

              <div className="modal-footer">
                <button className="button primary large w-full" onClick={handleFinish}>
                  View Certified Model Passport
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
