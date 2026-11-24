
const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");

const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

const request = require("supertest");

let app;
let testDir;
let testFile;

// Test শুরু হওয়ার আগে temporary file তৈরি
before(async () => {
    testDir = await fs.mkdtemp(
        path.join(os.tmpdir(), "student-api-")
    );

    testFile = path.join(testDir, "students.json");

    await fs.writeFile(
        testFile,
        JSON.stringify({ students: [] })
    );

    process.env.STUDENTS_FILE = testFile;

    app = require("../app");
});

// প্রতিটি Test-এর আগে data reset
beforeEach(async () => {
    await fs.writeFile(
        testFile,
        JSON.stringify({ students: [] })
    );
});

// সব Test শেষ হলে temporary file delete
after(async () => {
    delete process.env.STUDENTS_FILE;

    await fs.rm(testDir, {
        recursive: true,
        force: true
    });
});

// Helper: একটি Student তৈরি
async function createStudent() {
    return request(app)
        .post("/api/students")
        .send({
            name: "Rahim Ahmed",
            email: "rahim@gmail.com",
            department: "CSE"
        });
}

// TEST 1: Create Student
test("POST - should create a student", async () => {
    const response = await createStudent();

    assert.equal(response.status, 201);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.name, "Rahim Ahmed");
});

// TEST 2: Missing information
test("POST - should reject incomplete student data", async () => {
    const response = await request(app)
        .post("/api/students")
        .send({
            name: "Rahim Ahmed"
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
});

// TEST 3: Get all students
test("GET - should return all students", async () => {
    await createStudent();

    const response = await request(app)
        .get("/api/students");

    assert.equal(response.status, 200);
    assert.equal(response.body.count, 1);
});

// TEST 4: Get student by ID
test("GET - should return a student by ID", async () => {
    const created = await createStudent();
    const id = created.body.data.id;

    const response = await request(app)
        .get(`/api/students/${id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.data.id, id);
});

// TEST 5: Student not found
test("GET - should return 404 for unknown student", async () => {
    const response = await request(app)
        .get("/api/students/999999");

    assert.equal(response.status, 404);
});

// TEST 6: Update student
test("PATCH - should update student information", async () => {
    const created = await createStudent();
    const id = created.body.data.id;

    const response = await request(app)
        .patch(`/api/students/${id}`)
        .send({
            department: "EEE"
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.data.department, "EEE");
});

// TEST 7: Delete student
test("DELETE - should delete a student", async () => {
    const created = await createStudent();
    const id = created.body.data.id;

    const response = await request(app)
        .delete(`/api/students/${id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
});

// TEST 8: Delete unknown student
test("DELETE - should return 404 for unknown student", async () => {
    const response = await request(app)
        .delete("/api/students/999999");

    assert.equal(response.status, 404);
});
