const Category=require("../models/Category");

exports.createCategory=async(req,res)=>{
    try{
        const {name,description}=req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required ",
            })
        }
        const CategoryDetails=await Category.create({
            name:name,
            description:description,
        });
        console.log(CategoryDetails);

        return res.status(200).json({
            success:true,
            message:"Category created successfully",
        })

    }catch(err){
        return res.status(500).json({
            success:fase,
            message:err.message,
        })
    }
}

exports.showAllCategories=async (req,res)=>{
    try{
        const AllTags=await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"All Categories returned successfully",
        })
    }catch(err){
        return res.status(500).json({
            success:fase,
            message:err.message,
        })
    }
}