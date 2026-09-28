exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(403).json({
        success: false,
        message: "Only students are allowed",
      });
    }

    next();
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,
      message: "Student authorization failed",
      data: e.message,
    });
  }
};

exports.isTeacher = async (req, res, next) => {
  try {
    if (req.user.role !== "Teacher") {
      return res.status(403).json({
        success: false,
        message: "Only teachers are allowed",
      });
    }

    next();
  } catch (e) {
    console.log(e.message);

    res.status(500).json({
      success: false,
      message: "Teacher authorization failed",
      data: e.message,
    });
  }
};
