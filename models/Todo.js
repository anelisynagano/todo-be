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

Todo.editToDoTask = (id, editedInfo, callback) => {
  connection.query(
    "UPDATE to_do SET ? WHERE idto_do=?",
    [editedInfo, id],
    (err, results) => {
      callback(err, results);
    }
  );
};

Todo.deleteToDoTask = (id, callback) => {
  connection.query(
    "DELETE FROM to_do WHERE idto_do=?",
    [id],
    (err, results) => {
      callback(err, results);
    }
  );
};

module.exports = Todo;
