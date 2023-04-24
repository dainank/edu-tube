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

//
// Application entry point.
//
async function main() {
    const app = express();
    
    app.use(bodyParser.json()); 

    const client = await mongodb.MongoClient.connect(DBHOST);

    const db  = client.db(DBNAME);

    const videosCollection = db.collection("videos");
    
    const messagingConnection = await amqp.connect(RABBIT); 

    const messageChannel = await messagingConnection.createChannel(); 

    async function consumeViewedMessage(msg) {

        const parsedMsg = JSON.parse(msg.content.toString()); // Parse the JSON message.
        
        console.log("Received a 'viewed' message:");
        console.log(JSON.stringify(parsedMsg, null, 4)); // JUST PRINTING THE RECEIVED MESSAGE.

        console.log("Acknowledging message was handled.");
                
        messageChannel.ack(msg); // If there is no error, acknowledge the message.
    };

    await messageChannel.assertExchange("viewed", "fanout"); 

	const { queue } = await messageChannel.assertQueue("", { exclusive: true }); 

    console.log(`Created queue ${queue}, binding it to "viewed" exchange.`);

    await messageChannel.bindQueue(queue, "viewed", ""); 

    await messageChannel.consume(queue, consumeViewedMessage);

    app.listen(PORT, () => {
        console.log("Microservice online.");
    });
}

main()
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });