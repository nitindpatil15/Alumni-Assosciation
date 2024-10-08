import { Router } from "express";
import {GetMessages, sendMessage } from "../Controllers/chat.controller.js";
import authentication from "../Middleware/auth.middleware.js";

const router = Router()

router.route('/send/:receiverId').post(authentication, sendMessage)
router.route('/:id').get(authentication, GetMessages)

export default router