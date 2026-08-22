"use client";

import { ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/shell";

export default function RegisterModelPage() {
  return (
    <AppShell>
      <section className="register-route-state" aria-live="polite">
        <ShieldCheck size={24} />
        <h1>Model Certification</h1>
        <p>Preparing the five-step certification workflow…</p>
      </section>
    </AppShell>
  );
}
