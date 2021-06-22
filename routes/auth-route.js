const express = require("express");
const router = express.Router();
const connection = require("../db/config");

const { createUser, getAllUsers } = require("../controllers/auth-controller");

// localhost:5000/auth/signup
router.post("/signup", createUser);

router.get("/users", getAllUsers);

module.exports = router;
