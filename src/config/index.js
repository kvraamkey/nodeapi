/**
 * [config variables]
 */

import { accessEnv } from "../helpers";

export const config = {
    appName: "nodeapi",
    poweredBy: "kvraamkey",
    env: accessEnv("NODE_ENV", 'developmnt'),
    isProduction: accessEnv("NODE_ENV", 'production') === 'production',
    allowedDomains: accessEnv("ALLOWED_DOMAINS").split(','),
}
