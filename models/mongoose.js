import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    room: { type: String, required: true }, // Room identifier
    userId: { type: String, required: true }, // User ID
    message: { type: String, required: true }, // Message content
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // Optional reply-to message
    timestamp: { type: Date, default: Date.now }, // Timestamp of the message
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

export default mongoose.models.Message || mongoose.model("Message", messageSchema);
