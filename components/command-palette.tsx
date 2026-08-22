"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlertTriangle, ArrowRight, Boxes, FlaskConical, GitCompareArrows, PlusCircle, Search, ShieldAlert, X } from "lucide-react";
import { useDemo } from "./demo-provider";
import { appNavigation } from "@/lib/navigation";

type Result = { id: string; label: string; description: string; group: "Models" | "Alerts" | "Pages" | "Actions"; href: string; icon: React.ComponentType<{ size?: number; className?: string }> };

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, modelsList, user, registerModalOpen } = useDemo();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = useMemo<Result[]>(() => {
    const models = modelsList.map((model) => ({ id: `model-${model.id}`, label: model.name, description: `${model.category} · ${model.creator} · Trust ${model.trust}`, group: "Models" as const, href: `/models/${model.id}`, icon: Boxes }));
    const alerts: Result[] = [
      { id: "alert-swap", label: "Possible Model Swap", description: "Critical · Sentiment Pro · 41.7% deviation", group: "Alerts", href: "/alerts", icon: ShieldAlert },
      { id: "alert-latency", label: "Latency Degradation", description: "Warning · VisionGuard · +38ms", group: "Alerts", href: "/alerts", icon: AlertTriangle },
      { id: "alert-drift", label: "Behavioral Drift", description: "Runtime assurance incident evidence", group: "Alerts", href: "/monitoring", icon: Activity },
    ];
    const pages = appNavigation(user.role).map((item) => ({ id: `page-${item.href}`, label: item.label, description: item.keywords, group: "Pages" as const, href: item.href, icon: item.icon }));
    const actions: Result[] = [
      { id: "action-register", label: "Register Model", description: "Start the five-step certification workflow", group: "Actions", href: "/register", icon: PlusCircle },
      { id: "action-test", label: "Run Security Test", description: "Execute the adversarial probe suite", group: "Actions", href: "/playground", icon: FlaskConical },
      { id: "action-drift", label: "Open Drift Sentinel", description: "Monitor behavioral similarity", group: "Actions", href: "/monitoring", icon: Activity },
      { id: "action-compare", label: "Compare Models", description: "Compare trust, safety, latency, and cost", group: "Actions", href: "/compare", icon: GitCompareArrows },
    ];
    return [...models, ...alerts, ...pages, ...actions];
  }, [modelsList, user.role]);

  const normalized = query.trim().toLowerCase();
  const visible = normalized
    ? results.filter((result) => `${result.label} ${result.description} ${result.group}`.toLowerCase().includes(normalized))
    : results.filter((result) => ["model-sentiment-pro", "alert-swap", "page-/monitoring", "action-register", "action-test"].includes(result.id));
  const groups = (["Models", "Alerts", "Pages", "Actions"] as const).map((group) => ({ group, items: visible.filter((result) => result.group === group) })).filter(({ items }) => items.length);

  const choose = (result: Result) => { setCommandPaletteOpen(false); router.push(result.href); };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!registerModalOpen) setCommandPaletteOpen(true);
      }
      if (event.key === "Escape") setCommandPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [registerModalOpen, setCommandPaletteOpen]);

  useEffect(() => {
    if (!commandPaletteOpen) return;
    setQuery(""); setSelectedIndex(0);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => { document.body.style.overflow = oldOverflow; };
  }, [commandPaletteOpen]);

  useEffect(() => setSelectedIndex(0), [query]);

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!visible.length) return;
    if (event.key === "ArrowDown") { event.preventDefault(); setSelectedIndex((current) => (current + 1) % visible.length); }
    if (event.key === "ArrowUp") { event.preventDefault(); setSelectedIndex((current) => (current - 1 + visible.length) % visible.length); }
    if (event.key === "Enter") { event.preventDefault(); choose(visible[selectedIndex] ?? visible[0]); }
  };

  return <AnimatePresence>{commandPaletteOpen && <motion.div className="command-palette-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setCommandPaletteOpen(false)}>
    <motion.div className="command-palette-container" role="dialog" aria-modal="true" aria-label="Global search" initial={{ opacity: 0, scale: .97, y: -12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .98, y: -8 }} onMouseDown={(event) => event.stopPropagation()}>
      <div className="cmd-header"><Search /><input ref={inputRef} aria-label="Search models, alerts, pages, and actions" placeholder="Search models, alerts, fingerprints..." value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={onInputKeyDown} aria-activedescendant={visible[selectedIndex]?.id} /><kbd>ESC</kbd><button aria-label="Close global search" onClick={() => setCommandPaletteOpen(false)}><X /></button></div>
      <div className="cmd-body">{groups.map(({ group, items }) => <section className="cmd-section" key={group}><span className="cmd-section-title">{normalized ? group.toUpperCase() : group === "Models" || group === "Alerts" ? "RECENT" : "QUICK ACTIONS"}</span>{items.map((result) => { const index = visible.findIndex((item) => item.id === result.id); return <button id={result.id} className={`cmd-item ${index === selectedIndex ? "selected" : ""}`} key={result.id} onMouseEnter={() => setSelectedIndex(index)} onClick={() => choose(result)}><span className="cmd-item-icon"><result.icon size={16} /></span><div><strong>{result.label}</strong><small>{result.description}</small></div><ArrowRight className="cmd-arrow" /></button>; })}</section>)}
        {!visible.length && <div className="cmd-empty"><Search /><h3>No results found</h3><p>Try searching for:</p><div>{["models", "alerts", "drift", "security", "governance"].map((hint) => <button key={hint} onClick={() => setQuery(hint)}>{hint}</button>)}</div></div>}
      </div>
      <div className="cmd-footer"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>↵</kbd> Open</span><span><kbd>ESC</kbd> Close</span></div>
    </motion.div>
  </motion.div>}</AnimatePresence>;
}
