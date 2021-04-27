const express = require("express");
const Joi = require("joi");
const { Course } = require("../models/course");
const router = express.Router();


router.get("/",async (req, res) => {
  const course = await Course.find()
    .limit(5)
    .sort({ date: 1 });
  res.json(course);
});

router.get("/:id", async (req, res) => {
  const course = await Course.findById(id)
  res.json(course);
});

router.post("/", async (req, res) => {
  const course = new Course({
    name: req.body.name,
    category: req.body.category,
    author: req.body.author,
    tags: req.body.tags,
    isPublished: req.body.isPublished,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (e) {
    console.log(e.message);
  }
});

router.put("/:id", async (req, res) => {
  const course = await Course.findByIdAndUpdate(id,{
    
      name: req.body.name,
      category: req.body.category,
      author: req.body.author,
      tags: req.body.tags,
      isPublished: req.body.isPublished,
    
  })
  res.json(course);
});

router.delete("/:id",async (req, res) => {
  const course = await Course.findByIdAndDelete(id)
  res.json(course);
});

function checkIsCorrect(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

module.exports = router;
