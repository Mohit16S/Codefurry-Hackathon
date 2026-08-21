"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Boxes, Activity, AlertTriangle, ShieldCheck, Zap, FileText, PlusCircle, X, ArrowRight } from "lucide-react";
import { useDemo } from "./demo-provider";

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, modelsList, simulateSwap, setRegisterModalOpen, setReportModalOpen } = useDemo();
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === "Escape" && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const navigate = (path: string) => {
    setCommandPaletteOpen(false);
    router.push(path);
  };

  const filteredModels = modelsList.filter(
    (m) => m.name.toLowerCase().includes(query.toLowerCase()) || m.category.toLowerCase().includes(query.toLowerCase()) || m.creator.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="command-palette-overlay" onClick={() => setCommandPaletteOpen(false)}>
        <motion.div
          className="command-palette-container"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cmd-header">
            <Search size={18} className="cmd-search-icon" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or search models, alerts, fingerprints..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="icon-btn close-btn" onClick={() => setCommandPaletteOpen(false)}>
              <X size={14} />
            </button>
          </div>

          <div className="cmd-body">
            {/* Quick Actions */}
            {(!query || "actions".includes(query.toLowerCase()) || "simulate".includes(query.toLowerCase()) || "register".includes(query.toLowerCase())) && (
              <div className="cmd-section">
                <span className="cmd-section-title">QUICK ACTIONS</span>
                <button
                  className="cmd-item"
                  onClick={() => {
                    setCommandPaletteOpen(false);
                    simulateSwap();
                  }}
                >
                  <Activity className="text-red" size={16} />
                  <div>
                    <strong>Simulate Silent Model Swap</strong>
                    <small>Trigger live drift detection demo scenario</small>
                  </div>
                  <kbd>Action</kbd>
                </button>

                <button
                  className="cmd-item"
                  onClick={() => {
                    setCommandPaletteOpen(false);
                    setRegisterModalOpen(true);
                  }}
                >
                  <PlusCircle className="text-blue" size={16} />
                  <div>
                    <strong>Register & Certify New Model</strong>
                    <small>Run 5-step certification wizard and generate SHA-256 fingerprint</small>
                  </div>
                  <kbd>Wizard</kbd>
                </button>

                <button
                  className="cmd-item"
                  onClick={() => {
                    setCommandPaletteOpen(false);
                    setReportModalOpen(true);
                  }}
                >
                  <FileText className="text-amber" size={16} />
                  <div>
                    <strong>Generate AI Incident Report</strong>
                    <small>Create executive summary for current security signal</small>
                  </div>
                  <kbd>Export</kbd>
                </button>
              </div>
            )}

            {/* Navigation Shortcuts */}
            {(!query || "nav".includes(query.toLowerCase()) || "dashboard".includes(query.toLowerCase()) || "monitoring".includes(query.toLowerCase())) && (
              <div className="cmd-section">
                <span className="cmd-section-title">PLATFORM NAVIGATION</span>
                <button className="cmd-item" onClick={() => navigate("/dashboard")}>
                  <ShieldCheck size={16} />
                  <span>AI Security Command Center</span>
                  <ArrowRight size={14} className="cmd-arrow" />
                </button>
                <button className="cmd-item" onClick={() => navigate("/monitoring")}>
                  <Activity size={16} />
                  <span>Real-Time Drift Sentinel</span>
                  <ArrowRight size={14} className="cmd-arrow" />
                </button>
                <button className="cmd-item" onClick={() => navigate("/models")}>
                  <Boxes size={16} />
                  <span>Verified Model Registry</span>
                  <ArrowRight size={14} className="cmd-arrow" />
                </button>
                <button className="cmd-item" onClick={() => navigate("/playground")}>
                  <Zap size={16} />
                  <span>Adversarial Testing Playground</span>
                  <ArrowRight size={14} className="cmd-arrow" />
                </button>
                <button className="cmd-item" onClick={() => navigate("/alerts")}>
                  <AlertTriangle size={16} />
                  <span>Alert Center & Security Console</span>
                  <ArrowRight size={14} className="cmd-arrow" />
                </button>
              </div>
            )}

            {/* Models Search Results */}
            {filteredModels.length > 0 && (
              <div className="cmd-section">
                <span className="cmd-section-title">INDEXED MODELS ({filteredModels.length})</span>
                {filteredModels.map((m) => (
                  <button key={m.id} className="cmd-item" onClick={() => navigate(`/models/${m.id}`)}>
                    <div className="tiny-model">{m.name.slice(0, 2).toUpperCase()}</div>
                    <div className="cmd-model-info">
                      <strong>{m.name}</strong>
                      <small>{m.category} · {m.creator}</small>
                    </div>
                    <span className="cmd-trust">Trust {m.trust}/100</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="cmd-footer">
            <span>Use <b>↑</b> <b>↓</b> to navigate, <b>ESC</b> to close</span>
            <kbd>ESC</kbd>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
