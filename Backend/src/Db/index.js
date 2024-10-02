import mongoose from "mongoose"
import { DB_NAME, MONGODB_URI } from "../constant.js"

const connectDb = async()=>{
    try {
        const connect = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDB Connected!! DB Host: ${connect.connection.host}`)
    } catch (error) {
        console.log("Failed to connect MongoDB",error.message)
    }
}

export default connectDb