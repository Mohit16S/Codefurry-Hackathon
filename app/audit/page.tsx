"use client";

import { AppShell } from "@/components/shell";
import { Button, DemoBadge, StatusBadge } from "@/components/ui";
import { auditReport, hash } from "@/lib/data";
import { useDemo } from "@/components/demo-provider";
import { CheckCircle2, Download, FileCheck2, Fingerprint, History, ShieldCheck } from "lucide-react";

export default function AuditPage() {
  const { setReportModalOpen } = useDemo();
  return <AppShell>
    <div className="page-head"><div><span className="page-kicker">AUDIT READINESS</span><h1>AI Audit Report</h1><p>Report-ready certification, test, drift, and evidence history.</p></div><div className="head-actions"><DemoBadge/><Button onClick={()=>setReportModalOpen(true)}><Download/> Generate audit report</Button></div></div>
    <section className="audit-cover">
      <div><span>MODEL GOVERNANCE RECORD</span><h2>{auditReport.model} <em>{auditReport.version}</em></h2><p>Independent runtime assurance record · Audit window Aug 01–21, 2026</p></div><div className="audit-seal"><ShieldCheck/><strong>{auditReport.status}</strong><span>CURRENT STATUS</span></div>
    </section>
    <div className="audit-metrics">{[["Certified",auditReport.certified],["Tests",auditReport.tests.toLocaleString()],["Failures",String(auditReport.failures)],["Drift Events",String(auditReport.driftEvents)],["Current Trust",`${auditReport.trust} / 100`]].map(([label,value])=><div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
    <div className="audit-grid">
      <section className="panel"><div className="panel-head"><div><span className="panel-kicker">CONTROL EVIDENCE</span><h2>Verification coverage</h2></div><StatusBadge status="Complete"/></div>{["Independent model certification","Behavioral baseline fingerprinting","Prompt injection and jailbreak testing","Bias and hallucination evaluation","Continuous drift monitoring","Incident evidence retention"].map(x=><div className="audit-control" key={x}><CheckCircle2/><span>{x}</span><b>PASS</b></div>)}</section>
      <section className="panel"><div className="panel-head"><div><span className="panel-kicker">EVIDENCE CHAIN</span><h2>Immutable audit trail</h2></div><Fingerprint/></div>{[["21 Aug · 14:35","Incident evidence package signed"],["21 Aug · 14:32","Behavioral drift event captured"],["21 Aug · 10:00","Scheduled probe suite completed"],["15 Aug · 09:20","v3.2 baseline certified"]].map(([time,event])=><div className="audit-event" key={event}><History/><div><b>{event}</b><span>{time}</span></div></div>)}<div className="hash"><span>REPORT EVIDENCE HASH · SHA-256</span><code>{hash}</code></div></section>
    </div><p className="disclaimer">Prototype audit view. All records and results are simulated for the CodeFury demonstration.</p>
  </AppShell>
}
