const mongoose = require("mongoose");

const ptaskSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
  },

  taskid: {
    type: "String",
    required: true,
  
  }
 
});

const pschema = new mongoose.model("ptask", ptaskSchema);

module.exports = pschema;