const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
  { id: 1, name: "Anglais" },
  { id: 2, name: "Francais" },
  { id: 3, name: "Italien" },
];

app.get("/", (req, res) => {
  res.send("Welcome to express");
});

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Id not found");
  } else {
    res.json(course);
  }
});

app.post("/api/courses", (req, res) => {
  if (checkIsCorrect(req.body).error) {
    res.status(400).json(result.error);
  } else {
    const course = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(course);
    res.json(course);
  }
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Id not found");
    return;
  }

  if (checkIsCorrect(req.body).error) {
    res.status(400).json(result.error);
    return;
  }
  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Id not found");
    return;
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
});

function checkIsCorrect(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

app.listen(port, () => {
  console.log("App listen in port " + port);
});
