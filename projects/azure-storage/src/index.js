const express = require("express");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob"); // Azure Storage SDK, interact with API
 
const app = express();
  
if (!process.env.PORT) {
    throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}

if (!process.env.STORAGE_ACCOUNT_NAME) {
    throw new Error("Please specify the name of an Azure storage account in environment variable STORAGE_ACCOUNT_NAME.");
}

if (!process.env.STORAGE_ACCESS_KEY) {
    throw new Error("Please specify the access key to an Azure storage account in environment variable STORAGE_ACCESS_KEY.");
}

const PORT = process.env.PORT;
const STORAGE_ACCOUNT_NAME = process.env.STORAGE_ACCOUNT_NAME;
const STORAGE_ACCESS_KEY = process.env.STORAGE_ACCESS_KEY;

function createBlobService() {  // connect to Azure Storage API
    const sharedKeyCredential = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCESS_KEY);
    const blobService = new BlobServiceClient(
        `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
        sharedKeyCredential
    );
    return blobService;
}
 
app.get("/video", async (req, res) => {
 
    const videoPath = req.query.path; // query parameters
    
    const containerName = "videos";
    const blobService = createBlobService();
    const containerClient = blobService.getContainerClient(containerName); // connects to Azure client
    const blobClient = containerClient.getBlobClient(videoPath);    // connects to specific file for retrieving
 
    const properties = await blobClient.getProperties();    // retrieve video props
 
    res.writeHead(200, {
        "Content-Length": properties.contentLength,
        "Content-Type": "video/mp4",
    });
 
    const response = await blobClient.download();   // retrieve video itself
    response.readableStreamBody.pipe(res);  // play video
});
 
app.listen(PORT, () => {
    console.log(`Microservice online`);
});