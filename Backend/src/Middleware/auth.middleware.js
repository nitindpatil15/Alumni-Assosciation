import jwt from "jsonwebtoken"
import { ACCESSTOKEN_SECRET_KEY } from "../constant.js"
import { User } from "../Models/User.js"

const authentication = async(req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")
        console.log("Token from Middleware:",token)
        if(!token){
            throw new Error("Unauthorized User")
        }
        const decodedUser =  jwt.verify(token,ACCESSTOKEN_SECRET_KEY)
        if(!decodedUser){
            throw new Error("Invalid Token")
        }

        const selectUser = await User.findById(decodedUser?._id).select("-password")
        if(!selectUser){
            throw new Error("User Not Found")
        }
        req.user = selectUser
        console.log("Authorized User",selectUser)
        next()
    } catch (error) {
        throw new Error(error?.message || "Server Error")
    }
}

export default authentication