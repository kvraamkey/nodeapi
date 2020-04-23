/**
 * [checkDomain description]
 *
 * @var  {String} allowedDomains [allowedDomains are allow listed domains only]
 */

export const checkDomain = (allowedDomains) => {

    let validateDomain = (req, res, next) => {
        const reqDomain = req.get('host') || req.get('origin');
        if (!allowedDomains.includes(reqDomain)) {
            return res.status(406).json({
                error: true,
                message: "Invalid Domain Request, Please Contact Administrator"
            });
        }
        next();
    };

    return validateDomain;

}

