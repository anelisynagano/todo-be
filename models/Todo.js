const connection = require("../db/config");

const Todo = {};

Todo.getAllTodos = (callback) => {
  connection.query("SELECT * FROM to_do", (err, results) => {
    callback(err, results);
  });
};

Todo.getOneById = (id, callback) => {
  connection.query(
    "SELECT * FROM to_do WHERE idto_do=?",
    [id],
    (err, results) => {
      callback(err, results);
    }
  );
};

Todo.addToDoTask = (description, callback) => {
  connection.query(
    "INSERT INTO to_do(description) VALUES (?)",
    [description],
    (err, result) => {
      callback(err, result);
    }
  );
};

module.exports = Todo;
