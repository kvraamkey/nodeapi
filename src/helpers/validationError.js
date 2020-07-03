export const validationError = (error) => {
    let isObject = typeof error === 'object' ? true : false;

    let errorReponse = {
        error: true,
        message: isObject ? error.message.replace(/["]/g, '') : error,
    };

    return errorReponse;
};
