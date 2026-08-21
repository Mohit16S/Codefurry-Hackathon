"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  FlaskConical,
  GitCompareArrows,
  Activity,
  Bell,
  Settings,
  Search,
  Command,
  Menu,
  X,
  PlusCircle,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Radio,
  FileCheck,
  Sparkles,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { Brand } from "./brand";
import { DemoBadge, ToastContainer, TrustScoreModal } from "./ui";
import { CommandPalette } from "./command-palette";
import { IncidentReportModal } from "./incident-report-modal";
import { RegisterModelModal } from "./register-model-modal";
import { useDemo, UserRole } from "./demo-provider";

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const { setCommandPaletteOpen, setRegisterModalOpen, stage, drifted, user, logout, switchRole } = useDemo();

  const alertBadgeCount = stage === "alert" || drifted ? 1 : 0;

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  // Role-specific navigation definitions
  const getNavForRole = (role: UserRole) => {
    switch (role) {
      case "AI Security Engineer":
        return [
          ["Dashboard", "/security/dashboard", LayoutDashboard],
          ["Models", "/models", Boxes],
          ["Security Testing", "/playground", FlaskConical],
          ["Drift Sentinel", "/monitoring", Activity],
          ["Incidents", "/alerts", Bell],
          ["Compare", "/compare", GitCompareArrows],
        ] as const;

      case "ML SecOps Lead":
        return [
          ["Command Center", "/secops/dashboard", Radio],
          ["Production Monitoring", "/monitoring", Activity],
          ["Models", "/models", Boxes],
          ["Incidents & Alerts", "/alerts", Bell],
          ["Playground", "/playground", FlaskConical],
          ["Compare", "/compare", GitCompareArrows],
        ] as const;

      case "Chief AI Risk Officer":
        return [
          ["Executive Dashboard", "/risk/dashboard", Sparkles],
          ["Model Portfolio", "/models", Boxes],
          ["Risk Monitoring", "/monitoring", Activity],
          ["Alerts & Exposure", "/alerts", Bell],
          ["Compare", "/compare", GitCompareArrows],
        ] as const;

      case "Compliance Auditor":
        return [
          ["Audit Dashboard", "/compliance/dashboard", FileCheck],
          ["Models Under Audit", "/models", Boxes],
          ["Audit Controls", "/monitoring", Activity],
          ["Findings & Alerts", "/alerts", Bell],
          ["Compare", "/compare", GitCompareArrows],
        ] as const;

      default:
        return [
          ["Dashboard", "/security/dashboard", LayoutDashboard],
          ["Models", "/models", Boxes],
          ["Monitoring", "/monitoring", Activity],
          ["Playground", "/playground", FlaskConical],
          ["Compare", "/compare", GitCompareArrows],
          ["Alerts", "/alerts", Bell],
        ] as const;
    }
  };

  const nav = getNavForRole(user.role);

  const getRoleBadgeStyle = (r: UserRole) => {
    switch (r) {
      case "AI Security Engineer":
        return "badge-blue";
      case "ML SecOps Lead":
        return "badge-red";
      case "Chief AI Risk Officer":
        return "badge-purple";
      case "Compliance Auditor":
        return "badge-green";
      default:
        return "badge-blue";
    }
  };

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className={open ? "open" : ""}>
        <div className="side-head">
          <Brand />
          <button className="icon-btn mobile-only" onClick={() => setOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <div className="role-persona-banner">
          <span>ACTIVE PERSONA</span>
          <strong>{user.role}</strong>
        </div>

        <nav>
          {nav.map(([n, h, I]) => (
            <Link
              onClick={() => setOpen(false)}
              className={path === h || path.startsWith(h + "/") ? "active" : ""}
              href={h}
              key={h}
            >
              <I size={17} />
              {n}
              {n.includes("Alerts") && alertBadgeCount > 0 && <b className="alert-badge">{alertBadgeCount}</b>}
              {n.includes("Incidents") && alertBadgeCount > 0 && <b className="alert-badge">{alertBadgeCount}</b>}
            </Link>
          ))}
        </nav>

        <div className="side-actions-box">
          <button className="register-nav-btn" onClick={() => setRegisterModalOpen(true)}>
            <PlusCircle size={15} /> Register Model
          </button>
        </div>

        <div className="side-bottom">
          <DemoBadge />
          <Link href="/settings" className={path === "/settings" ? "active" : ""}>
            <Settings size={17} />
            Settings
          </Link>

          <div className="profile">
            <span>{user.initials}</span>
            <div>
              <strong>{user.name}</strong>
              <small>{user.role}</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="app-main">
        <header className="topnav">
          <button className="icon-btn mobile-only" onClick={() => setOpen(true)}>
            <Menu size={18} />
          </button>

          <div className="search clickable" onClick={() => setCommandPaletteOpen(true)}>
            <Search size={14} />
            <span>Search models, alerts, fingerprints (Cmd+K)...</span>
            <kbd>
              <Command size={10} /> K
            </kbd>
          </div>

          {/* Interactive Role Switcher Header Badge */}
          <div className="role-switcher-header">
            <button
              className={`header-role-btn ${getRoleBadgeStyle(user.role)}`}
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              title="Click to switch persona role"
            >
              <RefreshCw size={12} />
              <span>{user.role.toUpperCase()}</span>
              <ChevronDown size={12} />
            </button>

            {roleSwitcherOpen && (
              <div className="role-switcher-dropdown" onClick={() => setRoleSwitcherOpen(false)}>
                <div className="dropdown-title">SWITCH DEMO PERSONA</div>
                {[
                  { r: "AI Security Engineer", desc: "Technical model testing & drift forensics" },
                  { r: "ML SecOps Lead", desc: "Production operations & incident containment" },
                  { r: "Chief AI Risk Officer", desc: "Executive risk, business impact & governance" },
                  { r: "Compliance Auditor", desc: "Control verification & evidence audit readiness" },
                ].map(({ r, desc }) => (
                  <button
                    key={r}
                    className={`role-dropdown-item ${user.role === r ? "active" : ""}`}
                    onClick={() => switchRole(r as UserRole)}
                  >
                    <div>
                      <strong>{r}</strong>
                      <small>{desc}</small>
                    </div>
                    {user.role === r && <ShieldCheck size={14} className="text-green" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="top-actions">
            <button
              className="icon-btn action-badge-btn"
              onClick={() => setCommandPaletteOpen(true)}
              title="Open Notifications & Quick Search"
            >
              <Bell size={17} />
              {alertBadgeCount > 0 && <i className="pulse-dot" />}
            </button>

            <button
              className="button primary sm header-reg-btn"
              onClick={() => setRegisterModalOpen(true)}
            >
              <PlusCircle size={14} /> Certify Model
            </button>

            {/* Profile Dropdown Menu */}
            <div className="profile-menu-container">
              <button
                className="avatar-btn"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                title="User Profile Menu"
              >
                <span className="avatar">{user.initials}</span>
                <ChevronDown size={12} className="avatar-arrow" />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown-menu" onClick={() => setUserMenuOpen(false)}>
                  <div className="user-dropdown-header">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                    <span className="user-role-badge">{user.role}</span>
                  </div>
                  <div className="user-dropdown-divider" />
                  <Link href="/settings" className="user-dropdown-item">
                    <Settings size={14} /> Workspace Settings
                  </Link>
                  <button className="user-dropdown-item danger" onClick={handleSignOut}>
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>

      {/* Global Overlays & Modals */}
      <CommandPalette />
      <IncidentReportModal />
      <RegisterModelModal />
      <TrustScoreModal />
      <ToastContainer />
    </div>
  );
}
