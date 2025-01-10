const express = require('express');
const {handleAdminRequestForUrl,handleAdminRequestForUser}=require("../controllers/admin");

const router=express.Router();

router.get("/url",handleAdminRequestForUrl);
router.get("/user",handleAdminRequestForUser);

module.exports = router;