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

router.post("/", async (req, res) => {
  try {
    console.log("Received task:", req.body);
    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTask = new Task({ title: req.body.title, subtasks: [] }); 
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

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

const mongoose = require("mongoose");
router.post("/:taskId/subtasks", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    const subtask = { _id: new mongoose.Types.ObjectId(), title, completed: false }; 
    task.subtasks.push(subtask);
    await task.save();
    res.status(201).json(subtask);
  } catch (error) {
    console.error("Error adding subtask:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/:taskId/subtasks/:subtaskId", async (req, res) => {
  try {
    const { taskId, subtaskId } = req.params;
    const { title, completed } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });
    console.log("Task found:", task); 
    const subtask = task.subtasks.id(subtaskId);
    if (!subtask) return res.status(404).json({ message: "Subtask not found" });
    console.log("Subtask found:", subtask); 
    if (title !== undefined) subtask.title = title;
    if (completed !== undefined) subtask.completed = completed;
    await task.save();
    res.json(subtask);
  } catch (error) {
    console.error("Error updating subtask:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
