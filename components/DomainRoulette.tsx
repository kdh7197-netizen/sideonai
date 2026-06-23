"use client";

import { useState, useRef, useEffect } from "react";

const domains: { job: string; desc: string }[] = [
  { job: "제빵사", desc: "재고 예측 AI가 오늘 몇 개 구워야 할지 알려줍니다." },
  { job: "국회의원", desc: "AI가 민원 수천 건을 분석해 핵심 이슈를 3줄로 요약합니다." },
  { job: "웨딩 플래너", desc: "AI가 커플 취향을 분석해 완벽한 웨딩 컨셉을 제안합니다." },
  { job: "수의사", desc: "반려동물 증상 사진을 AI가 분석해 사전 진단 레포트를 생성합니다." },
  { job: "경찰관", desc: "AI가 순찰 경로를 최적화하고 이상 패턴을 실시간 감지합니다." },
  { job: "셰프", desc: "냉장고 속 재료를 AI가 스캔해 오늘의 레시피를 추천합니다." },
  { job: "건축가", desc: "AI가 도면을 분석해 에너지 효율 최적화 방안을 시뮬레이션합니다." },
  { job: "심리상담사", desc: "AI가 상담 노트를 분석해 패턴과 위험 신호를 사전에 감지합니다." },
  { job: "소방관", desc: "AI가 건물 도면과 센서 데이터를 종합해 최적 진입 경로를 안내합니다." },
  { job: "작곡가", desc: "AI가 청중의 감정 데이터를 기반으로 멜로디를 공동 작곡합니다." },
  { job: "농부", desc: "드론 + AI가 작물 상태를 실시간 분석해 정밀 시비를 자동화합니다." },
  { job: "판사", desc: "AI가 유사 판례를 즉시 검색하고 양형 기준을 제안합니다." },
  { job: "유튜버", desc: "AI가 썸네일 클릭률과 시청 지속률을 예측해 콘텐츠 전략을 코칭합니다." },
  { job: "간호사", desc: "AI가 환자 활력징후를 모니터링하고 이상 징후를 0.1초 만에 알립니다." },
  { job: "택배 기사", desc: "AI가 실시간 교통+날씨를 분석해 최적 배송 루트를 매분 갱신합니다." },
  { job: "회계사", desc: "AI가 영수증 수천 장을 자동 분류하고 절세 포인트를 찾아냅니다." },
  { job: "사진작가", desc: "AI가 RAW 파일을 분석해 촬영 현장의 최적 보정값을 자동 적용합니다." },
  { job: "번역가", desc: "AI가 초안을 생성하면 번역가는 뉘앙스와 문화적 맥락만 다듬습니다." },
];

export default function DomainRoulette() {
  const [current, setCurrent] = useState<{ job: string; desc: string }>(domains[0]);
  const [spinning, setSpinning] = useState(false);
  const [spinItems, setSpinItems] = useState<string[]>([]);
  const [spinOffset, setSpinOffset] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const shuffled = [...domains].sort(() => Math.random() - 0.5).slice(0, 20);
    const targetIndex = Math.floor(Math.random() * domains.length);
    const target = domains[targetIndex];
    shuffled.push(target);

    setSpinItems(shuffled.map((d) => d.job));
    setSpinOffset(0);

    let step = 0;
    const totalSteps = shuffled.length;
    let speed = 60;

    const tick = () => {
      step++;
      setSpinOffset((prev) => prev + 1);
      if (step < totalSteps * 0.6) {
        speed = 60;
      } else {
        speed = 60 + (step - totalSteps * 0.6) * 18;
      }

      if (step >= totalSteps) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setSpinning(false);
        setCurrent(target);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(tick, Math.min(speed, 400));
      }
    };

    intervalRef.current = setInterval(tick, speed);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const displayJob = spinning && spinItems.length > 0
    ? spinItems[Math.min(spinOffset, spinItems.length - 1)]
    : current.job;

  return (
    <div className="relative p-8 rounded-2xl" style={{ background: "rgba(17,17,17,0.8)", border: "1px solid rgba(139,92,246,0.2)" }}>
      <div className="text-center mb-8">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-3"
          style={{ color: "#8b5cf6" }}
        >
          AI + ??? 룰렛
        </p>
        <h3
          className="text-xl font-bold"
          style={{ fontFamily: "var(--font-space-grotesk)", color: "#f0f0f0" }}
        >
          어떤 직업에 AI를 더할까?
        </h3>
      </div>

      {/* slot display */}
      <div
        className="relative mx-auto mb-6 rounded-xl overflow-hidden flex items-center justify-center"
        style={{
          height: "80px",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid rgba(139,92,246,0.3)",
          maxWidth: "320px",
        }}
      >
        {/* scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          }}
        />
        {/* glow line */}
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            top: "50%",
            background: "linear-gradient(to right, transparent, rgba(139,92,246,0.6), transparent)",
          }}
        />

        <div
          className="text-3xl font-bold transition-none"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            color: spinning ? "#8b5cf6" : "#f0f0f0",
            transition: spinning ? "none" : "color 0.3s",
            letterSpacing: "-0.02em",
          }}
        >
          {spinning ? (
            <span style={{ animation: "none", display: "inline-block" }}>
              {displayJob}
            </span>
          ) : (
            `AI + ${displayJob}`
          )}
        </div>
      </div>

      {/* desc card */}
      <div
        className="rounded-xl p-4 mb-6 min-h-[70px] flex items-center justify-center text-center transition-all duration-500"
        style={{
          background: "rgba(139,92,246,0.06)",
          border: "1px solid rgba(139,92,246,0.12)",
          opacity: spinning ? 0.3 : 1,
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "rgba(240,240,240,0.7)" }}>
          {current.desc}
        </p>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="w-full py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: spinning
            ? "rgba(139,92,246,0.3)"
            : "linear-gradient(135deg, #8b5cf6, #06b6d4)",
          fontFamily: "var(--font-space-grotesk)",
        }}
      >
        {spinning ? "돌아가는 중..." : "🎰 돌려봐!"}
      </button>

      <p
        className="text-center text-xs mt-3"
        style={{ color: "rgba(240,240,240,0.25)" }}
      >
        {domains.length}가지 직업 중 랜덤 선택
      </p>
    </div>
  );
}
