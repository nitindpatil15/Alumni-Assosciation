import http from "http";
import { Server } from "socket.io";
import express from "express";
import cookieParser from "cookie-parser";
// import routers here
import chatRoutes from "./Router/chatRouter.js";
import userRoutes from "./Router/userRouter.js";
import postRoutes from "./Router/postRouter.js";
import jobRoutes from "./Router/jobRouter.js";
import eventRoutes from "./Router/eventRouter.js";
import registerEventRoutes from "./Router/registerEventRoute.js";

const app = express();

// for setting limits on data
app.use(express.json({ limit: "50mb" }));

// parse incoming requests in url of browser
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// for any kind of static files, public is folder
app.use(express.static("public"));

// Accessing cookies from user browser which can only  be accessed by server side code using the following method
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

export const getRecieverSocketId = (reciverId) => {
  return userSocketmap[reciverId];
};

const userSocketmap = {}; //{userId,socketId}
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId !== "undefine") userSocketmap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketmap));

  socket.on("disconnect", () => {
    delete userSocketmap[userId],
      io.emit("getOnlineUsers", Object.keys(userSocketmap));
  });
});

// Routes for API
app.use("/api/v1/user/auth", userRoutes);
app.use("/api/v1/user/chat", chatRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/event", eventRoutes);
app.use("/api/v1/event/register", registerEventRoutes);

export { app, io, server };
