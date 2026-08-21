"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell";
import { ModelCard } from "@/components/model-card";
import { useDemo } from "@/components/demo-provider";
import { Search, SlidersHorizontal, Check, PlusCircle, Filter } from "lucide-react";

export default function Models() {
  const { modelsList, setRegisterModalOpen } = useDemo();
  const [q, setQ] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All models");

  const categories = ["All models", "NLP", "Vision", "Risk & fraud", "Legal", "Support"];

  const shown = modelsList.filter((m) => {
    const matchesSearch = (m.name + m.category + m.creator + m.description).toLowerCase().includes(q.toLowerCase());
    const matchesVerified = !verifiedOnly || m.verified;
    const matchesCategory =
      selectedCategory === "All models" || m.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesVerified && matchesCategory;
  });

  return (
    <AppShell>
      {/* Top Header */}
      <div className="page-head marketplace-head">
        <div>
          <span className="page-kicker">VERIFIED MODEL REGISTRY</span>
          <h1>Discover & Certify Verified AI Models</h1>
          <p>Independently evaluate model trust signatures, risk profiles, and baselines before deployment.</p>
        </div>
        <div className="head-actions">
          <button className="button primary" onClick={() => setRegisterModalOpen(true)}>
            <PlusCircle size={15} /> Register & Certify Model
          </button>
        </div>
      </div>

      {/* Filterbar */}
      <div className="filterbar">
        <label className="model-search">
          <Search size={16} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search models, capabilities, fingerprints, creators..."
          />
        </label>
        <button
          className={`filter ${verifiedOnly ? "selected" : ""}`}
          onClick={() => setVerifiedOnly(!verifiedOnly)}
        >
          {verifiedOnly && <Check size={14} />} Verified Only
        </button>
      </div>

      {/* Category Chips */}
      <div className="chips">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
        <span className="registry-count ml-auto">{shown.length} OF {modelsList.length} MODELS INDEXED</span>
      </div>

      {/* Models Grid */}
      <div className="models-grid">
        {shown.map((m) => (
          <ModelCard model={m} key={m.id} />
        ))}
      </div>

      <p className="disclaimer">
        ModelSentinel trust scores represent continuous empirical probe audit data and SHA-256 fingerprint verification.
      </p>
    </AppShell>
  );
}
