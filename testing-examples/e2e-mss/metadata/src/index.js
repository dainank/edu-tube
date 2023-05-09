const express = require("express");
const mongodb = require("mongodb");

//
// Starts the microservice.
//
async function startMicroservice(dbhost, dbname) {
    const client = await mongodb.MongoClient.connect(dbhost); // Connects to the database.
    const db = client.db(dbname);
    const videosCollection = db.collection("videos");

    const app = express();

    //
    // HTTP GET API to retrieve list of videos from the database.
    //
    app.get("/videos", async (req, res) => {
        const videos = await videosCollection.find().toArray();
        res.json({
            videos: videos
        });
    });

    // Add other route handlers here.

    const port = process.env.PORT && parseInt(process.env.PORT) || 3000;
    app.listen(port);
}

//
// Application entry point.
//
async function main() {
    if (!process.env.DBHOST) {
        throw new Error("Please specify the databse host using environment variable DBHOST.");
    }
    
    const DBHOST = process.env.DBHOST;

    if (!process.env.DBNAME) {
        throw new Error("Please specify the databse name using environment variable DBNAME.");
    }
    
    const DBNAME = process.env.DBNAME;
        
    await startMicroservice(DBHOST, DBNAME);
}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });
