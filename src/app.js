require("dotenv").config();
require('express-group-routes');
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');

const helmet = require('helmet');
// use helmet to secure express headers
app.use(helmet())
// app.use(
//     helmet({
//         // crossOriginEmbedderPolicy: false,
//         // contentSecurityPolicy: false,
//         // frameguard: false,
//     })
// );

// use cors to allow cross origin resource sharing
// const cors = require("cors");
// app.use(cors());


//------------------------------------------------------------------------
// IP whitelist

const whitelist_filepath = path.join(__dirname, '../whitelist.txt');
const whitelist_a_filepath = path.join(__dirname, '../whitelist_a.txt');
const whitelist_b_filepath = path.join(__dirname, '../whitelist_b.txt');
const createWhitelistIfNotExists = require('./lib/filecheck').createWhitelistIfNotExists;
const whitelist_filepath_list = [whitelist_filepath, whitelist_a_filepath, whitelist_b_filepath];
whitelist_filepath_list.map(x => {
    createWhitelistIfNotExists(x);
});


const ipWhitelist = require('ip-whitelist');
app.use(ipWhitelist(ipWhitelist.array(['127.0.0.1', '::1'])));
app.use(ipWhitelist(ipWhitelist.file(whitelist_filepath)));

app.use(ipWhitelist(ip => {
    return ip === '127.0.0.1' || ip === '::1';
}));
// Chain multiple callbacks
app.use(ipWhitelist(ipWhitelist.chain(
    ipWhitelist.file(whitelist_a_filepath),
    ipWhitelist.file(whitelist_b_filepath)
)));

//------------------------------------------------------------------------


const { API_GROUP_VER } = process.env;

// Add routes for the API here
var api_routes = ['file'];
app.group(`/api/v${API_GROUP_VER}`, (router) => {
    api_routes.map(x => router.use(`/${x}`, require(`./api/${x}`)));
});

// Logic goes here

module.exports = app;