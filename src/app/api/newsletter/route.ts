import { NextResponse } from "next/server";
import mailjet from "node-mailjet";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const mailjetClient = mailjet.apiConnect(
      process.env.MAILJET_API_KEY!,
      process.env.MAILJET_API_SECRET!
    );

    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "contact@remind-r.com",
            Name: "Remindr",
          },
          To: [
            {
              Email: email,
            },
          ],
          TemplateID: parseInt(process.env.MAILJET_TEMPLATE_ID!, 10),
          TemplateLanguage: true,
          Subject: "Bienvenue chez Remindr !",
        },
      ],
    });

    await request;

    return NextResponse.json({ success: "Email envoyé !" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 }
    );
  }
}
