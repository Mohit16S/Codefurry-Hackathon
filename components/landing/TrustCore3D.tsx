"use client";

import React, { useEffect, useRef } from "react";

export function TrustCore3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 500);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetMouseX = (x / rect.width) * 0.4;
      targetMouseY = (y / rect.height) * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Sequential Signal Node Index (0: VERIFY, 1: FINGERPRINT, 2: MONITOR, 3: DRIFT, 4: TRUST)
    let activeNodeIndex = 0;
    const signalInterval = setInterval(() => {
      activeNodeIndex = (activeNodeIndex + 1) % 5;
    }, 1600);

    const nodes = [
      { label: "VERIFY", angle: 0, speed: 0.008, radius: 165, color: "#1677FF" },
      { label: "FINGERPRINT", angle: 1.25, speed: 0.006, radius: 140, color: "#2196FF" },
      { label: "MONITOR", angle: 2.5, speed: -0.007, radius: 175, color: "#0B3D91" },
      { label: "DRIFT", angle: 3.75, speed: 0.005, radius: 145, color: "#EF4444" },
      { label: "TRUST", angle: 5.0, speed: -0.009, radius: 155, color: "#1677FF" },
    ];

    const particleCount = 52;
    const particles = Array.from({ length: particleCount }, () => ({
      orbitRadius: 85 + Math.random() * 105,
      angle: Math.random() * Math.PI * 2,
      speed: (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      size: Math.random() * 2.2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }));

    let rotationTime = 0;

    const render = () => {
      // Smooth interpolation for mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const coreScale = Math.min(width, height) / 500;

      ctx.save();
      ctx.translate(centerX, centerY);

      // Apply mouse tilt transformation
      const tiltX = mouseY * 0.2;
      const tiltY = mouseX * 0.2;

      // 1. Core Breathing Glow
      const breathScale = 1 + Math.sin(rotationTime * 1.5) * 0.04;
      const bgGlow = ctx.createRadialGradient(0, 0, 10 * coreScale, 0, 0, (210 * breathScale) * coreScale);
      bgGlow.addColorStop(0, "rgba(22, 119, 255, 0.38)");
      bgGlow.addColorStop(0.5, "rgba(11, 61, 145, 0.14)");
      bgGlow.addColorStop(1, "rgba(5, 7, 13, 0)");
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(0, 0, (210 * breathScale) * coreScale, 0, Math.PI * 2);
      ctx.fill();

      // 2. Concentric Orbit Rings (3D Ellipses)
      const orbits = [
        { rx: 200 * coreScale, ry: 75 * coreScale, rot: rotationTime * 0.4 + tiltY, color: "rgba(22, 119, 255, 0.35)" },
        { rx: 165 * coreScale, ry: 105 * coreScale, rot: -rotationTime * 0.3 + tiltX, color: "rgba(33, 150, 255, 0.28)" },
        { rx: 130 * coreScale, ry: 125 * coreScale, rot: rotationTime * 0.6 + tiltY, color: "rgba(11, 61, 145, 0.28)" },
        { rx: 90 * coreScale, ry: 145 * coreScale, rot: -rotationTime * 0.5 + tiltX, color: "rgba(255, 45, 45, 0.18)" },
      ];

      orbits.forEach((orbit) => {
        ctx.save();
        ctx.rotate(orbit.rot);
        ctx.beginPath();
        ctx.ellipse(0, 0, orbit.rx, orbit.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = orbit.color;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.restore();
      });

      // 3. Render Orbit Data Particles
      particles.forEach((p) => {
        p.angle += p.speed;
        const px = Math.cos(p.angle + tiltY) * p.orbitRadius * coreScale;
        const py = Math.sin(p.angle + tiltX) * (p.orbitRadius * 0.55) * coreScale;

        ctx.fillStyle = `rgba(143, 199, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * coreScale, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Central Translucent Sphere Core
      ctx.save();
      const coreGrad = ctx.createRadialGradient(-15 * coreScale, -15 * coreScale, 5 * coreScale, 0, 0, (50 * breathScale) * coreScale);
      coreGrad.addColorStop(0, "#ffffff");
      coreGrad.addColorStop(0.3, "#2196FF");
      coreGrad.addColorStop(0.7, "#0B3D91");
      coreGrad.addColorStop(1, "#161B30");

      ctx.shadowColor = "rgba(22, 119, 255, 0.85)";
      ctx.shadowBlur = 32 * coreScale;

      ctx.beginPath();
      ctx.arc(0, 0, (50 * breathScale) * coreScale, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Shield Geometry Grid Line overlay
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, (50 * breathScale) * coreScale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 5. Render Security Nodes & Sequential Signal Pulses
      nodes.forEach((n, idx) => {
        n.angle += n.speed;
        const nx = Math.cos(n.angle + tiltY) * (n.radius * coreScale);
        const ny = Math.sin(n.angle + tiltX) * (n.radius * 0.6 * coreScale);

        const isActiveSignal = idx === activeNodeIndex;

        // Connection line to center
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = isActiveSignal ? "rgba(22, 119, 255, 0.5)" : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = isActiveSignal ? 1.5 : 1;
        ctx.stroke();

        // Node Glow Dot
        ctx.save();
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isActiveSignal ? 22 : 10;
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(nx, ny, (isActiveSignal ? 7 : 5) * coreScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Node Tag Label
        ctx.font = `${isActiveSignal ? "800" : "700"} ${10 * coreScale}px "DM Mono", monospace`;
        ctx.fillStyle = isActiveSignal ? "#2196FF" : "#F8FAFC";
        ctx.textAlign = "center";
        ctx.fillText(n.label, nx, ny + 18 * coreScale);
      });

      ctx.restore();
      rotationTime += 0.012;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 500;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 500;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(signalInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="trust-core-3d-wrapper">
      <canvas ref={canvasRef} className="trust-core-canvas" />
    </div>
  );
}
