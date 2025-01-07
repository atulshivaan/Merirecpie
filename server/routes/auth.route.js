import express from "express"
import { userLogin, userSignup, } from "../controllers/aut.controller.js"

const authRouter = express.Router()

authRouter.post("/login",userLogin)
authRouter.post("/signup",userSignup)




export default authRouter
