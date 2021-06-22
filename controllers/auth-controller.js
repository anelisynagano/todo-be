const bcrypt = require("bcrypt");
const connection = require("../db/config");

const User = require("../models/User");

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const handleResponseController = (err, result) => {
    if (err) {
      res.status(500).send(`Error inserting user: ${err}`);
    } else {
      res.send("User created :)");
    }
  };

  User.addUser(email, hashedPassword, handleResponseController);
};

const getAllUsers = (req, res, next) => {
  User.getAll((err, results) => {
    if (err) {
      res.send("error retrieving users");
    } else {
      res.json(results);
    }
  });
};

module.exports = { createUser, getAllUsers };
