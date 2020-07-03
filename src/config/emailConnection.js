import nodemailer from "nodemailer";
import EmailTemplate from "email-templates";

// Only needed if you don't have a real mail account for testing
// const testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "dereck60@ethereal.email",
        pass: "fyTf3e8qeKztyVB7T9",
    },
});

export const email = new EmailTemplate({
    views: { root: "./src/emailTemplates", options: { extension: "ejs" } },
    preview: true,
    send: true,
    transport: transporter,
});
