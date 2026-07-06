import { render } from "@react-email/render";
import nodemailer, { type SendMailOptions } from "nodemailer";

  const env = process.env as unknown as Record<string, string>;

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: env.SMTP_SECURE,
  ...(env.SMTP_USER &&
    env.SMTP_PASSWORD && {
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    }),
  // tls: {
  //   rejectUnauthorized: false,
  // },
  // logger: false,
});

// Extended type with optional React node
export interface SendMailOptionsWithReact extends SendMailOptions {
  react?: React.ReactNode;
}

// Helper functions
export async function sendMail(payload: SendMailOptionsWithReact): Promise<void> {
  const html = payload.react ? await render(payload.react) : payload.html;
  // console.info({ html });

  transporter.sendMail(
    {
      ...payload,
      html,
    },
    (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.info("Email sent successfully:", info);
      }
    },
  );
}
