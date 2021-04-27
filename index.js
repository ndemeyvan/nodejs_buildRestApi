const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authenticate");
const courses = require("./routes/courses");
const courseModel = require("./models/course")
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nodejs_db").then(() => {
  console.log("La connexion est effective a la base de donnee mongo");
});

app.use(express.json());

app.use(logger);

app.use(authenticate);
//////////Schema + Model




// createCourse();

// getCourses();

//////////Schema + Model

app.get("/", (req, res) => {
  res.send("Welcome to express");
});

app.use("/api/courses", courses);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App listen in port " + port);
});
