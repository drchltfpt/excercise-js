const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
const { ipcMain } = require('electron');
let fs = require('fs');
const { dialog } = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }))

    mainWindow.openDevTools();
}

app.on('ready', createWindow);

// electron application codes
//electron application codes
ipcMain.on('ondragstart', (event, filePath) => {

    readFile(filePath);

    function readFile(filepath) {
        fs.readFile(filepath, 'utf-8', (err, data) => {

            if (err) {
                alert("An error ocurred reading the file :" + err.message)
                return
            }

            // handle the file content 
            event.sender.send('fileData', data)
        })
    }

})

ipcMain.on('clickedbutton', (event, data) => {

    dialog.showSaveDialog({
        filters: [

            { name: 'text', extensions: ['txt'] }

        ]
    }, function (fileName) {

        if (fileName === undefined) return
        fs.writeFile(fileName, data, function (err) {

        })

    });

})

