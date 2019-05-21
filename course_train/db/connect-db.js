const mysqlModel = require('mysql-model');

class AppModel {
  
  connection = mysqlModel.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'coursetrain',
    charset: 'utf8_general_ci'
  });

}
let appModel = new AppModel();

module.exports = appModel;



