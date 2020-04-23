/**
 * [knex description]
 *
 * @return  {[db]}  [return description]
 */

import knex from "knex";
import { accessEnv } from "../helpers";
import knexConfig from "./../../knexfile";

export const db = knex(knexConfig[accessEnv("NODE_ENV")]);
