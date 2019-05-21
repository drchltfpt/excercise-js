var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'coursetrain',
    charset: 'utf8_general_ci'
});

// Return a promise to get results / Normal connection.query cant'
const getAllCourses = async function () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `courses`',  function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const getAllAnswers = async function () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `answers`',  function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const getAllQuestions = async function () {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM `questions`',  function (error, results, fields) {
            if (error) return reject(error);

            resolve(results);
        });
    });
}

const deleteByID = async function (table, id) {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM ? WHERE id = ?',[table, id],  function (error, results, fields) {
            if (error) return reject(error);

            resolve(results.affectedRows);
        });
    });
}


// const getCourseLike = async function (string) {
//     return new Promise((resolve, reject) => {
//         connection.query('SELECT * FROM `questions`',  function (error, results, fields) {
//             if (error) return reject(error);

//             resolve(results);
//         });
//     });
// }

module.exports =  {getAllCourses, getAllAnswers, getAllQuestions, deleteByID} ;
