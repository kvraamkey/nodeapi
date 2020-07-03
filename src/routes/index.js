/**
 * [Root Route]
 *
 * @return  {[post request]}  [return Global Routes with post request]
 */

import { db } from './../config';
import { validationError, to, accessEnv, toCamelcase } from './../helpers';

export default (app) => {
    app.post('/:controller?/:action?', async (req, res) => {
        if (!req.params.controller || !req.params.action)
            return res.status(200).json({
                error: true,
                message: 'A valid [controller] or [action] is required.',
            });
        else {
            const controllerName = toCamelcase(req.params.controller);
            const action = toCamelcase(req.params.action);

            try {
                const moduleSpecifier = `./../controllers/${controllerName}/${action}`;

                const [err, module] = await to(import(moduleSpecifier));
                const sendRequestData = { postData: req.body };

                // if (accessEnv("ES_ENABLED") === "true") {
                //     sendRequestData.es = esConnection
                // }

                if (accessEnv('DB_ENABLED') === 'true') {
                    const [isDbConnected] = await to(db.raw('select 1+1 as result'));
                    if (isDbConnected) {
                        return res.status(200).json(validationError({ message: isDbConnected.message }));
                    }
                    sendRequestData.db = db;
                }

                if (err)
                    return res.status(200).json(
                        validationError({
                            message: err.message,
                        })
                    );

                const resp = await module.default(sendRequestData);

                return res.status(200).json(resp);
            } catch (e) {
                return res.status(200).json(
                    validationError({
                        errorType: e.name,
                        message: e.message,
                        stack: e.stack,
                        esError: e.meta,
                    })
                );
            }
        }
    });
};
