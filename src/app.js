import express from 'express';
import * as http from "http";
import { networkInterfaces } from 'os';
import cors from "cors";
import { accessEnv } from './helpers/accessEnv';
import { config } from './config';
import setupRoutes from "./routes";
import { errorHandler } from "./middlewares";

/**
 * Express instance
 * @public
 */

const PORT = accessEnv("PORT", 2000);
const app = express();

// create http server and wrap the express app
const server = http.createServer(app);

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true,
        preflightContinue: true,
        exposedHeaders: [
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
            "X-Password-Expired"
        ],
        optionsSuccessStatus: 200
    })
);

// serve static files from a given folder
app.use('/static', express.static('public'));

setupRoutes(app);

app.use(errorHandler);

// important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
server.listen(PORT, () => {

    const getLocalExternalIp = [].concat.apply([], Object.values(networkInterfaces()))
        .filter(details => details.family === 'IPv4' && !details.internal).pop().address

    console.log(`
You can now view ${config.appName} in the browser

    Local           : http://localhost:${PORT}/
    On Your Network : http://${getLocalExternalIp}:${PORT}/
    
Note that the ${accessEnv("NODE_ENV", 'development')} build is not optimized
To run a production build, use yarn start or npm start
    `);

});