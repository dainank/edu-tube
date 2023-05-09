//
// The full code for the "metadata" microservice.
//

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

    app.get("/videos", async (req, res) => {
        const videos = await videosCollection.find().toArray(); // Returns a promise so we can await the result in the test.
        res.json({
            videos: videos
        });
    });

    // Add other route handlers here.

    const port = process.env.PORT && parseInt(process.env.PORT) || 3000;
    const server = app.listen(port);

    return { // Returns an object that represents our microservice.
        close: () => { // Create a function that can be used to close our server and database.
            server.close(); // Close the Express server.
            client.close(); // Close the database.
        },
        db: db, // Gives the tests access to the database.
    };
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

    const client = await mongodb.MongoClient.connect(DBHOST); // Connects to the database.
    const db = client.db(DBNAME);
    const videosCollection = db.collection("videos");
        
    await startMicroservice(DBHOST, DBNAME);
}

if (require.main === module) {
    // Only start the microservice normally if this script is the "main" module.
    main()
        .then(() => console.log("Microservice online."))
        .catch(err => {
            console.error("Microservice failed to start.");
            console.error(err && err.stack || err);
        });
}
else {
    // Otherwise we are running under test
    module.exports = {
        startMicroservice,
    };
}

