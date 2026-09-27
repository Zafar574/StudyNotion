const express=require("express");

const router=express.Router();

const {
    createOrder,
    verifyPayment
}=require("../Controller/Payment");

const {auth}=require("../Middleware/Auth");
const {isStudent}=require("../Middleware/Role");


// Create Razorpay Order
router.post(
    "/create-order",
    auth,
    isStudent,
    createOrder
);


// Verify Razorpay Payment
router.post(
    "/verify-payment",
    auth,
    isStudent,
    verifyPayment
);


module.exports=router;