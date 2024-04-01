import Message from "../models/chat.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";
import { io } from "../index.js";

class ChatController {
  sendMessage = async (req, res) => {
    try {
      const { message } = req.body;
      const { id: recipientId } = req.params;
      const senderId = req.user._id;

      // Fetch sender's details to get the username
      const sender = await User.findById(senderId);

      // Create a new chat message with sender and recipient IDs
      const newMessage = new Message({
        sender: senderId,
        recipient: recipientId,
        message,
      });

      // Save the new message
      await newMessage.save();

      // Find or create the conversation between the users
      let conversation = await Conversation.findOne({
        users: { $all: [senderId, recipientId] },
      });

      // If conversation doesn't exist, create a new one
      if (!conversation) {
        conversation = new Conversation({
          users: [senderId, recipientId], // Include the sender and recipient in the conversation
        });
      } else {
        conversation.messages.push(newMessage._id); // Add the new message to the existing conversation
      }

      // Save the conversation
      await conversation.save();

      io.to(recipientId).emit("newMessage", newMessage);

      // Create and emit a new message notification to the recipient's socket room
      const notificationMessage = {
        user: req.user._id,
        type: "message",
        message: `New message from ${sender.username}`, // Include sender's username in the notification
      };

      io.emit("newMessageNotification", notificationMessage);

      return res.status(201).json({ message: newMessage });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getMessages = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user._id;

      // Find the conversation based on the provided id and userId
      const conversation = await Conversation.findOne({
        users: { $all: [userId, id] },
      }).populate("messages");
      const user = await Conversation.find().populate("users");

      // If conversation doesn't exist or user is not part of the conversation, return 404 Not Found
      if (!conversation) {
        return res.status(200).json([]);
      }

      // Return the messages associated with the conversation
      return res.status(200).json(conversation.messages);
    } catch (error) {
      console.error("error in getMessages controller in server", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  getChats = async (req, res) => {
    try {
      // Find all conversations
      const userId = req.user._id;
      const conversations = await Conversation.find().populate("users");

      // Array to store users involved in conversations
      const usersInConversations = [];

      // Iterate through each conversation
      for (const conversation of conversations) {
        // Extract user IDs from the conversation
        const userIds = conversation.users.map((user) => user._id);

        // Find the other user in the conversation
        const otherUser = conversation.users.find(
          (user) => user._id.toString() !== userId.toString()
        );

        // Add the other user to the array if not already included
        if (
          !usersInConversations.some(
            (user) => user._id.toString() === otherUser._id.toString()
          )
        ) {
          usersInConversations.push(otherUser);
        }
      }

      // Send the response with the users involved in conversations
      return res.status(200).json({ users: usersInConversations });
    } catch (error) {
      console.error("Error in getChats controller:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default new ChatController();
