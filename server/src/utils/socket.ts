import { Server } from "socket.io";
import { verifyToken } from "./jwt.js";

let io: Server;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = verifyToken(token);
      socket.data.userId = decoded.userId;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.data.userId);

    socket.join(socket.data.userId);
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
};
