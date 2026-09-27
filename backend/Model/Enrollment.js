const mongoose=require("mongoose");

const enrollmentSchema=new mongoose.Schema({

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },

    paymentId:{
        type:String,
        default:""
    },

    orderId:{
        type:String,
        default:""
    },

    amount:{
        type:Number,
        required:true
    },

    purchasedAt:{
        type:Date,
        default:Date.now
    }

});

const Enrollment=mongoose.model("Enrollment",enrollmentSchema);

module.exports=Enrollment;