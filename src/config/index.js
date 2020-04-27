/**
 * [config variables]
 */

import { accessEnv } from "../helpers";
export * from "./knexConnection";
export * from "./esConnection";
export * from "./emailConnection";

export const config = {
    appName: "nodeapi",
    poweredBy: "",
    env: accessEnv("NODE_ENV", 'developmnt'),
    isProduction: accessEnv("NODE_ENV", 'production') === 'production',
    allowedDomains: accessEnv("ALLOWED_DOMAINS").split(','),
}
