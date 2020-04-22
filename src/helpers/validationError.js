export const validationError = (error) => {
    let isObject = typeof error === "object" ? true : false;
    return {
        error: true,
        message: isObject ? error.message.replace(/["]/g, "") : error
    }
}