import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL = process.env.N8N_CHAT_WEBHOOK_URL || "";

/** FAQ : questions fréquentes → réponse immédiate */
const FAQ_SHORTCUTS: Array<{ pattern: RegExp; answer: string }> = [
  {
    pattern:
      /qu['']est-ce que remindr|quest ce que remindr|c['']est quoi remindr|pr[eé]sente remindr/i,
    answer:
      "Remindr est votre compagnon de santé familial au quotidien. C'est une plateforme numérique conçue pour simplifier l'organisation médicale de tout votre foyer. Elle centralise vos rappels de santé (vaccins, bilans, rendez-vous), vous propose des conseils de prévention personnalisés et vous aide à ne plus oublier l'essentiel. Notre mission est d'alléger votre charge mentale tout en vous aidant à prendre soin de vous et de vos proches, de manière simple et bienveillante.",
  },
  {
    pattern: /remindr remplace.*mutuelle|remplace.*ma mutuelle/i,
    answer:
      "Pas du tout ! Remindr ne remplace pas votre complémentaire santé, il la complète. Votre mutuelle s'occupe de vos remboursements et de votre couverture santé, tandis que Remindr est l'outil de service qu'elle met à votre disposition pour vous accompagner dans votre vie de tous les jours.",
  },
  {
    pattern:
      /adapt[eé] pour.*famille|sant[eé] de toute ma famille|a qui s['']adresse remindr|qui s['']adresse remindr/i,
    answer:
      "Remindr a été pensé pour tous, mais il est particulièrement utile pour les « piliers » de la famille : les parents qui gèrent le calendrier médical des enfants, ou les aidants qui accompagnent des proches plus fragiles. Que vous soyez seul·e, en couple ou à la tête d'une famille nombreuse, l'interface est conçue pour être inclusive et facile d'utilisation, quel que soit votre âge ou votre aisance avec le numérique.",
  },
  {
    pattern: /comment y avoir acc[eè]s|y avoir acc[eè]s|avoir acc[eè]s\s*\?/i,
    answer:
      "L'accès à votre espace Remindr est simplifié : cliquez sur le lien d'invitation personnel envoyé par votre mutuelle. Ce lien vous redirigera vers notre plateforme web où vous pourrez activer votre compte en quelques secondes grâce aux identifiants sécurisés de votre mutuelle (SSO). Votre tableau de bord est accessible depuis n'importe quel navigateur sur ordinateur, tablette ou smartphone.",
  },
  {
    pattern: /remindr est gratuit|est-ce gratuit|gratuit\s*\?/i,
    answer:
      "Oui, pour vous, c'est totalement gratuit ! Il n'y a aucun coût caché, aucun frais d'inscription, ni de publicité intrusive. C'est votre mutuelle qui prend en charge le coût du service dans le cadre de sa politique de prévention.",
  },
  {
    pattern:
      /acc[eè]der.*tableau de bord|comment acc[eè]der|acc[eè]s.*tableau de bord/i,
    answer:
      "L'accès à votre espace Remindr est simplifié : cliquez sur le lien d'invitation personnel envoyé par votre mutuelle. Ce lien vous redirigera vers notre plateforme web où vous pourrez activer votre compte en quelques secondes grâce aux identifiants sécurisés de votre mutuelle (SSO). Votre tableau de bord est accessible depuis n'importe quel navigateur sur ordinateur, tablette ou smartphone.",
  },
  {
    pattern:
      /comment fonctionnent les rappels|rappels de sant[eé]|rappels sant[eé]/i,
    answer:
      "Le fonctionnement de Remindr repose sur un calendrier intelligent qui s'adapte à chaque membre de votre foyer. Une fois les profils créés, notre technologie croise vos données avec les recommandations officielles de santé publique pour générer des alertes automatiques concernant les vaccins, les bilans obligatoires ou les dépistages. Vous recevez ces notifications directement sur votre smartphone au moment opportun.",
  },
];

const BLOCKED_QUESTION_PATTERNS = [
  /system\s*prompt|systeme\s*promt|système\s*prompt/i,
  /donne\s*(moi)?\s*ton\s*prompt|affiche\s*(ton|tes)\s*prompt/i,
  /quel\s*est\s*ton\s*prompt|quelle\s*est\s*ta\s*prompt/i,
  /montre\s*(moi)?\s*tes?\s*instructions?/i,
  /ignore\s*(tes?|toutes?\s*tes?)\s*instructions?/i,
  /jailbreak|bypass\s*tes?\s*règles?/i,
  /révèle\s*(ton|tes)|révéler\s*(ton|tes)/i,
];

