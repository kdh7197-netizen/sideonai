"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    tag: "AI × 고객 서비스",
    title: "상담 자동화 파이프라인",
    desc: "콜센터 상담 내용을 실시간 분석하고 답변 초안을 자동 생성. 상담사의 평균 처리 시간 40% 단축.",
    stack: ["LLM", "RAG", "FastAPI"],
    accent: "#8b5cf6",
    metric: "−40% 처리시간",
  },
  {
    tag: "AI × 교육",
    title: "학습 경로 추천 엔진",
    desc: "학생별 오답 패턴과 학습 이력을 분석해 개인화된 다음 학습 단계를 추천하는 AI 튜터 시스템.",
    stack: ["GPT-4o", "Vector DB", "Next.js"],
    accent: "#06b6d4",
    metric: "+62% 완주율",
  },
  {
    tag: "AI × 콘텐츠",
    title: "뉴스레터 자동 큐레이터",
    desc: "수백 개의 RSS 피드를 매일 수집·분류·요약해 에디터가 5분 안에 뉴스레터를 발행할 수 있도록 지원.",
    stack: ["Claude", "n8n", "Supabase"],
    accent: "#a78bfa",
    metric: "5분 발행",
  },
  {
    tag: "AI × HR",
    title: "채용 인터뷰 코치 봇",
    desc: "직무 JD를 분석하고 예상 질문을 생성. 답변을 평가해 구체적 피드백을 제공하는 인터뷰 준비 도구.",
    stack: ["GPT-4o-mini", "Vercel AI SDK", "Streaming"],
    accent: "#22d3ee",
    metric: "JD → 질문 30초",
  },
];

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative p-6 rounded-2xl cursor-default transition-all duration-500"
      style={{
        background: hovered
          ? "rgba(20,20,20,0.95)"
          : "rgba(17,17,17,0.7)",
        border: `1px solid ${hovered ? project.accent + "55" : "rgba(255,255,255,0.06)"}`,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? "translateY(-4px)"
            : "translateY(0)"
          : "translateY(28px)",
        boxShadow: hovered
          ? `0 8px 32px ${project.accent}22`
          : "none",
      }}
    >
      {/* metric badge */}
      <div
        className="absolute top-5 right-5 text-xs font-bold px-3 py-1 rounded-full"
        style={{
          background: `${project.accent}18`,
          color: project.accent,
          border: `1px solid ${project.accent}33`,
          fontFamily: "var(--font-space-grotesk)",
        }}
      >
        {project.metric}
      </div>

      <p
        className="text-xs tracking-widest uppercase mb-3"
        style={{ color: project.accent, opacity: 0.8 }}
      >
        {project.tag}
      </p>
      <h3
        className="text-xl font-bold mb-3"
        style={{ fontFamily: "var(--font-space-grotesk)", color: "#f0f0f0" }}
      >
        {project.title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-5"
        style={{ color: "rgba(240,240,240,0.55)" }}
      >
        {project.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs px-2 py-1 rounded"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "rgba(240,240,240,0.5)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* left accent bar */}
      <div
        className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full transition-all duration-300"
        style={{
          background: project.accent,
          opacity: hovered ? 0.8 : 0.2,
        }}
      />
    </div>
  );
}

export default function WorksSection() {
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
    <section id="works" className="py-28 px-6">
      <div
        className="absolute left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(139,92,246,0.3), transparent)" }}
      />
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
            style={{ color: "#8b5cf6" }}
          >
            Works
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            AI를 더한 <span className="text-gradient">결과들</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
