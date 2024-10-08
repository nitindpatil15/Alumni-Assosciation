import { getRecieverSocketId, io } from "../app.js";
import { Chat } from "../Models/Chat.js";
import Message from "../Models/Message.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";

export const sendMessage = async (req, res) => {
  const { message } = req.body;
  const { receiverId } = req.params;
  const senderId = req.user._id;

  try {
    let chats = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!chats) {
      chats = await Chat.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessages = new Message({
      senderId,
      receiverId,
      message,
      conversationId: chats._id,
    });

    if (newMessages) {
      chats.message.push(newMessages._id);
    }

    await Promise.all([chats.save(), newMessages.save()]);
    // Socket.io To Do
    const recieverSocketId = getRecieverSocketId(receiverId)
    if(recieverSocketId){
      io.to(recieverSocketId).emit("newMessage",newMessages)
    }

    return res
      .status(200)
      .json(new ApiResponce(200, "Message sent successfully", newMessages));
  } catch (error) {
    console.error(error);
    throw new ApiError(500, error?.message || "Server Error");
  }
};

export const GetMessages = async(req,res)=>{
try {
  const {id} = req.params
  const senderId = req.user._id

  const chats = await Chat.findOne({
    participants: { $all: [senderId, id] }
  }).populate("message")

  if(!chats){
    return res.json(new ApiResponce(200,[],"All Messages"))
  }
  const conversation =  chats.message
  return res.json(new ApiResponce(200,conversation,"Fetched Conversation"))
} catch (error) {
  throw new ApiError(500,error || "Server Error")
}
}