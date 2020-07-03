/**
 * sendEmail - Describe what your sendEmail does.
 *
 * @controller email
 * @action sendEmail
 *
 * [successResponse description]
 *
 * @param {String} message [message description]
 * @param {Array or JSON} data [data description]
 *
 */

import { to, successResponse } from "./../../helpers";

export default async ({ postData }) => {
    const [isErr, isMailSend] = await to(
        email.send({
            template: "test",
            message: {
                subject: postData.subject,
                from: postData.fromAddress,
                to: postData.toAddress,
                attachments: [
                    {
                        filename: "report.jpg",
                        content: postData.imageLink.split("base64,")[1],
                        encoding: "base64",
                        cid: "edxi",
                    },
                ],
            },
            locals: {
                name: "User",
            },
        })
    );
    if (isErr) return validationError(isErr);
    return successResponse("Mail Send Successfully.", isMailSend);
};
