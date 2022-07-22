const http = require("http");
const app = require("./src/app");
const server = http.createServer(app);


//------------------------------------
// create pem file if not exists

const fs = require("fs");
const path = require("path");
const KEY_PEM_FILE_PATH = './ssl/key.pem'
const CERT_PEM_FILE_PATH = './ssl/cert.pem'

function checkPEM(filepath) {
    const pem_filepath = path.join(__dirname, filepath);
    const pem_filepath_exists = fs.existsSync(pem_filepath);
    if (!pem_filepath_exists) {
        console.log("pem file not exists :: ", filepath);
        console.log("create pem file :: ", pem_filepath);
        //TODO create pem file
    }
}

[KEY_PEM_FILE_PATH, CERT_PEM_FILE_PATH].map(x => checkPEM(x));

//------------------------------------

const https = require('https');
const options = {
    key: fs.readFileSync(KEY_PEM_FILE_PATH),
    cert: fs.readFileSync(CERT_PEM_FILE_PATH)
};
const https_server = https.createServer(options, app);

const { API_PORT_HTTP, API_PORT_HTTPS } = process.env;
const port = process.env.PORT || API_PORT_HTTPS;

// server listening - http
server.listen(API_PORT_HTTP, () => {
    console.log(`Server running on port ${API_PORT_HTTP}`);
});

// server listening - https
https_server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
