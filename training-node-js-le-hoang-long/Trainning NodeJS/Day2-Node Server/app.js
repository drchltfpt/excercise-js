const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
var busboy = require('connect-busboy');
const fs = require('fs');
const router = express.Router();
const xlsx = require('node-xlsx');
var bodyParser = require('body-parser');
const server = http.createServer(app);
server.listen('9000');
app.use(busboy());
// app.use(express.static(path.join(__dirname, 'uploads')));


//add the router
app.use(express.static('js'));
app.use(express.static('views'));
app.use(express.static('xlsx'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.route('/upload')
    .post(function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            let pathExcel = __dirname + '/uploads/' + filename;
            fstream = fs.createWriteStream(pathExcel);
            file.pipe(fstream);
            fstream.on('close', async function () {    
                console.log("Upload Finished of " + filename);
                let studentArr = await parseExcel(pathExcel);
                res.status(200).send(studentArr);
                // res.redirect('back');
            });
        });
    });

async function parseExcel(path) {
    const workSheetsFromFile = await xlsx.parse(path);
    return workSheetsFromFile[0].data;
}
console.log('Running on 9000!!!');