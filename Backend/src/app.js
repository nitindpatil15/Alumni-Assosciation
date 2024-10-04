import express,{ Router } from "express";
import cookieParser from "cookie-parser"
// import routers here 
import chatRoutes from "./Router/chatRouter.js"
import userRoutes from "./Router/userRouter.js"

const app = express()

// for setting limits on data
app.use(express.json({ limit: "50mb" }));

// parse incoming requests in url of browser
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// for any kind of static files, public is folder
app.use(express.static("public"));

// Accessing cookies from user browser which can only  be accessed by server side code using the following method
app.use(cookieParser());

// Routes for API 
app.use("/api/v1/user/auth", userRoutes);
app.use("/api/v1/user/chat",chatRoutes)

export {app}