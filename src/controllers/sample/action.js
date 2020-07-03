/**
 * action - Describe what your action does.
 *
 * @controller sample
 * @action action
 *
 * [successResponse description]
 *
 * @param {String} message [message description]
 * @param {Array or JSON} data [data description]
 *
 */

import { to, successResponse } from './../../helpers';

export default async ({ postData }) => {
    return successResponse('success response', []);
};
