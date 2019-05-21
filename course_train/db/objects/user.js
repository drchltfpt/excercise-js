let $ = require('jquery');

const appModel = require('../connect-db.js');

var User = appModel.connection.extend({
    tableName: "users",
});


// user = new User();

class Command {
    getAllUsers = async () => {
        return new Promise((resolve, reject) => {
            new User().find('all', function (error, results, fields) {
                if (error) return reject(error);
                console.log('The solution is: ', results);
                resolve(results);
            });
        });
    };

    addUsers = (newUser) => {
        new User({
            id: null,
            username: newUser.username,
            password: newUser.password,
            email: newUser.email,
            fullname: newUser.fullname,
            position: 'DEV'
        }).save();
    };


}

const cmd = new Command();

module.exports = cmd;
