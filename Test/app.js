const fs = require('fs');

const path = require('path');
// Create or override a file
/*
fs.writeFile('./test.txt', `
    Test Nodejs
    Ha test the first time
    Ha test override
`, 
(error) => {
    if(error) {
        throw error;
    }

    console.log("Write file success !!!");
});
*/

// Read file with type data is utf8
/*
fs.readFile("./test.txt", 'utf8',(error, data) => {

    if(error) {
        throw error;
    }

    console.log("Read file success !!!");
    console.log(data);
});
*/

// Reads the contents of a directory
/*
fs.readdir("../Test" , 'utf8',(error, files) => {
    if(error) {
        throw error;
    }

    console.log("This is readdir example !!!");
    console.log(files);
});
*/

// Delete a file
/*
fs.unlink("./test1.txt", (error) => {

    if(error) {
        throw error;
    }

    console.log("./test1.txt was deleted");
});
*/

// Watch for changes on filename. The callback listener will be called each time the file is accessed.
/*
fs.watchFile("test.txt", (current, previous) => {
    console.log(current);
    console.log(previous);
});
*/

// Test open but do not understand
/*
fs.open("./package.json", 'r', (err, fd) => {
    if(err) {
        throw err;
    }

    console.log("Open for read !!!");
    console.log(fd);
});
*/

// Test javascript asynchronous
/*
setTimeout có thể mất nhiều hơn 1s
setTimeout(() => {
    console.log("This is Timeout");
}, 1000);

for(i = 0; i < 5; i++) {
    console.log("This is FOR");
}
*/

const isSheHappy = false;
 
// Promise
const willBeCouple = new Promise(
    function (resolve, reject) {
        if (isSheHappy) {
            const answer = {feedback: "I accept to be your girlfriend"};
            resolve(answer); // fulfilled
        } else {
            const reason = new Error('I do not love you');
            reject(reason); // reject
        }
    }
);

// call our promise
/*
const askYourGirlFriend = function () {
    console.log("before promise!");
 
    willBeCouple
       .then(showOff) // chain it here
       .then(function (fulfilled) {
          console.log(fulfilled);
          // output: 'Hey friend, she accepted. This is the result: I accept to be your girlfriend.'
       })
       .catch(function (error) {
           // oops, she refused it
           console.log(error.message);
           // output: 'I do not love you'
       });
 
    console.log("after promise!");
};
 
askYourGirlFriend();

// 2nd promise
var showOff = function (answer) {
    return new Promise(
        function (resolve, reject) {
           var message = 'Hey friend, she accepted. This is the result: '
             + answer.feedback;
           resolve(message);
        }
    );
};
*/