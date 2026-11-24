
# Student Management Backend API

A RESTful API for managing student information using Node.js and Express.js.

## Features

- Create a student
- Get all students
- Get a student by ID
- Update student information
- Delete a student
- Input validation
- Automated integration testing

## Technologies Used

- Node.js
- Express.js
- JSON file storage
- Supertest
- Node.js Test Runner

## Project Setup

1. Clone the repository.
2. Install dependencies:

   npm install

3. Start the server:

   npm start

4. Server runs at:

   http://localhost:5000

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/students | Create student |
| GET | /api/students | Get all students |
| GET | /api/students/:id | Get student by ID |
| PATCH | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |

## Run Automated Tests

npm test

## Testing

All 8 automated integration tests passed successfully.

## Storage

Student information is stored in a local JSON file.
