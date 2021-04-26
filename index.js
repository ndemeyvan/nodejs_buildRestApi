const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const authenticate = require("./middleware/authenticate");
const courses = require("./routes/courses");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/nodejs_db").then(() => {
  console.log("La connexion est effective a la base de donnee mongo");
});

app.use(express.json());

app.use(logger);

app.use(authenticate);
//////////Schema + Model

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Learn Docker",
    author: "Olinga",
    tags: ["React", "Vuejs"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// createCourse();


async function getCourses(){

  const course = await Course.find({author:"Ndeme Yvan" , isPublished:true})
  .limit(5).sort({date:1}).select({name:1,tags :1});
  console.log("This is course find : " , course);

}
getCourses();

//////////Schema + Model

app.get("/", (req, res) => {
  res.send("Welcome to express");
});

app.use("/api/courses", courses);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("App listen in port " + port);
});
