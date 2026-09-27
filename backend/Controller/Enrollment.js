const Enrollment=require("../Model/Enrollment");
const Course=require("../Model/Course");


// Enroll Student In Course

exports.enrollStudent=async (req,res)=>{

    try{

        const {courseId}=req.body;

        const studentId=req.user.id;


        const course=await Course.findById(courseId);


        if(!course){

            return res.status(404).json({
                success:false,
                message:"Course not found"
            });

        }


        if(!course.published){

            return res.status(400).json({
                success:false,
                message:"Course is not published"
            });

        }


        const alreadyEnrolled=await Enrollment.findOne({

            student:studentId,

            course:courseId

        });


        if(alreadyEnrolled){

            return res.status(400).json({
                success:false,
                message:"You already purchased this course"
            });

        }


        const enrollment=new Enrollment({

            student:studentId,

            course:courseId,

            amount:course.price

        });


        const response=await enrollment.save();


        // Add student to course

        await Course.findByIdAndUpdate(

            courseId,

            {
                $push:{
                    students:studentId
                }
            },

            {
                new:true
            }

        );


        res.status(200).json({

            success:true,

            message:"Course purchased successfully",

            data:response

        });

    }

    catch(e){

        console.log(e.message);

        res.status(500).json({

            success:false,

            message:"Course purchase failed",

            data:e.message

        });

    }

};



// Get Student's Courses

exports.getStudentCourses=async (req,res)=>{

    try{

        const studentId=req.user.id;


        const response=await Enrollment.find({

            student:studentId

        })
        .populate({

            path:"course",

            populate:[

                {
                    path:"teacher"
                },

                {
                    path:"category"
                }

            ]

        })
        .exec();


        res.status(200).json({

            success:true,

            message:"Student courses shown successfully",

            data:response

        });

    }

    catch(e){

        console.log(e.message);

        res.status(500).json({

            success:false,

            message:"Student courses could not be shown",

            data:e.message

        });

    }

};



// Get Students Of Teacher's Course

exports.getCourseStudents=async (req,res)=>{

    try{

        const courseId=req.params.id;

        const teacherId=req.user.id;


        const course=await Course.findById(courseId);


        if(!course){

            return res.status(404).json({

                success:false,

                message:"Course not found"

            });

        }


        if(course.teacher.toString()!==teacherId){

            return res.status(403).json({

                success:false,

                message:"You are not the owner of this course"

            });

        }


        const response=await Enrollment.find({

            course:courseId

        })
        .populate("student")
        .exec();


        res.status(200).json({

            success:true,

            message:"Course students shown successfully",

            data:response

        });

    }

    catch(e){

        console.log(e.message);

        res.status(500).json({

            success:false,

            message:"Course students could not be shown",

            data:e.message

        });

    }

};



// Get Course For Learning

exports.getLearningCourse=async (req,res)=>{

    try{

        const courseId=req.params.id;

        const studentId=req.user.id;


        // Check whether student purchased the course

        const enrollment=await Enrollment.findOne({

            student:studentId,

            course:courseId

        });


        if(!enrollment){

            return res.status(403).json({

                success:false,

                message:"You have not purchased this course"

            });

        }


        // Get course

        const response=await Course.findById(courseId)

        .populate("teacher")

        .populate("category")

        .exec();


        if(!response){

            return res.status(404).json({

                success:false,

                message:"Course not found"

            });

        }


        res.status(200).json({

            success:true,

            message:"Course loaded successfully",

            data:response

        });

    }

    catch(e){

        console.log(e.message);

        res.status(500).json({

            success:false,

            message:"Course could not be loaded",

            data:e.message

        });

    }

};