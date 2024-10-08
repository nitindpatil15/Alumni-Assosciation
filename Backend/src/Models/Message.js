import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    conversationId:{
        type:Schema.Types.ObjectId,
        ref:"Chat",
        default:[]
    }
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)
export default Message