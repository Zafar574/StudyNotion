const express=require("express");

const router=express.Router();

const {
    sendOTP,
    verifyOTP,
    login,
    logout
}=require("../Controller/User");


// Send OTP
router.post("/send-otp",sendOTP);


// Verify OTP and Register
router.post("/verify-otp",verifyOTP);


// Login
router.post("/login",login);


// Logout
router.post("/logout",logout);


module.exports=router;