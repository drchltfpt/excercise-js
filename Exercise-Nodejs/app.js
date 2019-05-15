const path = require('path');
const fs = require('fs');

const express = require('express');
const app = express();

// const xlsx = require('node-xlsx').default;
// // Get data from excel file
// const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/Student-GPA.xlsx`));

app.use(express.static('public'));

app.get('/', (req, res) => {
    const indexPath = path.resolve(__dirname, './views/index.html');
    // response to client
    res.status(200).sendFile(indexPath);// receive request success and send file index.html
});

const xlsx = require('node-xlsx');
var busboy = require('connect-busboy');
app.use(busboy());
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

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

app.get('*', (req, res) => {
    res.send('404 Not found');
});

// port and call back 
app.listen(8080, (error) => {
    if (error) {
        throw error;
    }

    console.log('Server started at PORT 8080...!')
});

