"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { models as initialModels, Model } from "@/lib/data";

export type ToastMessage = {
  id: string;
  title: string;
  copy: string;
  type?: "info" | "warning" | "error" | "success";
};

export type UserRole =
  | "AI Security Engineer"
  | "ML SecOps Lead"
  | "Chief AI Risk Officer"
  | "Compliance Auditor";

export type UserProfile = {
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  initials: string;
};

type DemoContextType = {
  modelsList: Model[];
  drifted: boolean;
  setDrifted: (v: boolean) => void;
  stage: "idle" | "changed" | "probing" | "alert" | "resolved";
  setStage: (s: "idle" | "changed" | "probing" | "alert" | "resolved") => void;
  evidenceOpen: boolean;
  setEvidenceOpen: (v: boolean) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (v: boolean) => void;
  reportModalOpen: boolean;
  setReportModalOpen: (v: boolean) => void;
  trustModalOpen: boolean;
  setTrustModalOpen: (v: boolean) => void;
  registerModalOpen: boolean;
  setRegisterModalOpen: (v: boolean) => void;
  toasts: ToastMessage[];
  addToast: (title: string, copy: string, type?: "info" | "warning" | "error" | "success") => void;
  removeToast: (id: string) => void;
  simulateSwap: () => void;
  restoreModel: () => void;
  registerModel: (newModel: Model) => void;
  user: UserProfile;
  isLoggedIn: boolean;
  login: (email: string, role?: string) => void;
  signup: (name: string, email: string, organization: string, role: string) => void;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  can: (action: string) => boolean;
};

const defaultUser: UserProfile = {
  name: "Mohit Kumar",
  email: "mohit@modelsentinel.demo",
  role: "AI Security Engineer",
  organization: "Enterprise AI Security Lab",
  initials: "MK",
};

const DemoContext = createContext<DemoContextType | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [modelsList, setModelsList] = useState<Model[]>(initialModels);
  const [drifted, setDrifted] = useState<boolean>(false);
  const [stage, setStage] = useState<"idle" | "changed" | "probing" | "alert" | "resolved">("idle");
  const [evidenceOpen, setEvidenceOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [trustModalOpen, setTrustModalOpen] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Auth State
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const addToast = (title: string, copy: string, type: "info" | "warning" | "error" | "success" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, copy, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const simulateSwap = () => {
    setStage("changed");
    addToast("Production endpoint changed", "A new model version is responding.", "warning");
    setTimeout(() => {
      setStage("probing");
      addToast("Running behavioral probes", "Comparing 12,480 response dimensions...", "info");
    }, 900);
    setTimeout(() => {
      setStage("alert");
      setDrifted(true);
      addToast("CRITICAL DRIFT DETECTED", "Sentiment Pro similarity dropped to 58.3%", "error");
    }, 2400);
  };

  const restoreModel = () => {
    setStage("resolved");
    setDrifted(false);
    addToast("Endpoint Restored", "Sentiment Pro restored to certified v3.2 baseline.", "success");
    setTimeout(() => {
      setStage("idle");
    }, 1500);
  };

  const registerModel = (newModel: Model) => {
    setModelsList((prev) => [newModel, ...prev]);
    addToast("Model Registered", `${newModel.name} has been certified and added to registry.`, "success");
  };

  const getRoleDashboardRoute = (r: UserRole) => {
    switch (r) {
      case "AI Security Engineer":
        return "/security/dashboard";
      case "ML SecOps Lead":
        return "/secops/dashboard";
      case "Chief AI Risk Officer":
        return "/risk/dashboard";
      case "Compliance Auditor":
        return "/compliance/dashboard";
      default:
        return "/security/dashboard";
    }
  };

  const login = (email: string, inputRole?: string) => {
    const validRole: UserRole = (inputRole as UserRole) || "AI Security Engineer";
    const initials = email.substring(0, 2).toUpperCase();
    const nameFromEmail = email.split("@")[0].replace(".", " ").replace(/\b\w/g, (l) => l.toUpperCase());

    setUser({
      name: nameFromEmail || "Mohit Kumar",
      email: email || "mohit@modelsentinel.demo",
      role: validRole,
      organization: "Enterprise AI Security Lab",
      initials: initials || "MK",
    });
    setIsLoggedIn(true);
    addToast("Welcome back!", `Signed in as ${validRole}`, "success");
  };

  const signup = (name: string, email: string, organization: string, inputRole: string) => {
    const validRole: UserRole = (inputRole as UserRole) || "AI Security Engineer";
    const parts = name.trim().split(" ");
    const initials = (parts[0]?.[0] || "M") + (parts[1]?.[0] || "K");
    setUser({
      name: name || "Mohit Kumar",
      email: email || "mohit@modelsentinel.demo",
      role: validRole,
      organization: organization || "CyberSec Labs",
      initials: initials.toUpperCase(),
    });
    setIsLoggedIn(true);
    addToast("Account Created", `Registered as ${validRole}`, "success");
  };

  const logout = () => {
    setIsLoggedIn(false);
    addToast("Signed out", "You have been logged out of your session.", "info");
  };

  const switchRole = (newRole: UserRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
    addToast("Role Switched", `Switched to persona: ${newRole}`, "info");
    const route = getRoleDashboardRoute(newRole);
    router.push(route);
  };

  const can = (action: string): boolean => {
    const r = user.role;
    switch (action) {
      case "suspend_model":
        return r === "ML SecOps Lead";
      case "approve_risk_exception":
        return r === "Chief AI Risk Officer";
      case "run_security_probes":
        return r === "AI Security Engineer" || r === "ML SecOps Lead";
      case "modify_audit_records":
        return false; // Immutable audit ledger
      case "audit_controls":
        return r === "Compliance Auditor" || r === "Chief AI Risk Officer";
      default:
        return true;
    }
  };

  return (
    <DemoContext.Provider
      value={{
        modelsList,
        drifted,
        setDrifted,
        stage,
        setStage,
        evidenceOpen,
        setEvidenceOpen,
        commandPaletteOpen,
        setCommandPaletteOpen,
        reportModalOpen,
        setReportModalOpen,
        trustModalOpen,
        setTrustModalOpen,
        registerModalOpen,
        setRegisterModalOpen,
        toasts,
        addToast,
        removeToast,
        simulateSwap,
        restoreModel,
        registerModel,
        user,
        isLoggedIn,
        login,
        signup,
        logout,
        switchRole,
        can,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export const useDemo = () => {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error("useDemo must be used within DemoProvider");
  }
  return ctx;
};
