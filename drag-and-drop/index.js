const { ipcRenderer } = require('electron');

console.log('45645456445456456456=<<<<<<<<<<>>>>>>>>>>>>>>>');
let $ = require('jquery');

ipcRenderer.on('fileData', (event, data) => {
    $('#txtarea').text(data);
})
$('#btn').on('click', () => {
    let txtarea = $('#txtarea').val()
    ipcRenderer.send('clickedbutton', txtarea)

})

var dragFile = document.getElementById('drag-file');

// Access the properties of the file being dragged
dragFile.addEventListener('drop', function (e) {
    // Prevent the tag's default event
    e.preventDefault();

    // Stop the current event when the operation is complete
    e.stopPropagation();

    // Access the properties of the dragged files
    // addEventListener()
    for (let f of e.dataTransfer.files) {
        if (f.type == "text/plain") {
            console.log("The file(s) you dragged: ", f);
            ipcRenderer.send('ondragstart', f.path);
            console.log("Path ==================================== " + f.path);
        }
    }
});

dragFile.addEventListener('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
});