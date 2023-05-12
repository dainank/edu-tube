const express = require("express");
const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");

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
const STORAGE_CONTAINER_NAME = "videos";

console.log(`Serving videos from Azure storage account ${STORAGE_ACCOUNT_NAME}/${STORAGE_CONTAINER_NAME}.`);

function createBlobService() {
    const sharedKeyCredential = new StorageSharedKeyCredential(STORAGE_ACCOUNT_NAME, STORAGE_ACCESS_KEY);
    const blobService = new BlobServiceClient(
        `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
        sharedKeyCredential
    );
    return blobService;
}

const app = express();

app.get("/video", async (req, res) => {

    const videoId = req.query.id;

    const blobService = createBlobService();
    const containerClient = blobService.getContainerClient(STORAGE_CONTAINER_NAME);
    const blobClient = containerClient.getBlobClient(videoId);
    const properties = await blobClient.getProperties();

    res.writeHead(200, {
        "Content-Length": properties.contentLength,
        "Content-Type": "video/mp4",
    });

    const response = await blobClient.download();
    response.readableStreamBody.pipe(res);
});

app.post("/upload", async (req, res) => {

    const videoId = req.headers.id;
    const contentType = req.headers["content-type"];

    const blobService = createBlobService();

    const containerClient = blobService.getContainerClient(STORAGE_CONTAINER_NAME); 
    await containerClient.createIfNotExists(); // Creates the container if it doesn't already exist.

    const blockBlobClient = containerClient.getBlockBlobClient(videoId);
    await blockBlobClient.uploadStream(req);
    await blockBlobClient.setHTTPHeaders({
        blobContentType: contentType,
    });
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Microservice online`);
});
