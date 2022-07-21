require("dotenv").config();
require('express-group-routes');
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require('helmet');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use helmet to secure express headers
app.use(
    helmet({
        crossOriginEmbedderPolicy: false,
        // contentSecurityPolicy: false,
        // frameguard: false,
    })
);

// use cors to allow cross origin resource sharing
app.use(cors());

// Add routes for the API here
var api_routes = ['file'];
app.group("/api/v1", (router) => {
    api_routes.map(x => router.use(`/${x}`, require(`./api/${x}`)));
});

// Logic goes here

module.exports = app;