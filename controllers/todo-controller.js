const Todo = require("../models/Todo");

const getAll = (req, res, next) => {
  Todo.getAllTodos((err, results) => {
    if (err) {
      res.status(500).send("error retrieving from DB");
    } else {
      res.send(results);
    }
  });
};

const getById = (req, res, next) => {
  if (req.params.id) {
    Todo.getOneById(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  } else {
    Todo.getOneById(req.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(result);
      }
    });
  }
};

const addToDo = (req, res, next) => {
  Todo.addToDoTask(req.body.description, (err, result) => {
    if (err) {
      res.status(500).send("Error adding task :(");
    } else {
      const id = result.insertId;
      req.id = id;
      next();
    }
  });
};

const editToDo = (req, res) => {
  const { id } = req.params;
  Todo.editToDoTask(id, req.body, (err, results) => {
    if (err) {
      res.status(500).send(`Error editing task: ${err}`);
    } else {
      res.sendStatus(204);
    }
  });
};

const deleteToDo = (req, res) => {
  const { id } = req.params;
  Todo.deleteToDoTask(id, (err, results) => {
    if (err) {
      res.status(500).send(`Error deleting task: ${err}`);
    } else {
      res.sendStatus(204);
    }
  });
};

module.exports = { getAll, getById, addToDo, editToDo, deleteToDo };
