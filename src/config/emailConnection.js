import nodemailer from "nodemailer";
import EmailTemplate from "email-templates";
import { accessEnv } from "../helpers";

// Only needed if you don't have a real mail account for testing
// const testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport

const emailConfig = {
    host: accessEnv("EMAIL_HOST", "smtp.ethereal.email"),
    port: accessEnv("EMAIL_PORT", 587),
    secure: accessEnv("EMAIL_SECURE", false),
    ignoreTLS: accessEnv("EMAIL_IGNORE_TLS", false),
};

const transporter = nodemailer.createTransport({
    ...emailConfig,
    auth: {
        user: "dereck60@ethereal.email",
        pass: "fyTf3e8qeKztyVB7T9",
    },
});

export const email = new EmailTemplate({
    views: { root: "./src/templates", options: { extension: "ejs" } },
    preview: true,
    send: true,
    transport: transporter,
});
