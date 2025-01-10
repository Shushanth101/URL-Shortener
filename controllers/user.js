const express=require('express');
const User = require('../models/user');

const {setUser}=require("../service/user");

async function handleUserSignUp(req,res){
    const body = req.body;
    const Email=await User.findOne({ email: body.email})
    if(Email){
    return res.send("email already exists")
}
await User.create({
    name:body.name,
    email:body.email,
    password:body.password
})
return res.redirect("/login")
}


async function handleUserLogin(req,res){
    const {email,password}=req.body;
    const user= await User.findOne({email,password})
    if(!user){
        return res.render("login",{
            error:"Your email or password is incorrect",
        })
    }
    
   const sessionId=setUser(user)
    res.cookie("uid",sessionId)
    return res.redirect("/");
}

module.exports ={
    handleUserSignUp,
    handleUserLogin,
}