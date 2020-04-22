/**
 * [successResponse description]
 *
 * @var  {[message]}
 * @var  {[data]}
 */

export const successResponse = (message, data) => {

    let response = {
        error: false,
        message,
    }

    if (data) {
        if (Array.isArray(data)) response.count = data.length
        response.data = data;
    }

    return response;
};