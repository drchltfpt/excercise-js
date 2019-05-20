const { ipcRenderer } = require('electron');
let $ = require('jquery');

ipcRenderer.on('fileData', (event, data) => {
    $('#txtarea').text(data[0][0]);
})

$('#btn').on('click', () => {
    let txtarea = $('#txtarea').val()
    ipcRenderer.send('clickedbutton', txtarea)
})