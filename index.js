const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();

const connection = require("./db/config");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cookieParser());

const tasksRouter = require("./routes/tasks-route");
const authRouter = require("./routes/auth-route");
const { getAllUsers } = require("./controllers/auth-controller");

app.use("/todos", tasksRouter);

app.use("/auth", authRouter);

app.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM user WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        res.status(500).send(`Error retrieving user: ${err}`);
      } else {
        const isPasswordEqual = await bcrypt.compare(
          password,
          results[0].password
        );
        if (isPasswordEqual && email === results[0].email) {
          const token = jwt.sign({ id: results[0].iduser }, "your-secret-key");

          res
            .status(200)
            .cookie("token", token, {
              httpOnly: true,
            })
            .json({ id: results[0].iduser });
        } else {
          res.status(401).send("Wrong credentials");
        }
      }
    }
  );
});

const authentication = (req, res, next) => {
  if (!req.cookies.token) {
    res.send("something went wrong :(");
  } else {
    jwt.verify(req.cookies.token, "your-secret-key", (err, decoded) => {
      if (err) {
        res.send("wrong access");
      }
      req.userId = decoded.id;
      next();
    });
  }
};

app.get("/secret", authentication, (req, res, next) => {
  res.send("Welcome to the secret route");
});


app.get("/users", authentication, getAllUsers)

app.listen(5000, () => console.log("Server running on port 5000"));
