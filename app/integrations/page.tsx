"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell";
import { DemoBadge, StatusBadge } from "@/components/ui";
import { integrations } from "@/lib/data";
import { useDemo } from "@/components/demo-provider";
import { Braces, Check, Cloud, Code2, Copy, Cpu, ExternalLink } from "lucide-react";

const iconFor={AI:Cpu,Cloud:Cloud,Developer:Code2,Notification:Braces};
export default function IntegrationsPage(){const{addToast}=useDemo();const[category,setCategory]=useState("All");const shown=category==="All"?integrations:integrations.filter(x=>x.category===category);return <AppShell><div className="page-head"><div><span className="page-kicker">ECOSYSTEM</span><h1>Integrations</h1><p>Connect ModelSentinel to the AI delivery systems you already use.</p></div><DemoBadge/></div><div className="integration-tabs">{["All","AI","Cloud","Developer","Notification"].map(x=><button className={category===x?"active":""} onClick={()=>setCategory(x)} key={x}>{x}</button>)}</div><div className="integration-grid">{shown.map(item=>{const Icon=iconFor[item.category];return <article className="integration-card" key={item.name}><div><span><Icon/></span><StatusBadge status={item.status}/></div><h2>{item.name}</h2><p>{item.description}</p><button onClick={()=>addToast(item.status==="Connected"?"Integration opened":"Integration ready",`${item.name} uses a demo configuration in this prototype.`,"info")}>{item.status==="Connected"?"Manage connection":"Configure"}<ExternalLink/></button></article>})}</div><section className="panel webhook-panel"><div><span className="panel-kicker">SIGNED EVENT DELIVERY</span><h2>Drift webhook example</h2><p>Send a normalized incident payload to SIEM, ticketing, or orchestration systems.</p></div><pre><code><span>POST</span> /webhooks/drift{"\n\n"}{`{\n  "model": "Sentiment Pro",\n  "version": "v3.2",\n  "drift": 41.7,\n  "similarity": 58.3,\n  "severity": "critical",\n  "evidence_id": "MS-ALT-8821"\n}`}</code></pre><button className="button secondary" onClick={()=>addToast("Copied","Webhook example copied to clipboard.","success")}><Copy/> Copy payload</button></section></AppShell>}
