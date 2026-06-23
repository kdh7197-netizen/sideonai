"use client";

import { useEffect, useRef, useState } from "react";

const pillars = [
  {
    icon: "◈",
    label: "도메인 불문",
    title: "어디서든 AI",
    desc: "의료, 법률, 교육, 제조, 유통 — 도메인의 경계 없이 AI가 들어갈 여지를 찾습니다.",
    color: "#8b5cf6",
  },
  {
    icon: "⬡",
    label: "직무 불문",
    title: "누구와도 AI",
    desc: "개발자, 기획자, 디자이너, 마케터 — 어떤 직무도 AI 레이어를 올릴 수 있습니다.",
    color: "#06b6d4",
  },
  {
    icon: "⟳",
    label: "반복 → 자동화",
    title: "쌓이면 AI로",
    desc: "사람이 반복하는 모든 것은 AI의 영역입니다. 반복 패턴에서 자동화 기회를 발견합니다.",
    color: "#a78bfa",
  },
  {
    icon: "∞",
    label: "사이드 → 메인",
    title: "딴짓이 무기가 된다",
    desc: "퇴근 후 만든 것들이 진짜 실력이 됩니다. Side project = Lab for AI experiments.",
    color: "#22d3ee",
  },
];

function PillarCard({
  pillar,
  delay,
}: {
  pillar: (typeof pillars)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="relative p-6 rounded-2xl transition-all duration-700"
      style={{
        background: "rgba(17,17,17,0.8)",
        border: `1px solid rgba(${pillar.color === "#8b5cf6" ? "139,92,246" : pillar.color === "#06b6d4" ? "6,182,212" : pillar.color === "#a78bfa" ? "167,139,250" : "34,211,238"},0.15)`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="text-3xl mb-4"
        style={{ color: pillar.color, fontFamily: "monospace" }}
      >
        {pillar.icon}
      </div>
      <p
        className="text-xs tracking-widest uppercase mb-2"
        style={{ color: pillar.color, opacity: 0.8 }}
      >
        {pillar.label}
      </p>
      <h3
        className="text-xl font-bold mb-3"
        style={{ fontFamily: "var(--font-space-grotesk)", color: "#f0f0f0" }}
      >
        {pillar.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,240,0.55)" }}>
        {pillar.desc}
      </p>

      {/* corner accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 rounded-tr-2xl overflow-hidden opacity-20"
        style={{
          background: `linear-gradient(135deg, transparent 50%, ${pillar.color} 50%)`,
        }}
      />
    </div>
  );
}

export default function PhilosophySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="philosophy" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={titleRef}
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "#06b6d4" }}
          >
            Philosophy
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            AI는{" "}
            <span className="text-gradient">도구가 아니라</span>
            <br />
            관점입니다
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
