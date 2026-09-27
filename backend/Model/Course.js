const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    whatYouWillLearn:[{
        type:String
    }],

    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },

    lectures:[{
        title:{
            type:String,
            required:true
        },

        video:{
            type:String,
            required:true
        }
    }],

    price:{
        type:Number,
        required:true
    },

    thumbnail:{
        type:String,
        default:""
    },

    published:{
        type:Boolean,
        default:false
    },

    students:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]

});

const Course=mongoose.model("Course",courseSchema);

module.exports=Course;