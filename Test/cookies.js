const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');

app.use(cookieParser);

app.get("/cookie", (request, response) => {
    res.cookie('cookie_name', 'cookie_name');
    res.send(`Cookie is set`);
});

app.get('/', (req, res) => {
    console.log(`Cookie: `, req.cookies);
});

const server = app.listen(8080, () => {
    console.log("Server is running at: " + server.address().port);
});