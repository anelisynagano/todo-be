const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  addToDo,
  editToDo,
  deleteToDo,
} = require("../controllers/todo-controller");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", addToDo, getById);
router.put("/:id", editToDo);
router.delete("/:id", deleteToDo);

module.exports = router;
