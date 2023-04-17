const express = require('express');
const fileSystem = require('fs');

const app = express();  // create instance

if (!process.env.PORT) {
    throw new Error("Missing PORT number! Use `export PORT=3000` or `set PORT=3000`")
};

const port = process.env.PORT;

app.get("/video", async (req, res) => {

    const path = "./assets/sample.mp4";
    const stats = await fileSystem.promises.stat(path);

    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });

    fileSystem.createReadStream(path).pipe(res);
});

app.listen(port, () => {
    console.log(`Microservice listening ...`);
});