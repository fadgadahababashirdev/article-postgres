const express = require("express")
const createAuthor = require("../controler/author")
const authentication = require("../controler/auth")
const authorization = require("../controler/authorization")
const authRouter = express.Router() 
authRouter.post("/register" , authorization, createAuthor)
authRouter.post("/login" ,authentication)
module.exports =authRouter