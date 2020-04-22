import express from 'express';
import * as http from "http";
import cors from "cors";
import { accessEnv } from './helpers/accessEnv';

/**
 * Express instance
 * @public
 */

const PORT = accessEnv("PORT");
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