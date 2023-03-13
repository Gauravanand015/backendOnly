const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/userModel");
require("dotenv").config();
const fs = require("fs")


userRouter.get("/Homepage",(req,res)=>{
    res.send("Getting HOmePage")
})

userRouter.post("/signup",async(req,res)=>{
    const {name,age,email,pass,role} = req.body;
    const userEmail = await UserModel.find({email:email})
    if(userEmail.length>0){
        return res.send("Email is already registered try using different email !!")
    }
    try {

        bcrypt.hash(pass, 5, async (err, hash)=>{
            // Store hash in your password DB.
            if(err){
                console.log(err)
                res.send("Please Fill All the Details!!")
            }else{
                const userData = new UserModel({
                    name,
                    age,
                    email,
                    pass:hash,
                    role
                })
                await userData.save();
                res.send("User Registered")
            }
        });
        
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while registering the user")
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass,role} = req.body;
    const userData = await UserModel.find({email:email})
    if(userData.length == 0){
        return res.send("Please Register First!!")
    }
    try {
        if(userData.length>0){
            bcrypt.compare(pass, userData[0].pass, (err, result)=>{
                if(err){
                    console.log(err);
                    res.send("email or password is incorrect / your are choosen the wrong path")
                }else{
                    const NLToken = jwt.sign({email:userData[0].email , role:userData[0].role},process.env.NORMAL,{expiresIn:"10m"})
                    const RHToken = jwt.sign({email:userData[0].email , role:userData[0].role},process.env.REFRESH,{expiresIn:"20m"})

                    res.cookie("NOR",NLToken);
                    res.cookie("REF",RHToken);
                    // console.log(req.cookies.NOR,"------------",req.cookies.REF)
                    res.send({
                        "message":"User Logged In",
                        "NormalToken":NLToken,
                        "RefreshToken":RHToken
                    })
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while logging the user")
    }
})


userRouter.get("/logout",(req,res)=>{
    const token =  req.cookies.NOR;
    const blacklisted = JSON.parse(fs.readFileSync("./db.json","utf-8"))
    blacklisted.push(token)
    fs.writeFileSync("./db.json",JSON.stringify(blacklisted))
    res.send("logout Successfully")
})

module.exports={
    userRouter
}