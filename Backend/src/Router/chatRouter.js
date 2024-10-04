import { Router } from "express";
import { chathistory } from "../Controllers/chat.controller.js";
import authentication from "../Middleware/auth.middleware.js";

const router = Router()

router.route('/history/:userId/:receiverId').get(authentication, chathistory)

export default router