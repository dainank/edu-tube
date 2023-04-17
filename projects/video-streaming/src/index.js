const express = require('express');
const fs = require('fs');

const app = express();  // create instance

const port = 3000;  // production should be 80
 
app.get("/video", async (req, res) => {
 
    const path = "../";
    const stats = await fs.promises.stat(path);
 
    res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "video/mp4",
    });
      
    fs.createReadStream(path).pipe(res);
});
 
app.listen(port, () => {
    console.log(`Microservice listening ...`);
});