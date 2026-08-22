"use client";

import { useState } from "react";
import { AppShell } from "@/components/shell";
import { Button, DemoBadge, StatusBadge } from "@/components/ui";
import { governancePolicies } from "@/lib/data";
import { useDemo } from "@/components/demo-provider";
import { Check, CheckCircle2, CloudCog, GitBranch, LockKeyhole, Plus, ShieldCheck, XCircle } from "lucide-react";

export default function GovernancePage() {
  const { drifted, addToast } = useDemo();
  const [selected, setSelected] = useState(governancePolicies[0]);
  const [monitoring, setMonitoring] = useState(true);
  const [security, setSecurity] = useState(true);
  const blocked = drifted;

  const deploy = () => addToast(
    blocked ? "Deployment blocked" : "Deployment protected",
    blocked ? "Behavioral similarity is below the 95% policy threshold." : "Sentiment Pro is now protected by continuous runtime assurance.",
    blocked ? "error" : "success"
  );

  return (
    <AppShell>
      <div className="page-head">
        <div><span className="page-kicker">AI GOVERNANCE & DEPLOYMENT GUARDRAILS</span><h1>Sentinel Policies</h1><p>Turn model evidence into enforceable deployment decisions.</p></div>
        <DemoBadge />
      </div>

      <div className="governance-layout">
        <section className="policy-list">
          <div className="policy-list-head"><span>POLICY LIBRARY</span><button><Plus size={14}/> New policy</button></div>
          {governancePolicies.map((policy) => (
            <button key={policy.id} onClick={() => setSelected(policy)} className={selected.id === policy.id ? "policy-item active" : "policy-item"}>
              <ShieldCheck size={18}/><div><strong>{policy.name}</strong><span>{policy.rules.length} enforced controls</span></div><i/>
            </button>
          ))}
        </section>

        <section className="panel policy-editor">
          <div className="panel-head"><div><span className="panel-kicker">ACTIVE POLICY</span><h2>{selected.name}</h2><p>{selected.description}</p></div><StatusBadge status="Enforced"/></div>
          <div className="policy-rules">
            <div className="rule-head"><span>CONTROL</span><span>REQUIREMENT</span><span>CURRENT</span><span>RESULT</span></div>
            {selected.rules.map((rule) => {
              const current = rule.metric === "Behavioral Similarity" ? (blocked ? 58.3 : 98.7) : rule.metric === "Hallucination Rate" ? 3.2 : rule.metric === "P95 Latency" ? 83 : rule.metric === "Safety Score" ? 95 : 94;
              const passes = rule.operator === "≥" ? current >= rule.threshold : current <= rule.threshold;
              return <div className="policy-rule" key={rule.metric}><strong>{rule.metric}</strong><code>{rule.operator} {rule.threshold}{rule.unit}</code><b>{current}{rule.unit}</b><span className={passes ? "rule-pass" : "rule-fail"}>{passes?<CheckCircle2/>:<XCircle/>}{passes?"PASS":"FAIL"}</span></div>
            })}
          </div>
        </section>
      </div>

      <section className={blocked ? "deployment-decision blocked" : "deployment-decision approved"}>
        <div className="decision-state">{blocked?<XCircle/>:<ShieldCheck/>}<div><span>DEPLOYMENT DECISION</span><h2>{blocked ? "BLOCKED" : "APPROVED"}</h2><p>{blocked ? "Deployment blocked because behavioral similarity (58.3%) is below the configured 95% threshold." : "All configured policy requirements pass for Sentiment Pro v3.2."}</p></div></div>
        <div className="decision-evidence"><span>Policy <b>{selected.name}</b></span><span>Evaluated <b>Just now</b></span><span>Evidence <b>5 controls</b></span></div>
      </section>

      <section className="panel deploy-sentinel">
        <div className="deploy-copy"><span className="panel-kicker">RUNTIME ASSURANCE</span><h2>Deploy with Sentinel</h2><p>Wrap the production endpoint with continuous evidence, incident response, and policy enforcement.</p><div className="protected-endpoint"><LockKeyhole/><code>api.neuralforge.ai/v3/eval</code><span>PROTECTED</span></div></div>
        <div className="deploy-controls">
          {[["Continuous monitoring",monitoring,setMonitoring,CloudCog],["Drift detection",true,()=>{},GitBranch],["Security probes",security,setSecurity,ShieldCheck],["Regression testing",true,()=>{},Check],["Incident creation",true,()=>{},Check],["Policy enforcement",true,()=>{},Check]].map(([label,on,setter,Icon]:any)=><button key={label} onClick={()=>setter(!on)} className={on?"enabled":""}><Icon/><span>{label}</span><i>{on&&<Check/>}</i></button>)}
          <Button variant={blocked ? "danger" : "primary"} onClick={deploy}>{blocked ? "Review failed controls" : "Deploy with Sentinel"}</Button>
        </div>
      </section>
    </AppShell>
  );
}
