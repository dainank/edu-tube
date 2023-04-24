const express = require("express");
const mongodb = require("mongodb");
const bodyParser = require("body-parser");
const amqp = require("amqplib");

if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.DBHOST) {
    throw new Error("Please specify the databse host using environment variable DBHOST.");
}

if (!process.env.DBNAME) {
    throw new Error("Please specify the name of the database using environment variable DBNAME");
}

if (!process.env.RABBIT) {
    throw new Error("Please specify the name of the RabbitMQ host using environment variable RABBIT");
}

const PORT = process.env.PORT;
const DBHOST = process.env.DBHOST;
const DBNAME = process.env.DBNAME;
const RABBIT = process.env.RABBIT;

async function main() {

    const app = express();
    app.use(bodyParser.json()); 

    const client = await mongodb.MongoClient.connect(DBHOST);
    const db  = client.db(DBNAME);
    const videosCollection = db.collection("videos");
    
    console.log(`Connecting to RabbitMQ server at ${RABBIT}.`);
    const messagingConnection = await amqp.connect(RABBIT); 
    console.log("Connected to RabbitMQ.");
    const messageChannel = await messagingConnection.createChannel();   // creates a messaging channel

    async function consumeViewedMessage(msg) {
        console.log("Received a 'viewed' message");
        const parsedMsg = JSON.parse(msg.content.toString()); // Parse the JSON message.
        await videosCollection.insertOne({ videoPath: parsedMsg.videoPath }); // Record the "view" in the database.

        console.log("Acknowledging message was handled."); 
        messageChannel.ack(msg); // If there is no error, acknowledge the message.
    };
       
	await messageChannel.assertQueue("viewed", {}) // Assert that we have a "viewed" queue.
    console.log("Asserted that the 'viewed' queue exists.");
    
    // receive msgs from viewed queue
    await messageChannel.consume("viewed", consumeViewedMessage);

    app.get("/history", async (req, res) => {
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const documents = await videosCollection.find()
            .skip(skip)
            .limit(limit)
            .toArray();
        res.json({ history: documents });
    });

    app.listen(PORT, () => {
        console.log("Microservice online.");
    });
}

main()
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });