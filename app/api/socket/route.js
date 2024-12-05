import mongoose from 'mongoose';
import Message from '../../models/mongoose';

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    // Save new message
    const { room, message, userId, replyTo } = req.body;
    const newMessage = new Message({ room, message, userId, replyTo });
    await newMessage.save();
    return res.status(201).json(newMessage);
  } else if (req.method === 'GET') {
    // Get messages for the room
    const { room } = req.query;
    const messages = await Message.find({ room }).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
