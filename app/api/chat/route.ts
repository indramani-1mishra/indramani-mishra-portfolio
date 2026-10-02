import { NextRequest, NextResponse } from "next/server";
import callModel from "@/serverComponent/service/aiAssitent";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userPrompt = body?.message || body?.prompt;
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!userPrompt || typeof userPrompt !== "string" || !userPrompt.trim()) {
      return NextResponse.json(
        { error: "A non-empty 'message' or 'prompt' is required in the request body." },
        { status: 400 }
      );
    }

    const response = await callModel(userPrompt.trim(), history);

    // Extract textual response safely across different SDK response formats
    let reply = "";
    if (typeof response === "string") {
      reply = response;
    } else if (response && typeof response === "object") {
      const respAny = response as unknown as Record<string, unknown>;
      if (typeof respAny.output_text === "string") {
        reply = respAny.output_text;
      } else if (
        Array.isArray(respAny.choices) &&
        (respAny.choices[0] as { message?: { content?: string } })?.message?.content
      ) {
        reply = (respAny.choices[0] as { message: { content: string } }).message.content;
      } else if (
        Array.isArray(respAny.output) &&
        (respAny.output[0] as Record<string, unknown>)?.content &&
        Array.isArray((respAny.output[0] as Record<string, unknown>).content)
      ) {
        const contents = (respAny.output[0] as { content: Array<{ text?: string }> }).content;
        reply = contents.map((c) => c.text || "").join("\n");
      } else if (typeof respAny.text === "string") {
        reply = respAny.text;
      } else {
        reply = JSON.stringify(response);
      }
    }

    return NextResponse.json({
      success: true,
      reply: reply || "I am here to help you learn more about Indramani Mishra.",
      data: response,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    console.error("AI Assistant Route Error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate AI response",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

