const express = require("express");

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

const PORT = process.env.PORT;

async function main() {

    console.log("Test world!");

    const app = express();

    app.listen(PORT, () => {
        console.log("Microservice online.")
    });
}

main()
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });