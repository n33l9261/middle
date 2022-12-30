const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
  },
  name: {
    type: "String",
    required: true,
  },
  bemail:{
    type: "String",
    required: true,
  },

  emails: {
    type: "Array",
    required: true,
    default: []
  },
  data: {
    type: "String",
    required: true,
    default: "[]"
  },
  report:{
    type: "Boolean",
    required: true,
    default: false
  },
  reportlink:{
    type: "String",
    required: true,
    default: " "
  },
  statuscode:{
    type: "String",
    required: true,
    default: "1"
  }
 
});

const taskschema = new mongoose.model("task", taskSchema);

module.exports = taskschema;