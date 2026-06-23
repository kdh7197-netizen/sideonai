"use client";

import { useEffect, useRef, useState } from "react";
import DomainRoulette from "./DomainRoulette";
import NeuralClicker from "./NeuralClicker";

export default function SidejobSection() {
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
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sidejob" className="py-28 px-6 relative">
      {/* divider line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(6,182,212,0.4), transparent)" }}
      />

      {/* bg noise/glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative">
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
            퇴근후 딴짓
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <span className="text-gradient">일 끝나고</span> 만든 것들
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(240,240,240,0.5)" }}
          >
            퇴근 후 24시간이 진짜 실험실입니다. 직접 놀아보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <NeuralClicker />
          <DomainRoulette />
        </div>

        {/* bottom note */}
        <div
          className="text-center mt-12 py-6 rounded-2xl"
          style={{
            background: "rgba(139,92,246,0.04)",
            border: "1px solid rgba(139,92,246,0.1)",
          }}
        >
          <p className="text-sm" style={{ color: "rgba(240,240,240,0.4)" }}>
            이것들도 결국 AI를 더한 딴짓에서 시작됐습니다 ✦
          </p>
        </div>
      </div>
    </section>
  );
}
