"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Search, Sparkles } from "lucide-react";
import { Model } from "@/lib/data";

type Priority = "Balanced" | "Lowest Cost" | "Highest Accuracy" | "Lowest Latency" | "Highest Safety";

export function ProcurementAssistant({ models }: { models: Model[] }) {
  const [need, setNeed] = useState("I need a customer support model");
  const [priority, setPriority] = useState<Priority>("Balanced");
  const [recommended, setRecommended] = useState(false);

  const ranked = useMemo(() => {
    const relevant = models.filter((model) =>
      `${model.name} ${model.category} ${model.description}`.toLowerCase().match(/support|nlp|sentiment/)
    );
    return [...relevant].sort((a, b) => {
      if (priority === "Lowest Cost") return Number(a.cost.replace(/[$]/g, "")) - Number(b.cost.replace(/[$]/g, ""));
      if (priority === "Highest Accuracy") return Number(b.accuracy.replace("%", "")) - Number(a.accuracy.replace("%", ""));
      if (priority === "Lowest Latency") return Number(a.latency.replace("ms", "")) - Number(b.latency.replace("ms", ""));
      if (priority === "Highest Safety") return b.certifiedMetrics.safety - a.certifiedMetrics.safety;
      return b.trust - a.trust;
    }).slice(0, 3);
  }, [models, priority]);

  return (
    <section className="procurement-assistant">
      <div className="procurement-intro">
        <span><Sparkles size={14} /> AI PROCUREMENT ASSISTANT</span>
        <h2>Describe the workload. We’ll shortlist the evidence.</h2>
        <p>Recommendations use normalized trust, safety, performance, and cost signals from this demo registry.</p>
      </div>
      <div className="procurement-form">
        <label>
          <span>What are you looking for?</span>
          <div><Search size={15} /><input value={need} onChange={(event) => setNeed(event.target.value)} /></div>
        </label>
        <fieldset>
          <legend>What’s your priority?</legend>
          <div className="priority-options">
            {(["Balanced", "Lowest Cost", "Highest Accuracy", "Lowest Latency", "Highest Safety"] as Priority[]).map((item) => (
              <button key={item} type="button" className={priority === item ? "active" : ""} onClick={() => setPriority(item)}>
                <i>{priority === item && <CheckCircle2 size={12} />}</i>{item}
              </button>
            ))}
          </div>
        </fieldset>
        <button className="button primary" onClick={() => setRecommended(true)}>
          Recommend verified models <ArrowRight size={14} />
        </button>
      </div>
      <AnimatePresence>
        {recommended && (
          <motion.div className="procurement-results" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <div className="recommendation-copy">
              <span>RECOMMENDED FOR “{need.toUpperCase()}”</span>
              <p><b>{ranked[0]?.name}</b> provides the strongest {priority.toLowerCase()} fit across verified trust, accuracy, safety, latency, and cost.</p>
            </div>
            {ranked.map((model, index) => (
              <Link href={`/models/${model.id}`} className={index === 0 ? "procurement-result best" : "procurement-result"} key={model.id}>
                <b>{index + 1}</b><div><strong>{model.name}</strong><span>{model.creator} · {model.category}</span></div>
                <div><small>TRUST</small><strong>{model.trust}</strong></div><ArrowRight size={14} />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
