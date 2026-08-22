"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { models as initialModels, Model } from "@/lib/data";
import { InternalRole, toInternalRole, toDisplayRole, getRoleDashboardData } from "@/lib/role-data";

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
  roleId: InternalRole;
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
  switchRole: (newRole: UserRole | InternalRole | string) => void;
  can: (action: string) => boolean;
  roleData: ReturnType<typeof getRoleDashboardData>;
};

const defaultUser: UserProfile = {
  name: "Mohit Kumar",
  email: "mohit@modelsentinel.demo",
  role: "AI Security Engineer",
  roleId: "AI_SECURITY_ENGINEER",
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

  // Auth State with localStorage Persistence
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = window.localStorage.getItem("modelsentinel-user-role");
      if (savedRole) {
        const displayRole = toDisplayRole(savedRole);
        const internalRole = toInternalRole(savedRole);
        setUser((prev) => ({
          ...prev,
          role: displayRole,
          roleId: internalRole,
        }));
      }
    }
  }, []);

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

  const getRoleDashboardRoute = (inputRole: string) => {
    const internal = toInternalRole(inputRole);
    switch (internal) {
      case "AI_SECURITY_ENGINEER":
        return "/security/dashboard";
      case "ML_SECOPS_LEAD":
        return "/secops/dashboard";
      case "CHIEF_AI_RISK_OFFICER":
        return "/risk/dashboard";
      case "COMPLIANCE_AUDITOR":
        return "/compliance/dashboard";
    }
  };

  const login = (email: string, inputRole?: string) => {
    const displayRole = toDisplayRole(inputRole || "AI Security Engineer");
    const internalRole = toInternalRole(inputRole || "AI Security Engineer");
    const initials = email.substring(0, 2).toUpperCase();
    const nameFromEmail = email.split("@")[0].replace(".", " ").replace(/\b\w/g, (l) => l.toUpperCase());

    if (typeof window !== "undefined") {
      window.localStorage.setItem("modelsentinel-user-role", internalRole);
    }

    setUser({
      name: nameFromEmail || "Mohit Kumar",
      email: email || "mohit@modelsentinel.demo",
      role: displayRole,
      roleId: internalRole,
      organization: "Enterprise AI Security Lab",
      initials: initials || "MK",
    });
    setIsLoggedIn(true);
    addToast("Welcome back!", `Signed in as ${displayRole}`, "success");
  };

  const signup = (name: string, email: string, organization: string, inputRole: string) => {
    const displayRole = toDisplayRole(inputRole || "AI Security Engineer");
    const internalRole = toInternalRole(inputRole || "AI Security Engineer");
    const parts = name.trim().split(" ");
    const initials = (parts[0]?.[0] || "M") + (parts[1]?.[0] || "K");

    if (typeof window !== "undefined") {
      window.localStorage.setItem("modelsentinel-user-role", internalRole);
    }

    setUser({
      name: name || "Mohit Kumar",
      email: email || "mohit@modelsentinel.demo",
      role: displayRole,
      roleId: internalRole,
      organization: organization || "CyberSec Labs",
      initials: initials.toUpperCase(),
    });
    setIsLoggedIn(true);
    addToast("Account Created", `Registered as ${displayRole}`, "success");
  };

  const logout = () => {
    setIsLoggedIn(false);
    addToast("Signed out", "You have been logged out of your session.", "info");
  };

  const switchRole = (newRole: UserRole | InternalRole | string) => {
    const displayRole = toDisplayRole(newRole);
    const internalRole = toInternalRole(newRole);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("modelsentinel-user-role", internalRole);
    }

    setUser((prev) => ({ ...prev, role: displayRole, roleId: internalRole }));
    addToast("Persona Switched", `Active persona: ${displayRole}`, "info");

    const route = getRoleDashboardRoute(internalRole);
    router.push(route);
  };

  const can = (action: string): boolean => {
    const r = user.roleId;
    switch (action) {
      case "suspend_model":
      case "contain_incident":
        return r === "ML_SECOPS_LEAD";
      case "approve_risk_exception":
      case "approve_mitigation":
        return r === "CHIEF_AI_RISK_OFFICER";
      case "run_security_probes":
      case "run_security_test":
        return r === "AI_SECURITY_ENGINEER" || r === "ML_SECOPS_LEAD";
      case "verify_control":
      case "start_audit":
        return r === "COMPLIANCE_AUDITOR" || r === "CHIEF_AI_RISK_OFFICER";
      default:
        return true;
    }
  };

  const roleData = getRoleDashboardData(user.roleId);

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
        roleData,
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
