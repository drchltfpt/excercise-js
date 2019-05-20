// const { app } = require('electron')
// app.on('ready', () => {
//   const { net } = require('electron')
//   const request = net.request('https://github.com')
//   request.on('response', (response) => {
//     console.log(`STATUS: ${response.statusCode}`)
//     console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
//     response.on('data', (chunk) => {
//       console.log(`BODY: ${chunk}`)
//     })
//     response.on('end', () => {
//       console.log('No more data in response.')
//     })
//   })
//   request.end()
// })

const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const url = require('url');
const path = require('path');
let fs = require('fs');
var mysql = require('mysql');
const { Model } = require('objection');

let mainWindow;

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'coursetrain',
  charset: 'utf8_general_ci'
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 540,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './public/views/login.html'),
    protocol: 'file',
    slashes: true
  }))

  connection.connect();

  mainWindow.openDevTools();
}

app.on('ready', createWindow);

ipcMain.on('clickedbutton', (event, data) => {

  connection.query('SELECT * FROM `answers`', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
    data = results[0];
    // handle the file content 
    event.sender.send('fileData', data)
  });

  connection.end();

})

