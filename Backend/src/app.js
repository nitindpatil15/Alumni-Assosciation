import express,{ Router } from "express";
import cookieParser from "cookie-parser"
// import routers here 

const app = express()
const router = Router()

// for setting limits on data
app.use(express.json({ limit: "50mb" }));

// parse incoming requests in url of browser
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// for any kind of static files, public is folder
app.use(express.static("public"));

// Accessing cookies from user browser which can only  be accessed by server side code using the following method
app.use(cookieParser());

// Routes for API 
router.route("/").post()

export {app}