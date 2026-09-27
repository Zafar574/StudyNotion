const express=require("express");

const router=express.Router();

const {
    createCategory,
    getAllCategories,
    getCoursesByCategory
}=require("../Controller/Category");


// Create Category
router.post("/create",createCategory);


// Get All Categories
router.get("/all",getAllCategories);


// Get Courses By Category
router.get("/:id/courses",getCoursesByCategory);


module.exports=router;