const SYSTEM_PROMPT_LEAK_PATTERNS = [
  /(revised|updated) version of the system prompt/i,
  /SYSTEM PROMPT\s*:\s*CHATBOT REMINDR/i,
  /Rôle\s*:\s*Tu es l'assistant officiel de Remindr/i,
  /Mission(?:s|es) de Remindr/i,
  /Mission & Goals/i,
  /Détection & Adaptation/i,
  /Detection & Adaptation/i,
  /Règles d'Or & Restriction/i,
  /Rules & Restrictions/i,
  /Structuring Responses/i,
  /Structure des Réponses/i,
  /Style & Content/i,
  /INTERDICTION STRICTE/i,
  /Strictly forbid diagnosis, prescription/i,
  /PARTICULARS PARTICIPANT/i,
  /redirect users to a responsible third party \(health insurance/i,
];

const FALLBACK_ANSWER =
  "Je suis là pour vous aider avec Remindr et la prévention santé. Avez-vous une question sur nos services ? Par exemple : « Comment Remindr m'aide-t-il à gérer mes rendez-vous ? » ou « Comment créer mon tableau de bord santé ? »";

const HALLUCINATION_PATTERNS = [
  /Caller ID|Screen Name/i,
  /WhatsApp|Facebook Messenger|Twitter DM/i,
  /Message History.*Inbox/i,
];

const ENGLISH_RESPONSE_PATTERNS = [
  /^Sure,?\s/i,
  /Here are the steps/i,
  /Log in using your account/i,
  /Download the (Remindr )?mobile app/i,
  /you can access Remindr through/i,
  /your mutual health insurance provider/i,
];

function getFaqShortcutAnswer(question: string): string | null {
  const q = question.trim().toLowerCase();
  for (const { pattern, answer } of FAQ_SHORTCUTS) {
    if (pattern.test(q)) return answer;
  }
  return null;
}

function isBlockedQuestion(question: string): boolean {
  return BLOCKED_QUESTION_PATTERNS.some((p) => p.test(question));
}

function isSystemPromptLeak(text: string): boolean {
  return SYSTEM_PROMPT_LEAK_PATTERNS.some((p) => p.test(text));
}

function isHallucinatedResponse(text: string): boolean {
  if (!text || text.length < 200) return false;
  return HALLUCINATION_PATTERNS.some((p) => p.test(text));
}

function isEnglishResponse(text: string): boolean {
  return ENGLISH_RESPONSE_PATTERNS.some((p) => p.test(text));
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { error: "Le champ question est requis" },
        { status: 400 },
      );
    }

    const trimmed = question.trim();

    if (isBlockedQuestion(trimmed)) {
      return NextResponse.json({ answer: FALLBACK_ANSWER });
    }

    // FAQ : questions fréquentes → réponse immédiate
    const faqAnswer = getFaqShortcutAnswer(trimmed);
    if (faqAnswer) {
      return NextResponse.json({ answer: faqAnswer });
    }

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
        { status: 502 },
      );
    }

    const raw = await res.json();
    const data = Array.isArray(raw) ? (raw[0]?.json ?? raw[0]) : raw;
    const obj = data?.json ?? data;

    const text =
      obj?.output ??
      obj?.text ??
      obj?.result ??
      obj?.message ??
      data?.output ??
      data?.text ??
      (typeof raw === "string" ? raw : null);

    let answer = text != null ? String(text).trim() : "";

    if (answer && isSystemPromptLeak(answer)) {
      console.warn("Chat: fuite de prompt système détectée, réponse remplacée");
      answer = FALLBACK_ANSWER;
    }

    if (answer && isHallucinatedResponse(answer)) {
      console.warn("Chat: réponse hallucinée détectée, réponse remplacée");
      answer = FALLBACK_ANSWER;
    }

    if (answer && isEnglishResponse(answer)) {
      console.warn(
        "Chat: réponse en anglais détectée, remplacée par version française",
      );
      answer = FALLBACK_ANSWER;
    }

    return NextResponse.json({ answer: answer || "Aucune réponse reçue." });
  } catch (err) {
    console.error("Chat API error", err);
    return NextResponse.json(
      { error: "Une erreur est survenue." },
      { status: 500 },
    );
  }
}
