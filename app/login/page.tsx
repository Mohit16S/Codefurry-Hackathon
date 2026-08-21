"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { useDemo, UserRole } from "@/components/demo-provider";
import { ArrowRight, Lock, Mail, Briefcase, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useDemo();

  const [email, setEmail] = useState("mohit@modelsentinel.demo");
  const [password, setPassword] = useState("EnterprisePass2026!");
  const [role, setRole] = useState<UserRole>("AI Security Engineer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const getRoleRoute = (r: UserRole) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, role);
      router.push(getRoleRoute(role));
    }, 500);
  };

  return (
    <div className="auth-page-container">
      <motion.div
        className="auth-card-clean"
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="auth-brand-center">
          <Brand />
        </div>

        <div className="auth-card-header">
          <h1>Sign in to ModelSentinel</h1>
          <p>Continuous AI Model Trust & Security Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form-clean">
          <div className="form-field-group">
            <label htmlFor="login-email">Work Email</label>
            <div className="input-wrap-clean">
              <Mail size={16} className="input-icon-clean" />
              <input
                id="login-email"
                type="email"
                required
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-field-group">
            <label htmlFor="login-role">Workspace Role</label>
            <div className="input-wrap-clean">
              <Briefcase size={16} className="input-icon-clean" />
              <select
                id="login-role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="select-clean"
              >
                <option value="AI Security Engineer">AI Security Engineer</option>
                <option value="ML SecOps Lead">ML SecOps Lead</option>
                <option value="Chief AI Risk Officer">Chief AI Risk Officer</option>
                <option value="Compliance Auditor">Compliance Auditor</option>
              </select>
            </div>
          </div>

          <div className="form-field-group">
            <div className="label-flex-row">
              <label htmlFor="login-password">Password</label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Password reset link sent to " + email);
                }}
                className="forgot-password-link"
              >
                Forgot password?
              </a>
            </div>
            <div className="input-wrap-clean">
              <Lock size={16} className="input-icon-clean" />
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button type="submit" className="button primary large w-full auth-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner" /> Signing in...
              </>
            ) : (
              <>
                Sign in <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>

        <div className="auth-card-footer">
          <span>Don't have an account?</span>
          <Link href="/signup">Create one</Link>
        </div>
      </motion.div>
    </div>
  );
}
