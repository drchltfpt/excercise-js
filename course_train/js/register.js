const userData = require('../db/objects/user.js');
const $ = require('jquery');
const url = require('url');
const path = require('path');

const thisWindow = require('electron').remote.getCurrentWindow();

async function getUsers() {
    let data = await userData.getAllUsers();
    return data;
}

$('#register-button').click(async () => {
    const _fullname = $('#fullname').val();
    const _username = $('#username').val();
    const _password = $('#password').val();
    const _email = $('#email').val();

    const arrayUsers = await getUsers();

    for (i = 0; i < arrayUsers.length; i++) {
        if (_username === arrayUsers[i].username) {
            return;
        }

        else if (_email === arrayUsers[i].email) {
            return;
        }

    }
    const user = {
        id: null,
        username: _username,
        password: _password,
        email: _email,
        fullname: _fullname,
        position: 'DEV'
    };

    userData.addUsers(user);

    console.log("Add user successful");
});
