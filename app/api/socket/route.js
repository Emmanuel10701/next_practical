import { Server } from "socket.io";
import dbConnect from "../../../libs/prisma";
import Message from "../../../models/m";

const ioHandler = async (req, res) => {
  await dbConnect(); // Connect to MongoDB

  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const users = {};

    io.on("connection", (socket) => {
      console.log("New connection:", socket.id);

      // Handle user joining
      socket.on("join", ({ userId, room }) => {
        socket.join(room);
        users[socket.id] = { userId, room };
        socket.to(room).emit("userJoined", { userId });
      });

      // Handle message sending
      socket.on("sendMessage", async ({ room, message, userId, replyTo }) => {
        const newMessage = new Message({
          room,
          message,
          userId,
          replyTo,
        });

        try {
          await newMessage.save(); // Save to MongoDB
          io.to(room).emit("receiveMessage", {
            userId,
            message,
            replyTo,
            timestamp: newMessage.timestamp,
          });
        } catch (error) {
          console.error("Error saving message:", error);
        }
      });

      // Handle user disconnect
      socket.on("disconnect", () => {
        const user = users[socket.id];
        if (user) {
          socket.to(user.room).emit("userLeft", { userId: user.userId });
          delete users[socket.id];
        }
      });
    });
  }

  res.end();
};

export default ioHandler;
