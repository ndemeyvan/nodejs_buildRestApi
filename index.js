const express = require("express");
const Joi = require("joi");
const app = express();
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authenticate");
const courses = require("./routes/courses");
app.use(express.json());

app.use(logger);

app.use(authenticate);

app.get("/", (req, res) => {
  res.send("Welcome to express");
});

app.use("/api/courses", courses);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App listen in port " + port);
});
