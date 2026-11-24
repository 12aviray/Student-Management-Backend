
const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(express.json());

// Home API
app.get("/", (req, res) => {
    res.send("Student Management Backend is Running!");
});

// Student Routes
app.use("/api/students", studentRoutes);

module.exports = app;
