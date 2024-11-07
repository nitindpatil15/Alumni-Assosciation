import mongoose, { Schema } from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    participants:[{
      type:Schema.Types.ObjectId,
      ref:"User"
    }],
    message: [{
      type: Schema.Types.ObjectId,
      ref:"Message",
      default:[]
    }],
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", ChatSchema);
