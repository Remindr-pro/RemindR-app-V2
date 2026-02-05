import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL || "";

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Le champ question est requis" },
        { status: 400 }
      );
    }

    const trimmed = question.trim();
    // Dans le nœud Chat LLM Chain, définir "Prompt (User Message)" sur {{ $json.question }} ou {{ $json.body.question }}
    const payload = {
      body: { question: trimmed },
      question: trimmed,
      prompt: trimmed,
    };

    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("n8n webhook error", res.status, text);
      return NextResponse.json(
        { error: "Le service de chat est temporairement indisponible." },
        { status: 502 }
      );
    }

    const raw = await res.json();
    const data = Array.isArray(raw) ? raw[0]?.json ?? raw[0] : raw;
    const obj = data?.json ?? data;

    // n8n lastNode (Chat LLM Chain) peut renvoyer l’output sous différentes formes
    const text =
      obj?.output ??
      obj?.text ??
      obj?.result ??
      obj?.message ??
      data?.output ??
      data?.text ??
      (typeof raw === "string" ? raw : null);

    const answer = text != null ? String(text).trim() : "";

    return NextResponse.json({ answer: answer || "Aucune réponse reçue." });
  } catch (err) {
    console.error("Chat API error", err);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 }
    );
  }
}
