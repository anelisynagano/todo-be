const connection = require("../db/config");

const User = {};

User.addUser = (email, hashedPassword, handleResponse) => {
  connection.query(
    "INSERT INTO user (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err, results) => {
      handleResponse(err, results);
    }
  );
};

User.getAll = (handleResponse) => {
  connection.query("SELECT * FROM user", (err, results) => {
    handleResponse(err, results);
  });
};

module.exports = User;
