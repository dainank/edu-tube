const express = require('express');
const http = require('http');
const mongodb = require("mongodb");

const app = express();  // create instance

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.VIDEO_STORAGE_HOST) {
    throw new Error("Please specify the host name for the video storage microservice in variable VIDEO_STORAGE_HOST.");
}

if (!process.env.VIDEO_STORAGE_PORT) {
    throw new Error("Please specify the port number for the video storage microservice in variable VIDEO_STORAGE_PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the databse host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME");
}

const PORT = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;

console.log(`Forwarding video requests to ${VIDEO_STORAGE_HOST}:${VIDEO_STORAGE_PORT}.`);

async function main() {
    const client = await mongodb.MongoClient.connect(DBHOST); // Connects to the database.
    const db = client.db(DBNAME);   // retrieve DB
    const videosCollection = db.collection("videos");   // retrieve collection

    app.get("/video", async (req, res) => {
        const videoId = new mongodb.ObjectId(req.query.id);
        const videoRecord = await videosCollection.findOne({ _id: videoId });
        if (!videoRecord) {
            res.sendStatus(404);
            return;
        }

        console.log(`Translated id ${videoId} to path ${videoRecord.videoPath}.`);

        const forwardRequest = http.request( // Forward the request to the video storage microservice.
            {
                host: VIDEO_STORAGE_HOST,
                port: VIDEO_STORAGE_PORT,
                path: `/video?path=${videoRecord.videoPath}`, // Video path now retrieved from the database.
                method: 'GET',
                headers: req.headers
            },
            forwardResponse => {
                res.writeHeader(forwardResponse.statusCode, forwardResponse.headers);
                forwardResponse.pipe(res);
            }
        );

        req.pipe(forwardRequest);
    });

    app.listen(PORT, () => {
        console.log(`Microservice listening, please load the data file db-fixture/videos.json into your database before testing this microservice.`);
    });
}

main()
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });