const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', function(req,res) {
    res.render('view.pug', {title: "Hello", message: "Welcome back"});
});

// port and call back 
app.listen(8080, (error) => {
    if (error) {
        throw error;
    }

    console.log('Server started at PORT 8080...!')
});
