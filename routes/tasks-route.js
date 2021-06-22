const express = require("express");
const router = express.Router();
const { getAll, getById, addToDo } = require("../controllers/todo-controller");

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", addToDo, getById);

module.exports = router;
