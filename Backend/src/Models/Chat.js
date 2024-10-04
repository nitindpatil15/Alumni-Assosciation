import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", ChatSchema);
