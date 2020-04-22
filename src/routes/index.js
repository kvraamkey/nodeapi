/**
 * [Root Route]
 *
 * @return  {[post request]}  [return Global Routes with post request]
 */

import { config } from './../config';
import { validationError, to } from './../helpers';

export default (app) => {

    app.post('/:url?', async (req, res) => {

        const urlParam = req.params.url;
        const action = req.body.action;
        const postData = (req.body.postData) ? req.body.postData : {};

        try {

            const moduleSpecifier = `./../controllers/${urlParam}/${action}`;

            const [err, module] = await to(import(moduleSpecifier));

            const sendRequestData = { postData }

            if (err) return res.status(200).json(validationError({
                message: config.isProduction ? "A valid [action] or [controller] is required." : err.message,
            }));

            const resp = await module.default(sendRequestData);

            return res.status(200).json(resp);

        } catch (e) {
            return res.status(200).json(validationError({
                errorType: e.name,
                message: e.message,
                stack: e.stack
            }));
        }

    });
}

