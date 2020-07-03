/**
 * [envirnment file]
 *
 * @return  {[key]}  [return envValue]
 * @return  {[defaultValue]}  [return defaultValue]
 */

import dotenv from "dotenv";

dotenv.config();
const cache = {};

export const accessEnv = (key, defaultValue) => {
    if (!(key in process.env)) {
        if (defaultValue) return defaultValue;
        console.log(`${key} not found in process.env!`);
    }

    if (cache[key]) return cache[key];

    cache[key] = process.env[key];

    return process.env[key];
};
