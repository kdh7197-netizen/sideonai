![Sideonai Banner](./docs/banner.png)

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-vercel-black?style=for-the-badge&logo=vercel)](https://verceltest-ecru-six.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06b6d4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)

**어떤 도메인이든, 어떤 직무든 — AI를 더하는 순간 완전히 달라집니다.**

</div>

---

## 소개

Sideonai는 AI를 다양한 도메인과 직무에 접목하는 개인 브랜딩 사이트입니다.  
단순한 포트폴리오를 넘어, AI와 함께하는 관점 자체를 보여주는 공간입니다.

## 주요 기능

### Hero — 뉴럴 파티클 애니메이션
마우스를 움직이면 반응하는 실시간 뉴럴 네트워크 파티클. Canvas API + `requestAnimationFrame`으로 구현.

### Philosophy — AI × Domain 철학
"AI는 도구가 아니라 관점입니다." 스크롤 인터섹션 페이드인 애니메이션 카드 4종.

### Works — 프로젝트 쇼케이스
고객 서비스 / 교육 / 콘텐츠 / HR 등 실제 도메인에 AI를 적용한 프로젝트 카드. 호버 시 글로우 효과.

### 퇴근후 딴짓 — 인터랙티브 게임 2종

![퇴근후 딴짓 섹션](./docs/games.png)

| 게임 | 설명 |
|------|------|
| **뉴럴 클리커** | 캔버스를 클릭해 뉴런을 심으면 서로 연결되는 신경망 게임. 100개 달성 시 "AI 탄생!" 이벤트 |
| **AI 도메인 룰렛** | 버튼 클릭 시 18가지 직업 중 랜덤으로 "AI + 직업" 조합 생성. 슬롯머신 스타일 애니메이션 |

### AI 챗봇 위젯
우측 하단 플로팅 버튼으로 열리는 SideonAI 챗봇. OpenAI GPT-4o-mini 기반.

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Language | TypeScript 5 |
| AI | Vercel AI SDK + OpenAI GPT-4o-mini |
| Font | Space Grotesk (display) + Inter (body) |
| Deploy | Vercel |

## 로컬 실행

```bash
# 패키지 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local에 OPENAI_API_KEY 입력

# 개발 서버 시작
npm run dev
```

`http://localhost:3000` 에서 확인

## 환경 변수

```env
# OpenAI API 키 (챗봇 기능에 필요)
OPENAI_API_KEY=sk-...

# 사이트 정보
NEXT_PUBLIC_SITE_URL=https://verceltest-ecru-six.vercel.app
NEXT_PUBLIC_SITE_NAME=Sideonai
```

## 배포

Vercel에 연결된 GitHub 레포를 push하면 자동 배포됩니다.

```bash
# 프리뷰 배포
npx vercel

# 프로덕션 배포
npx vercel --prod
```

---

<div align="center">

**[🌐 라이브 사이트](https://verceltest-ecru-six.vercel.app)** · Made by Sideonai

</div>
