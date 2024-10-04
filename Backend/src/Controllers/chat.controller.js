import { Chat } from "../Models/Chat.js";

export const chathistory = async (req, res) => {
  const { userId, receiverId } = req.params;

  try {
    const messages = await Chat.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort("timestamp");

    return res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
