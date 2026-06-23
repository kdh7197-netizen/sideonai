import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const PLACEHOLDER_PREFIXES = ["sk-placeholder", "your-", "replace-"];

function isPlaceholderKey(key: string) {
  return PLACEHOLDER_PREFIXES.some((prefix) =>
    key.toLowerCase().startsWith(prefix)
  );
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || isPlaceholderKey(apiKey)) {
    return Response.json(
      {
        error:
          "OpenAI API 키가 설정되지 않았습니다. Vercel 대시보드에서 OPENAI_API_KEY를 실제 키로 등록해 주세요.",
      },
      { status: 503 },
    );
  }

  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system:
        "You are SideonAI's helpful assistant on the SideonAI portfolio website. SideonAI applies AI across any domain or job role. Answer in Korean unless the user writes in another language. Be concise, friendly, and helpful.",
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    const message =
      error instanceof Error ? error.message : "알 수 없는 오류";
    return Response.json(
      { error: `채팅 처리 중 오류가 발생했습니다: ${message}` },
      { status: 500 },
    );
  }
}
