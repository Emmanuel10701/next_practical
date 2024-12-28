import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Message from '../../../models/mongoose';

const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { room, message, userId, replyTo } = body;

    const newMessage = new Message({ room, message, userId, replyTo });
    await newMessage.save();

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save the message' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const room = url.searchParams.get('room');

    const messages = await Message.find({ room }).sort({ createdAt: 1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

// Handle unsupported HTTP methods
export async function middleware(req) {
  if (!['GET', 'POST'].includes(req.method)) {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }
}
