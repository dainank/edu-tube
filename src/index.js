const express = require("express");
const fs = require("fs");

const app = express();

//
// Throws an error if the PORT environment variable is missing.
//
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

//
// Extracts the PORT environment variable.
//
const PORT = process.env.PORT;

//
// HTTP GET route we can use to check if the service is handling requests.
//
app.get("/live", (req, res) => {
    res.sendStatus(200);
});

//
// Registers a HTTP GET route for video streaming.
//
app.get("/video", async (req, res) => { // Route for streaming video.
    
    const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
    const stats = await fs.promises.stat(videoPath);

    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });
    fs.createReadStream(videoPath).pipe(res);
});

if (require.main === module) {
    //
    // When this script is run as the entry point, starts the HTTP server.
    //
    app.listen(PORT, () => {
        console.log(`Microservice online.`);
    });
}
else {
    //
    // Otherwise, exports the express app object for use in tests.
    //
    module.exports = {
        app,
    };
}

