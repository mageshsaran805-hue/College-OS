import "server-only";

import nodemailer, { type Transporter } from "nodemailer";

export interface EmailMessage {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

let transporter: Transporter | null = null;

function getTransport(): Transporter | null {
  const host = process.env.SMTP_HOST?.trim();

  if (!host) {
    return null;
  }

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? "587");
    const user = process.env.SMTP_USER?.trim();
    const password = process.env.SMTP_PASSWORD;

    transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth:
        user && password
          ? {
              user,
              pass: password,
            }
          : undefined,
    });
  }

  return transporter;
}

export async function sendEmail(message: EmailMessage): Promise<void> {
  const transport = getTransport();

  if (!transport) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SMTP is not configured.");
    }

    console.info(
      [
        "[email:development] SMTP is not configured; message was not sent.",
        `To: ${message.to}`,
        `Subject: ${message.subject}`,
        message.text,
      ].join("\n"),
    );
    return;
  }

  await transport.sendMail({
    from: process.env.SMTP_FROM ?? "no-reply@college.os",
    to: message.to,
    subject: message.subject,
    text: message.text,
    html: message.html,
  });
}
