import { NextResponse } from "next/server";
import mailjet from "node-mailjet";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@remind-r.com";

const SUBJECT_LABELS: Record<string, string> = {
  technical: "Assistance technique",
  contract: "Question sur mon contrat",
  billing: "Question de facturation",
  other: "Autre",
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  try {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Email, sujet et message sont requis" },
        { status: 400 },
      );
    }

    const mailjetClient = mailjet.apiConnect(
      process.env.MAILJET_API_KEY!,
      process.env.MAILJET_API_SECRET!,
    );

    const subjectLabel = SUBJECT_LABELS[subject as string] ?? subject;

    const textBody = `Nouveau message depuis le formulaire de contact Remindr

De : ${email}
Sujet : ${subjectLabel}

---
Message :
${message}
`;

    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px;">
  <p><strong>Nouveau message depuis le formulaire de contact Remindr</strong></p>
  <p><strong>De :</strong> <a href="mailto:${email}">${email}</a><br>
  <strong>Sujet :</strong> ${subjectLabel}</p>
  <hr style="border: none; border-top: 1px solid #eee;">
  <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  <p style="color: #888; font-size: 12px;">Répondre à cet email enverra la réponse à ${email}</p>
</body>
</html>
`;

    await mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: CONTACT_EMAIL,
            Name: "Remindr Contact",
          },
          To: [
            {
              Email: CONTACT_EMAIL,
              Name: "Remindr",
            },
          ],
          ReplyTo: {
            Email: email,
            Name: email,
          },
          Subject: `[Contact Remindr] ${subjectLabel} - ${email}`,
          TextPart: textBody,
          HTMLPart: htmlBody,
        },
      ],
    });

    return NextResponse.json(
      { success: "Votre message a bien été envoyé." },
      { status: 200 },
    );
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
