require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://taskassigntodoapp.netlify.app"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
