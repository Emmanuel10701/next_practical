import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    room: String,
    userId: String,
    message: String,
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
export default Message;
