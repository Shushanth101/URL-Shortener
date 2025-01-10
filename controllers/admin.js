const URL = require("../models/url")
const User=require("../models/user")

async function handleAdminRequestForUrl(req, res) {
    const allUrls= await URL.find({})
  
    return res.render("home",{
        urls: allUrls,
        admin: true, // Add this line for admin view only
    })
}

async function handleAdminRequestForUser(req, res) {
    const allusers= await User.find({})
    return res.render("home",{
        users: allusers,
    })
}

module.exports = {
    handleAdminRequestForUrl,
    handleAdminRequestForUser}

// In routes/StaticRouter.js