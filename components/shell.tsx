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
  FileCheck2,
  LockKeyhole,
  Cpu,
  PanelLeftClose,
  PanelLeftOpen,
  UserRound,
  SlidersHorizontal,
  CheckCircle2,
  CircleDot,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Brand } from "./brand";
import { DemoBadge, ToastContainer, TrustScoreModal } from "./ui";
import { CommandPalette } from "./command-palette";
import { IncidentReportModal } from "./incident-report-modal";
import { RegisterModelModal } from "./register-model-modal";
import { useDemo, UserRole } from "./demo-provider";
import { appNavigation, isNavigationActive } from "@/lib/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [workspace, setWorkspace] = useState("AI Security Engineer");
  const workspaceRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem("modelsentinel-sidebar") === "collapsed");
  }, []);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!workspaceRef.current?.contains(target)) setRoleSwitcherOpen(false);
      if (!notificationRef.current?.contains(target)) setNotificationsOpen(false);
      if (!profileRef.current?.contains(target)) setUserMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setRoleSwitcherOpen(false);
      setNotificationsOpen(false);
      setUserMenuOpen(false);
      setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    window.localStorage.setItem("modelsentinel-sidebar", next ? "collapsed" : "expanded");
  };

  const handleMenuButton = () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      setOpen(true);
      return;
    }
    toggleSidebar();
  };

  const { setCommandPaletteOpen, setRegisterModalOpen, stage, drifted, user, logout, switchRole } = useDemo();

  useEffect(() => {
    if (path === "/register") setRegisterModalOpen(true);
  }, [path, setRegisterModalOpen]);

  const alertBadgeCount = stage === "alert" || drifted ? 1 : 0;

  const openSearch = () => {
    setRoleSwitcherOpen(false);
    setNotificationsOpen(false);
    setUserMenuOpen(false);
    setCommandPaletteOpen(true);
  };

  const handleSignOut = () => {
    logout();
    router.push("/login");
  };

  const nav = appNavigation(user.role);

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
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      {open && (
        <button
          className="mobile-nav-backdrop"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside className={open ? "open" : ""} aria-label="Primary navigation">
        <div className="side-head">
          <Brand compact={collapsed} />
          <button aria-label="Close navigation" className="icon-btn mobile-only" onClick={() => setOpen(false)}>
            <X size={16} />
          </button>
          <button aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} className="sidebar-collapse-btn desktop-only" onClick={toggleSidebar}>{collapsed?<PanelLeftOpen/>:<PanelLeftClose/>}</button>
        </div>

        <div className="role-persona-banner" title={user.role}>
          <span>ACTIVE PERSONA</span>
          <strong>{user.role}</strong>
        </div>

        <nav>
          {nav.slice(0,-1).map(({label:n,href:h,icon:I}) => (
            <Link
              aria-label={n}
              title={n}
              onClick={() => setOpen(false)}
              className={isNavigationActive(path,h) ? "active" : ""}
              href={h}
              key={h}
            >
              <I size={17} />
              <span className="nav-label">{n}</span>
              {n.includes("Alerts") && alertBadgeCount > 0 && <b className="alert-badge">{alertBadgeCount}</b>}
              {n.includes("Incidents") && alertBadgeCount > 0 && <b className="alert-badge">{alertBadgeCount}</b>}
            </Link>
          ))}
        </nav>

        <div className="side-actions-box">
          <Link title="Register Model" href="/register" className={`register-nav-btn ${path === "/register" ? "active" : ""}`} onClick={() => setOpen(false)}>
            <PlusCircle size={15} /> <span className="nav-label">Register Model</span>
          </Link>
        </div>

        <div className="side-bottom">
          <DemoBadge />
          <div className="active-persona-sidebar-tag">
            <span>ACTIVE PERSONA</span>
            <strong>{user.role.toUpperCase()}</strong>
          </div>
          <Link title="Settings" href="/settings" className={path === "/settings" ? "active" : ""}>
            <Settings size={17} />
            <span className="nav-label">Settings</span>
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
          <button
            aria-label={collapsed ? "Open sidebar" : "Collapse sidebar"}
            className="icon-btn mobile-menu-btn"
            onClick={handleMenuButton}
            title={collapsed ? "Open sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <Menu size={18} /> : <PanelLeftClose size={18} />}
          </button>

          <div className="mobile-top-brand"><Brand /></div>

          <button className="search clickable" aria-label="Search" onClick={openSearch} title="Search">
            <Search size={14} />
            <span>Search models, alerts, fingerprints...</span>
            <kbd>
              <Command size={10} /> K
            </kbd>
          </button>


          <div className="top-actions">
            <div className="nav-popover" ref={notificationRef}>
            <button aria-label="Notifications"
              className="icon-btn action-badge-btn"
              onClick={() => {setNotificationsOpen(!notificationsOpen);setUserMenuOpen(false);setRoleSwitcherOpen(false)}}
              title="Notifications"
            >
              <Bell size={17} />
              {alertBadgeCount > 0 && !notificationsRead && <i className="pulse-dot" />}
            </button>
            {notificationsOpen && <div className="notification-panel"><div className="notification-head"><strong>Notifications</strong><button onClick={()=>setNotificationsRead(true)}>Mark all read</button></div>{[["critical","Possible Model Swap","Sentiment Pro · 2 minutes ago"],["warning","Latency degradation","VisionGuard · 18 minutes ago"],["resolved","FraudShield resolved","Returned to baseline · 1 hour ago"]].map(([level,title,meta])=><button key={title} onClick={()=>{setNotificationsOpen(false);router.push("/alerts")}}><i className={level}/><div><strong>{title}</strong><span>{meta}</span></div></button>)}<Link href="/alerts" onClick={()=>setNotificationsOpen(false)}>View all incidents →</Link></div>}
            </div>

            <button
              className="button primary sm header-reg-btn"
              onClick={() => router.push("/register")}
              title="Certify model"
            >
              <PlusCircle size={14} /><span className="certify-full">Certify Model</span><span className="certify-short">Certify</span>
            </button>

            {/* Profile Dropdown Menu */}
            <div className="profile-menu-container" ref={profileRef}>
              <button aria-label="Account"
                className="avatar-btn"
                onClick={() => {setUserMenuOpen(!userMenuOpen);setNotificationsOpen(false);setRoleSwitcherOpen(false)}}
                title="Account"
              >
                <span className="avatar">{user.initials}</span>
                <ChevronDown size={12} className="avatar-arrow" />
              </button>

              {userMenuOpen && (
                <div className="user-dropdown-menu" onClick={() => setUserMenuOpen(false)}>
                  <div className="user-dropdown-header">
                    <div className="dropdown-avatar">{user.initials}</div><div><strong>{user.name}</strong><small>{user.role}</small></div>
                  </div>
                  <div className="user-dropdown-divider" />
                  <Link href="/settings" className="user-dropdown-item">
                    <UserRound size={14} /> Profile
                  </Link>
                  <Link href="/settings" className="user-dropdown-item">
                    <SlidersHorizontal size={14} /> Preferences
                  </Link>
                  <Link href="/settings" className="user-dropdown-item">
                    <Settings size={14} /> Settings
                  </Link>
                  <button className="user-dropdown-item danger" onClick={handleSignOut}>
                    <LogOut size={14} /> Sign Out
                  </button>
                  <div className="demo-menu-label"><CircleDot size={11}/> Demo Environment</div>
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
