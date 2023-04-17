const express = require('express'); // load library

const app = express();  // create instance

const port = 3000;  // production should be 80

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});