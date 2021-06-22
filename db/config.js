const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wildcodeschool",
  database: "to_do_db",
});

module.exports = connection;
