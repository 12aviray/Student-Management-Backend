
const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

const filePath = process.env.STUDENTS_FILE || path.join(__dirname, "../data/students.json");

// POST: Create a Student
router.post("/", async (req, res) => {
    try {
        const { name, email, department } = req.body;

        if (!name || !email || !department) {
            return res.status(400).json({
                success: false,
                message: "Name, email and department are required"
            });
        }

        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        const newStudent = {
            id: Date.now(),
            name,
            email,
            department
        };

        data.students.push(newStudent);

        await fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2)
        );

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: newStudent
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});


// GET: Get All Students
router.get("/", async (req, res) => {
    try {
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        res.status(200).json({
            success: true,
            count: data.students.length,
            data: data.students
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});


// GET: Get Student By ID
router.get("/:id", async (req, res) => {
    try {
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        const student = data.students.find(
            s => s.id === Number(req.params.id)
        );

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

// PATCH: Update Student
router.patch("/:id", async (req, res) => {
    try {
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        const studentId = Number(req.params.id);

        // Find student
        const student = data.students.find(
            s => s.id === studentId
        );

        // If student does not exist
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        // Update only provided fields
        const { name, email, department } = req.body;

        if (name !== undefined) student.name = name;
        if (email !== undefined) student.email = email;
        if (department !== undefined) student.department = department;

        // Save updated data
        await fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2)
        );

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            data: student
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});
// DELETE: Delete a Student
router.delete("/:id", async (req, res) => {
    try {
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        const studentId = Number(req.params.id);

        const studentIndex = data.students.findIndex(
            s => s.id === studentId
        );

        if (studentIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const deletedStudent = data.students.splice(studentIndex, 1);

        await fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2)
        );

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: deletedStudent[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});
// DELETE: Delete a Student
router.delete("/:id", async (req, res) => {
    try {
        const fileData = await fs.readFile(filePath, "utf-8");
        const data = JSON.parse(fileData);

        const studentId = Number(req.params.id);

        const studentIndex = data.students.findIndex(
            s => s.id === studentId
        );

        if (studentIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const deletedStudent = data.students.splice(studentIndex, 1);

        await fs.writeFile(
            filePath,
            JSON.stringify(data, null, 2)
        );

        res.status(200).json({
            success: true,
            message: "Student deleted successfully",
            data: deletedStudent[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;
module.exports = router;
