// const express = require("express");
// const Task = require("../models/Task");
// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.user.id });
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });
// //Add Task
// router.post("/", async (req, res) => {
//   try {
//     console.log("Received task:", req.body);
    
//     if (!req.body.title || !req.body.userId) {
//       return res.status(400).json({ message: "Title and userId are required" });
//     }

//     const newTask = new Task({
//       title: req.body.title,
//       user: req.body.userId, // ✅ Assign task to the user
//     });

//     const savedTask = await newTask.save();
//     res.status(201).json(savedTask);
//   } catch (error) {
//     console.error("Error saving task:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// //Delete the task
// router.delete("/:id", async (req, res) => {
//   try {
//     await Task.findByIdAndDelete(req.params.id);
//     res.json({ message: "Task deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });
// //Update a task
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title } = req.body;
//     if (!id) {
//       return res.status(400).json({ message: "Task ID is required" });
//     }
//     const updatedTask = await Task.findByIdAndUpdate(id, { title }, { new: true });
//     if (!updatedTask) {
//       return res.status(404).json({ message: "Task not found" });
//     }
//     res.json(updatedTask);
//   } catch (error) {
//     console.error("Error updating task:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });
// module.exports = router;

const express = require("express");
const Task = require("../models/Task");
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// ✅ Get all tasks for logged-in user
router.get("/", a, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // ✅ Fetch only logged-in user’s tasks
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Add new task (assigned to the logged-in user)
router.post("/", a, async (req, res) => {
  try {
    console.log("Received task:", req.body);

    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTask = new Task({
      title: req.body.title,
      user: req.user.id, // ✅ Automatically associate task with the logged-in user
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error saving task:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Delete task (only if it belongs to the logged-in user)
router.delete("/:id", a, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Update task (only if it belongs to the logged-in user)
router.put("/:id", a, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    task.title = req.body.title || task.title;
    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
