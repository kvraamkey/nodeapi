/**
 * [config variables]
 */

export const config = {
    appName: "nodeapi",
    poweredBy: "kvraamkey",
    env: process.env.NODE_ENV,
    isProduction: process.env.NODE_ENV === 'production',
    allowedDomains: [],
}
