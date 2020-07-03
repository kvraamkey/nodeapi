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

import Joi from "@hapi/joi";
import { validationError, successResponse, to, accessEnv } from "./../../helpers";
import { email } from "../../config";

const schema = Joi.object({
    fromAddress: Joi.string().optional(),
    toAddress: Joi.string().required(),
    template: Joi.string().required(),
    data: Joi.object().required(),
});

export default async ({ postData }) => {
    const { error } = schema.validate({ ...postData });
    if (error) return validationError(error);

    const [isErr, isMailSend] = await to(
        email.send({
            template: postData.template,
            message: {
                from: accessEnv("EMAIL_FROM"),
                to: postData.toAddress,
            },
            locals: postData.data,
        })
    );
    if (isErr) return validationError(isErr.message);
    return successResponse("Mail Send Successfully.", isMailSend);
};
