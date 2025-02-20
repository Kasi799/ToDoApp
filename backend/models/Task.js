const mongoose = require("mongoose");
const subTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { _id: true }); 

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  subtasks: [subTaskSchema], 
});

module.exports = mongoose.model("Task", taskSchema);

