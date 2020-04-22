import { config } from "../config";

export const validationError = (error) => {
    let isObject = typeof error === "object" ? true : false;

    let errorReponse = {
        error: true,
        ...error
    }

    if (config.isProduction) {
        errorReponse.message = isObject ? error.message.replace(/["]/g, "") : error;
    }

    return errorReponse;
}