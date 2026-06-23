import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sideonai — AI를 더하면 달라진다",
  description:
    "어떤 도메인이든, 어떤 직무든 AI를 더해 새로운 가능성을 만듭니다. Sideonai의 포트폴리오 & 브랜딩 사이트.",
  openGraph: {
    title: "Sideonai",
    description: "AI를 어떤 도메인에든 더하는 사람",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
