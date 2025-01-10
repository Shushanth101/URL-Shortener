const express = require('express');
const URL=require("../models/url");

const router = express.Router();

router.get('/',async (req,res)=>{
        if(!req.user) return res.redirect("/login");
        const allUrls=await URL.find({createdBy: req.user.id})
        return res.render("home",{
            urls: allUrls
        })
})
router.get("/login",(req,res)=>{
    return res.render('login');
})

router.get("/signup",(req,res)=>{
    return res.render('signup')
})

module.exports = router