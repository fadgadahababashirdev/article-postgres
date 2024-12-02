const express = require("express")
const createPost = require("./controller")
const router = express.Router() 
router.get("/register" , createPost)
module.exports=router