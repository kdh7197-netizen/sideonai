"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";

function getMessageText(
  parts: Array<{ type: string; text?: string }>,
): string {
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const { messages, sendMessage, status, error } = useChat({
    onError: async (err) => {
      try {
        const body = await (err as unknown as Response).json?.();
        if (body?.error) {
          setApiError(body.error);
          return;
        }
      } catch {}
      setApiError(err.message || "오류가 발생했습니다. 다시 시도해 주세요.");
    },
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;

    setApiError(null);
    sendMessage({ text });
    setInput("");
  };

  return (
    <>
      {open && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden"
          style={{
            bottom: "5.5rem",
            right: "1.5rem",
            width: "min(24rem, calc(100vw - 2rem))",
            height: "min(32rem, calc(100vh - 8rem))",
            background: "#111111",
            border: "1px solid rgba(139, 92, 246, 0.25)",
            borderRadius: "1rem",
            boxShadow:
              "0 0 20px rgba(139, 92, 246, 0.15), 0 20px 60px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(6,182,212,0.08))",
            }}
          >
            <div>
              <p
                className="text-sm font-bold"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span style={{ color: "#8b5cf6" }}>Side</span>
                <span style={{ color: "#f0f0f0" }}>on</span>
                <span style={{ color: "#06b6d4" }}>AI</span>
                <span style={{ color: "rgba(240,240,240,0.5)" }}> Chat</span>
              </p>
              <p className="text-xs" style={{ color: "rgba(240,240,240,0.4)" }}>
                무엇이든 물어보세요
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-lg leading-none transition-opacity hover:opacity-100"
              style={{ color: "rgba(240,240,240,0.4)" }}
              aria-label="채팅 닫기"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <p
                className="text-sm text-center py-8"
                style={{ color: "rgba(240,240,240,0.35)" }}
              >
                SideonAI에 대해 궁금한 점을 물어보세요.
              </p>
            )}

            {messages.map((message) => {
              const text = getMessageText(message.parts);
              if (!text) return null;

              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[85%] px-3 py-2 text-sm whitespace-pre-wrap"
                    style={{
                      borderRadius: isUser
                        ? "1rem 1rem 0.25rem 1rem"
                        : "1rem 1rem 1rem 0.25rem",
                      background: isUser
                        ? "rgba(139, 92, 246, 0.25)"
                        : "rgba(255,255,255,0.05)",
                      color: "#f0f0f0",
                      border: isUser
                        ? "1px solid rgba(139, 92, 246, 0.3)"
                        : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {text}
                  </div>
                </div>
              );
            })}

            {isBusy && messages.at(-1)?.role === "user" && (
              <div className="flex justify-start">
                <div
                  className="px-3 py-2 text-sm"
                  style={{
                    borderRadius: "1rem 1rem 1rem 0.25rem",
                    background: "rgba(255,255,255,0.05)",
                    color: "rgba(240,240,240,0.5)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  입력 중...
                </div>
              </div>
            )}

            {(error || apiError) && (
              <div
                className="text-xs text-center px-3 py-2 rounded-lg mx-2"
                style={{
                  color: "#fca5a5",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                {apiError || error?.message || "오류가 발생했습니다. 다시 시도해 주세요."}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 p-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="메시지를 입력하세요..."
              disabled={isBusy}
              className="flex-1 px-3 py-2 text-sm outline-none disabled:opacity-50"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "0.75rem",
                color: "#f0f0f0",
              }}
            />
            <button
              type="submit"
              disabled={isBusy || !input.trim()}
              className="px-4 py-2 text-sm font-medium transition-opacity disabled:opacity-40"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                borderRadius: "0.75rem",
                color: "#fff",
                fontFamily: "var(--font-space-grotesk)",
              }}
            >
              전송
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed z-50 flex items-center justify-center transition-transform hover:scale-105"
        style={{
          bottom: "1.5rem",
          right: "1.5rem",
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "9999px",
          background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
          boxShadow: "0 0 20px rgba(139, 92, 246, 0.4)",
          color: "#fff",
          fontSize: "1.25rem",
        }}
        aria-label={open ? "채팅 닫기" : "채팅 열기"}
      >
        {open ? "×" : "AI"}
      </button>
    </>
  );
}
