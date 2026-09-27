const express = require("express");

const router = express.Router();

const {
    enrollStudent,
    getStudentCourses,
    getCourseStudents,
    getLearningCourse
} = require("../Controller/Enrollment");

const { auth } = require("../Middleware/Auth");
const { isStudent, isTeacher } = require("../Middleware/Role");


// Enroll student manually
router.post(
    "/enroll",
    auth,
    isStudent,
    enrollStudent
);


// Get student's purchased courses
router.get(
    "/student-courses",
    auth,
    isStudent,
    getStudentCourses
);


// Get students of teacher's course
router.get(
    "/course/:id/students",
    auth,
    isTeacher,
    getCourseStudents
);


// Get course for learning
router.get(
    "/learn/:id",
    auth,
    isStudent,
    getLearningCourse
);


module.exports = router;