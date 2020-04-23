/**
 * [@elastic/elasticsearch description]
 *
 * @return  {[type]}  [return description]
 */

import { Client } from '@elastic/elasticsearch';
import { accessEnv } from '../helpers';

export const esConnection = new Client({
    node: accessEnv("ES_HOST"),
    auth: {
        username: accessEnv("ES_AUTH_USERNAME"),
        password: accessEnv("ES_AUTH_PASSWORD")
    }
});