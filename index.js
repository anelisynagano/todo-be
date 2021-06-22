const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

const tasksRouter = require("./routes/tasks-route");
const authRouter = require("./routes/auth-route");

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
          const token = res
            .status(200)
            .cookie("login", true, {
              httpOnly: true,
              expires: new Date(Date.now() + 30000),
            })
            .json({ message: "Welcome" });
        } else {
          res.status(401).send("Wrong credentials");
        }
      }
    }
  );
});

const authentication = (req, res, next) => {
  if (req.cookies.login === "true") {
    console.log("user is logged in");
    next();
  } else {
    res.status(403).send("unauthorized");
  }
};

app.get("/secret", authentication, (req, res, next) => {
  res.send("Welcome to the secret route");
});

app.listen(5000, () => console.log("Server running on port 5000"));
