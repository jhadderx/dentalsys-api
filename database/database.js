/* const mysql = require('mysql');
const dbConfig = require('../keys')


const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});


module.exports = connection;
 */
const mysql = require('mysql');
const dbConfig = require('../keys')


const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});



/* connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
}); */

pool.getConnection(function(err, connection) {
  connection.query( 'SELECT * FROM personas', function(err, rows) {

    console.log(pool._freeConnections.indexOf(connection)); // -1

    connection.release();

    console.log(pool._freeConnections.indexOf(connection)); // 0

 });
});


module.exports = pool;
