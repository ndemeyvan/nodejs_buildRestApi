const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
    name: { 
      type: String,
      required: true ,
      minLength:5,
      maxLength:255
    },
    category:{
      type:String,
      enum:['web','mobile','devOps'],
    },
    author: String,
    tags: {
      type:Array,
      validate:{
        validator:function(v){
          return v.length > 0;
        },
        message:"A course should have at least one tag."
      }
      
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
  });

  const Course = mongoose.model("Courses", courseSchema);

  module.exports.Course = Course;
