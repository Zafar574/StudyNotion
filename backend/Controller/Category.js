const Category = require("../Model/Category");
const Course = require("../Model/Course");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({
      name: name,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = new Category({
      name: name,
    });

    const response = await category.save();

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      data: response,
    });
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,
      message: "Category creation failed",
      data: e.message,
    });
  }
};

// Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const response = await Category.find({});

    res.status(200).json({
      success: true,
      message: "Categories shown successfully",
      data: response,
    });
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,
      message: "Categories could not be shown",
      data: e.message,
    });
  }
};

// Get Courses By Category
exports.getCoursesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const response = await Course.find({
      category: categoryId,
      published: true,
    })
      .populate("teacher")
      .populate("category")
      .exec();

    res.status(200).json({
      success: true,
      message: "Courses shown successfully",
      data: response,
    });
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,
      message: "Courses could not be shown",
      data: e.message,
    });
  }
};
