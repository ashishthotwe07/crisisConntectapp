import mongoose from "mongoose";

// Define the ChatBox schema
const conversationSchme = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

// Define the ChatBox model
const Conversation = mongoose.model("Conversation", conversationSchme);

export default Conversation;
