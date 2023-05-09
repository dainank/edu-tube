const express = require("express");
const path = require("path");
const request = require("request");

//
// Starts the microservice.
//
async function startMicroservice(dbhost, dbname) {

    const app = express();

    app.set("views", path.join(__dirname, "views")); // Set directory that contains templates for views.
    app.set("view engine", "hbs"); // Use hbs as the view engine for Express.
    
    app.use(express.static("public"));

    //
    // Main web page that lists videos.
    //    
    app.get("/", (req, res) => {
        request.get( // Get the list of videos from the metadata service.
            "http://metadata/videos", 
            { json: true }, 
            (err, response, body) => {
                if (err || response.statusCode !== 200) {
                    console.error("Failed to get video list.");
                    console.error(err || `Status code: ${response.statusCode}`);
                    res.sendStatus(500);
                }
                else {
                    res.render("video-list", { videos: body.videos });
                }
            }
        );
    });

    // Add other route handlers here.

    const port = process.env.PORT && parseInt(process.env.PORT) || 3000;
    app.listen(port);
}

//
// Application entry point.
//
async function main() {
    await startMicroservice();
}

main()
    .then(() => console.log("Microservice online."))
    .catch(err => {
        console.error("Microservice failed to start.");
        console.error(err && err.stack || err);
    });
