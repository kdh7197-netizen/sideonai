"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.floor((canvas.width * canvas.height) / 14000);
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const CONNECT_DIST = 120;
      const MOUSE_DIST = 180;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_DIST) {
          const force = (MOUSE_DIST - dist) / MOUSE_DIST;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        // damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // wrap edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
        ctx.fill();

        // draw edges
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ex = p.x - q.x;
          const ey = p.y - q.y;
          const edgeDist = Math.sqrt(ex * ex + ey * ey);
          if (edgeDist < CONNECT_DIST) {
            const alpha = (1 - edgeDist / CONNECT_DIST) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* grid bg overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" style={{ zIndex: 1 }} />

      {/* gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #0a0a0a 100%)",
          zIndex: 2,
        }}
      />

      {/* content */}
      <div
        className="relative text-center px-6 max-w-4xl mx-auto"
        style={{ zIndex: 3 }}
      >
        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p
            className="text-sm font-medium tracking-[0.3em] uppercase mb-6"
            style={{ color: "#06b6d4", fontFamily: "var(--font-space-grotesk)" }}
          >
            AI × Domain
          </p>
          <h1
            className="text-6xl md:text-8xl font-bold leading-none mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-gradient">Side</span>
            <span style={{ color: "#f0f0f0" }}>on</span>
            <span className="text-gradient">AI</span>
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
            style={{ color: "rgba(240,240,240,0.6)" }}
          >
            어떤 도메인이든, 어떤 직무든.
            <br />
            AI를 더하는 순간 완전히 달라집니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#works"
              className="px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              프로젝트 보기
            </a>
            <a
              href="#sidejob"
              className="px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              style={{
                border: "1px solid rgba(139,92,246,0.4)",
                color: "#8b5cf6",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              퇴근후 딴짓 ↓
            </a>
          </div>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 3, opacity: 0.4 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "#8b5cf6" }}>
          scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, #8b5cf6, transparent)",
          }}
        />
      </div>
    </section>
  );
}
