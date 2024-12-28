import mongoose from 'mongoose';
import dbConnect from '../libs/prisma';

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

let Message;

async function initMessageModel() {
  await dbConnect();
  Message = mongoose.models.Message || mongoose.model('Message', messageSchema);
  return Message;
}

export default initMessageModel;
