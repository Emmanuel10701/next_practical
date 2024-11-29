import { Server } from "socket.io";

const ioHandler = (req, res) => {
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
      socket.on("sendMessage", ({ room, message, userId, replyTo }) => {
        io.to(room).emit("receiveMessage", {
          userId,
          message,
          replyTo,
          timestamp: new Date(),
        });
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
