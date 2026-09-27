const Razorpay=require("razorpay");
const crypto=require("crypto");

const Course=require("../Model/Course");
const Enrollment=require("../Model/Enrollment");

const razorpay=new Razorpay({

    key_id:process.env.RAZORPAY_KEY_ID,

    key_secret:process.env.RAZORPAY_KEY_SECRET

});


// Create Razorpay Order
exports.createOrder=async (req,res)=>{

    try{

        const {courseId}=req.body;

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
                message:"Course is not available"
            });

        }


        const alreadyEnrolled=await Enrollment.findOne({

            student:req.user.id,

            course:courseId

        });


        if(alreadyEnrolled){

            return res.status(400).json({
                success:false,
                message:"You already purchased this course"
            });

        }


        const options={

            amount:course.price*100,

            currency:"INR",

            receipt:`receipt_${Date.now()}`

        };


        const order=await razorpay.orders.create(options);


        res.status(200).json({

            success:true,

            message:"Order created successfully",

            data:{

                orderId:order.id,

                amount:order.amount,

                currency:order.currency,

                keyId:process.env.RAZORPAY_KEY_ID

            }

        });

    }
    catch(e){

        console.log(e.message);

        res.status(500).json({

            success:false,

            message:"Order creation failed",

            data:e.message

        });

    }

};



// Verify Payment
exports.verifyPayment=async (req,res)=>{

    try{

        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature,

            courseId

        }=req.body;


        const body=
            razorpay_order_id+"|"+razorpay_payment_id;


        const expectedSignature=
            crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");


        if(expectedSignature!==razorpay_signature){

            return res.status(400).json({

                success:false,

                message:"Payment verification failed"

            });

        }


        const course=await Course.findById(courseId);


        if(!course){

            return res.status(404).json({

                success:false,

                message:"Course not found"

            });

        }


        const alreadyEnrolled=await Enrollment.findOne({

            student:req.user.id,

            course:courseId

        });


        if(alreadyEnrolled){

            return res.status(400).json({

                success:false,

                message:"Course already purchased"

            });

        }


        const enrollment=new Enrollment({

            student:req.user.id,

            course:courseId,

            paymentId:razorpay_payment_id,

            orderId:razorpay_order_id,

            amount:course.price

        });


        const response=await enrollment.save();


        await Course.findByIdAndUpdate(

            courseId,

            {

                $push:{

                    students:req.user.id

                }

            },

            {

                new:true

            }

        );


        res.status(200).json({

            success:true,

            message:"Payment successful and course purchased",

            data:response

        });

    }
    catch(e){

        console.log(e.message);

        res.status(500).json({

            success:false,

            message:"Payment verification failed",

            data:e.message

        });

    }

};