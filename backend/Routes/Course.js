const express=require("express");

const router=express.Router();

const {

    createCourse,

    publishCourse,

    getAllCourses,

    getCourse,

    getTeacherCourses,

    getCourseForLearning,

    uploadVideo

}=require("../Controller/Course");

const {auth}=require("../Middleware/Auth");
const {isTeacher,isStudent}=require("../Middleware/Role");


// Create Course
router.post(
    "/create",
    auth,
    isTeacher,
    createCourse
);

// Upload Course Video

router.post(

    "/upload-video",

    auth,

    isTeacher,

    uploadVideo

);
// Publish Course
router.put(
    "/publish/:id",
    auth,
    isTeacher,
    publishCourse
);


// Get All Published Courses
router.get(
    "/all",
    getAllCourses
);
// Get Teacher's Courses

router.get(

    "/teacher-courses",

    auth,

    isTeacher,

    getTeacherCourses

);
// Get Course For Learning

router.get(

    "/learn/:id",

    auth,

    isStudent,

    getCourseForLearning

);
// Get Single Course
router.get(
    "/:id",
    getCourse
);


module.exports=router;