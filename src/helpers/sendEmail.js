import { transporter } from "../config";

export const sendMail = async ({ to, subject }) => {
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <support@toyshare.com>',
        to,
        subject,
        template: "index",
        context: {
            name: "Accime Esterling",
        },
    });

    console.log("Message sent: %s", info.messageId);

    return info;
};
