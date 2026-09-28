const Course = require("../Model/Course");
const Category = require("../Model/Category");
const User = require("../Model/User");
const Enrollment = require("../Model/Enrollment");
const cloudinary = require("../Config/cloudinary");
const fs = require("fs");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      whatYouWillLearn,
      category,
      lectures,
      price,
      thumbnail,
    } = req.body;

    const teacherId = req.user.id;

    const teacher = await User.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }

    if (teacher.role !== "Teacher") {
      return res.status(403).json({
        success: false,
        message: "Only teacher can create course",
      });
    }

    // Find category
    let categoryData = await Category.findOne({
      name: category,
    });

    // Create category if it does not exist
    if (!categoryData) {
      categoryData = new Category({
        name: category,
      });

      await categoryData.save();
    }

    const course = new Course({
      title: title,

      description: description,

      whatYouWillLearn: whatYouWillLearn,

      teacher: teacherId,

      category: categoryData._id,

      lectures: lectures,

      price: price,

      thumbnail: thumbnail,
    });

    const response = await course.save();

    // Add course to teacher's courses
    await User.findByIdAndUpdate(
      teacherId,
      {
        $push: {
          courses: response._id,
        },
      },
      {
        new: true,
      },
    );

    // Add course to category
    await Category.findByIdAndUpdate(
      categoryData._id,
      {
        $push: {
          courses: response._id,
        },
      },
      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,

      message: "Course created successfully",

      data: response,
    });
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,

      message: "Course creation failed",

      data: e.message,
    });
  }
};

// Publish Course
exports.publishCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const teacherId = req.user.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.teacher.toString() !== teacherId) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this course",
      });
    }

    course.published = true;

    const response = await course.save();

    res.status(200).json({
      success: true,

      message: "Course published successfully",

      data: response,
    });
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,

      message: "Course publishing failed",

      data: e.message,
    });
  }
};

// Get All Published Courses
exports.getAllCourses = async (req, res) => {
  try {
    const response = await Course.find({
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

// Get Single Course
exports.getCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const response = await Course.findOne({
      _id: courseId,
      published: true,
    })
      .populate("teacher")
      .populate("category")
      .exec();

    if (!response) {
      return res.status(404).json({
        success: false,

        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,

      message: "Course shown successfully",

      data: response,
    });
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,

      message: "Course could not be shown",

      data: e.message,
    });
  }
};
// Get Teacher's Courses

exports.getTeacherCourses = async (req, res) => {
  try {
    const teacherId = req.user.id;

    const response = await Course.find({
      teacher: teacherId,
    })

      .populate("teacher")

      .populate("category")

      .exec();

    res.status(200).json({
      success: true,

      message: "Teacher courses shown successfully",

      data: response,
    });
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,

      message: "Teacher courses could not be shown",

      data: e.message,
    });
  }
};
// Get Course For Learning
exports.getCourseForLearning = async (req, res) => {
  try {
    const courseId = req.params.id;

    const studentId = req.user.id;

    const enrollment = await Enrollment.findOne({
      student: studentId,

      course: courseId,
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,

        message: "You have not purchased this course",
      });
    }

    const course = await Course.findOne({
      _id: courseId,

      published: true,
    })
      .populate("teacher")
      .populate("category")
      .exec();

    if (!course) {
      return res.status(404).json({
        success: false,

        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,

      message: "Course loaded successfully",

      data: course,
    });
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,

      message: "Course could not be loaded",

      data: e.message,
    });
  }
};

// Upload Course Video

exports.uploadVideo = async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Check whether file exists

    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,

        message: "Please select a video",
      });
    }

    const file = req.files.file;

    // Upload video to Cloudinary

    const response = await cloudinary.uploader.upload(
      file.tempFilePath,

      {
        folder: "SkillBazar/videos",

        resource_type: "video",
      },
    );

    // Delete temporary file

    fs.unlinkSync(file.tempFilePath);

    res.status(200).json({
      success: true,

      message: "Video uploaded successfully",

      data: {
        url: response.secure_url,
      },
    });
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,

      message: "Video upload failed",

      data: e.message,
    });
  }
};
