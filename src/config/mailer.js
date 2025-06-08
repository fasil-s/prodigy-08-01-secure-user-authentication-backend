import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendResetLinkEmail = async (to, resetLink) => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: to,
    subject: "Reset Your Password",
    text: `You requested to reset your password. Click the link below to proceed:\n\n${resetLink}\n\nThis link will expire in 10 minutes.`,
    html: `
      <p>You requested to reset your password.</p>
      <p>Click the link below to reset it. This link will expire in 10 minutes:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
