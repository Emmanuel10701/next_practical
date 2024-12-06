import mongoose from 'mongoose';
import  Connection  from '../models/mongoose';
const messageSchema = new mongoose.Schema(
  {
    room: String,
    userId: String,
    message: String,
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null },
    status: { type: String, enum: ['sent', 'delivered', 'read'], default: 'sent' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
