"use client";

import { useRef, useState, useEffect, useCallback } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
  born: number;
}

const CONNECT_DIST = 100;
const MAX_NODES = 100;

const PHASES = [
  { threshold: 0, label: "데이터 수집 중", color: "#4b5563" },
  { threshold: 10, label: "패턴 감지 시작", color: "#6d28d9" },
  { threshold: 25, label: "신경망 형성 중", color: "#8b5cf6" },
  { threshold: 50, label: "딥러닝 가동!", color: "#7c3aed" },
  { threshold: 75, label: "AGI 근접...", color: "#06b6d4" },
  { threshold: MAX_NODES, label: "🎉 AI 탄생!", color: "#22d3ee" },
];

function getCurrentPhase(count: number) {
  let phase = PHASES[0];
  for (const p of PHASES) {
    if (count >= p.threshold) phase = p;
  }
  return phase;
}

export default function NeuralClicker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animRef = useRef<number>(0);
  const nodeIdRef = useRef(0);
  const [count, setCount] = useState(0);
  const [burst, setBurst] = useState<{ x: number; y: number; id: number } | null>(null);
  const [completed, setCompleted] = useState(false);
  const phaseRef = useRef(getCurrentPhase(0));

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const nodes = nodesRef.current;
    const now = Date.now();

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const age = (now - n.born) / 300;
      const ageFactor = Math.min(age, 1);

      // draw edges first
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.35 * ageFactor;
          const phase = phaseRef.current;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = phase.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    for (const n of nodes) {
      const age = (now - n.born) / 300;
      const ageFactor = Math.min(age, 1);
      const pulse = 0.7 + 0.3 * Math.sin(now / 800 + n.pulsePhase);
      const phase = phaseRef.current;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius * ageFactor, 0, Math.PI * 2);
      ctx.fillStyle = phase.color;
      ctx.globalAlpha = n.opacity * ageFactor * pulse;
      ctx.fill();
      ctx.globalAlpha = 1;

      // glow ring
      ctx.beginPath();
      ctx.arc(n.x, n.y, (n.radius + 3) * ageFactor, 0, Math.PI * 2);
      ctx.strokeStyle = phase.color;
      ctx.globalAlpha = 0.15 * ageFactor * pulse;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (completed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (nodesRef.current.length >= MAX_NODES) {
      setCompleted(true);
      return;
    }

    const newNode: Node = {
      id: nodeIdRef.current++,
      x,
      y,
      radius: Math.random() * 3 + 2,
      opacity: Math.random() * 0.4 + 0.6,
      pulsePhase: Math.random() * Math.PI * 2,
      born: Date.now(),
    };

    nodesRef.current = [...nodesRef.current, newNode];
    const newCount = nodesRef.current.length;
    phaseRef.current = getCurrentPhase(newCount);
    setCount(newCount);

    setBurst({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() });
    setTimeout(() => setBurst(null), 600);

    if (newCount >= MAX_NODES) {
      setCompleted(true);
    }
  };

  const reset = () => {
    nodesRef.current = [];
    phaseRef.current = getCurrentPhase(0);
    setCount(0);
    setCompleted(false);
  };

  const phase = getCurrentPhase(count);
  const progress = (count / MAX_NODES) * 100;

  return (
    <div className="relative p-6 rounded-2xl" style={{ background: "rgba(17,17,17,0.8)", border: "1px solid rgba(6,182,212,0.2)" }}>
      <div className="text-center mb-4">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-2"
          style={{ color: "#06b6d4" }}
        >
          뉴럴 클리커
        </p>
        <h3
          className="text-xl font-bold mb-1"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#f0f0f0" }}
        >
          AI를 직접 만들어봐
        </h3>
        <p className="text-xs" style={{ color: "rgba(240,240,240,0.4)" }}>
          캔버스를 클릭해서 뉴런을 심어보세요. {MAX_NODES}개가 되면 AI가 탄생합니다!
        </p>
      </div>

      {/* phase indicator */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full transition-all duration-500"
          style={{
            background: phase.color + "22",
            color: phase.color,
            border: `1px solid ${phase.color}44`,
            fontFamily: "var(--font-space-grotesk)",
          }}
        >
          {phase.label}
        </span>
        <span
          className="text-sm font-bold tabular-nums"
          style={{ color: phase.color, fontFamily: "var(--font-space-grotesk)" }}
        >
          {count} / {MAX_NODES}
        </span>
      </div>

      {/* progress bar */}
      <div
        className="h-1.5 rounded-full mb-3 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(to right, #8b5cf6, ${phase.color})`,
          }}
        />
      </div>

      {/* canvas */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          height: "260px",
          background: "rgba(0,0,0,0.5)",
          border: `1px solid ${phase.color}22`,
          cursor: completed ? "default" : "crosshair",
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          onClick={handleClick}
        />

        {/* burst effect */}
        {burst && (
          <div
            key={burst.id}
            className="absolute pointer-events-none"
            style={{
              left: burst.x,
              top: burst.y,
              transform: "translate(-50%, -50%)",
              animation: "burstOut 0.6s ease-out forwards",
            }}
          >
            <div
              className="w-8 h-8 rounded-full border-2"
              style={{
                borderColor: phase.color,
                animation: "burstRing 0.6s ease-out forwards",
              }}
            />
          </div>
        )}

        {/* completed overlay */}
        {completed && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          >
            <div className="text-4xl mb-3">🎉</div>
            <p
              className="text-xl font-bold mb-1"
              style={{ fontFamily: "var(--font-space-grotesk)", color: "#22d3ee" }}
            >
              AI 탄생!
            </p>
            <p className="text-xs mb-4" style={{ color: "rgba(240,240,240,0.5)" }}>
              {count}개의 뉴런으로 신경망 완성
            </p>
            <button
              onClick={reset}
              className="px-6 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                color: "#fff",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              다시 시작
            </button>
          </div>
        )}

        {count === 0 && !completed && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <p className="text-sm" style={{ color: "rgba(240,240,240,0.2)" }}>
              여기를 클릭하세요 ✦
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes burstRing {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(3); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
