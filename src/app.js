require('dotenv').config()

import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello Babel")
})

app.listen(process.env.PORT, () => {
    console.log(`app is listening to port ${process.env.NODE_ENV}`);
})