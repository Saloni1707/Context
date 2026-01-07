import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getMemory, withAlchemyst } from "@/src/lib/withAlchemyst";

const generateTextWithMemory = withAlchemyst(generateText, {});

export async function POST(req: Request) {
  try {
    const { prompt, userId, conversationId } = await req.json();

    if (!prompt || !userId || !conversationId) {
      return Response.json(
        { error: "prompt, userId and conversationId are required" },
        { status: 400 }
      );
    }

    const result = await generateTextWithMemory({
      model: google("gemini-flash-lite-latest"),
      prompt: `Answer in 3-4 concise lines. Keep it short and simple.\n\nQuestion: ${prompt}`,
      userId,
      conversationId,
    });

    return Response.json({ text: result.text });
  } catch (error) {
    console.error("POST /api/chat error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const conversationId = searchParams.get("conversationId");

    if (!userId || !conversationId) {
      return Response.json(
        { error: "userId and conversationId are required" },
        { status: 400 }
      );
    }

    const history = getMemory(userId, conversationId);

    return Response.json({
      userId,
      conversationId,
      history,
    });
  } catch (error) {
    console.error("GET /api/chat error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
