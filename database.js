var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'students'
});

connection.connect();

module.exports = connection;