import { Router } from "express";
import authentication from "../Middleware/auth.middleware.js";
import { GetAllRegisteredUserOfEvent, RegisterForEvents } from "../Controllers/regsterevent.controller.js";

const router = Router()

router.route('/register/:id').post(authentication,RegisterForEvents)
router.route('/register/user/:id').get(authentication,GetAllRegisteredUserOfEvent)

export default router