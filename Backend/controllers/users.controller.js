//!User Registration
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken");


const userController={
    register: asyncHandler(async(req, res)=>{
        const {username, email, password } = req.body;
        //*CHECK ALL VALUES ENTERED
        if(!username ||!email ||!password){
            throw new Error("All fields are required")
        }
        //* CHECK IF USER ALREADLY exists
        const existingUser=await User.findOne({email})
        if(existingUser){
            throw new Error("User already exists")
        }
        //* HASH PASSWORD
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password, salt);
        //* CREATE NEW USER
        const userCreated=await User.create({username, email, password:hashedPassword})
        //* SEND SUCCESSFUL RESPONSE
        res.json({
            _id:userCreated._id,
            username:userCreated.username,
            email:userCreated.email,
            
        })
    }),

    login:asyncHandler(async(req,res)=>{
        //*GET USER DATA
        const {email, password } = req.body;
        //* CHECK ALL VALUES ENTERED
        if(!email ||!password){
            throw new Error("All fields are required")
        }
        //* FIND USER
        const user=await User.findOne({email})
        if(!user){
            throw new Error("Invalid login credentials (USer not found)")
        }
        //* CHECK PASSWORD OR COMPARE USER PASSWORD
        const isMatch=await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Invalid login credentials (password mismatch)")
        }
        //* CREATE AND SEND JWT TOKEN
        const token=jwt.sign({id:user._id}, "heyheyhey", {expiresIn: '30d'})
        res.json({
            message:"Login successful",
            token,
            user:{
                _id:user._id,
                username:user.username,
                email:user.email,
            },

        })
    }),

    profile:asyncHandler(async (req, res) => {
        console.log("request user",req.user);
        const user=await User.findById(req.user)
        if(!user){
            throw new Error("User not found")
        }
        res.json({ username: user.username, email: user.email })
    }),

    changePassword:asyncHandler(async (req, res) => {
        // console.log("req.body",req.body);
        const {newPassword}=req.body
        // Check if newPassword is provided
    if (!newPassword) {
        return res.status(400).json({ message: "New password is required" });
    }
        const user=await User.findById(req.user)
        if(!user){
            throw new Error("User not found")
        }
        //* HASH NEW PASSWORD
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(newPassword, salt);
        user.password=hashedPassword;
        await user.save({validateBeforeSave: false,})
        
        res.json({ message: "Password changed successfully" })
    }),

    updateUserProfile:asyncHandler(async (req, res) => {
        const {username, email}=req.body
        // console.log("req",req);
        const updatedUserProfile=await User.findByIdAndUpdate(req.user,{ username, email},{new:true})
        if(!updatedUserProfile){
            throw new Error("User not found")
        }
        res.json({ message:"USer Upadate",username: updatedUserProfile.username, email: updatedUserProfile.email})
    })
}

module.exports=userController;