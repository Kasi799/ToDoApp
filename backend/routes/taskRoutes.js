const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
//Add Task
router.post("/", async (req, res) => {
  try {
    console.log("Received task:", req.body); 
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTask = new Task({ title: req.body.title });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
//Delete the task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
//Update a task
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }
    const updatedTask = await Task.findByIdAndUpdate(id, { title }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
module.exports = router;
