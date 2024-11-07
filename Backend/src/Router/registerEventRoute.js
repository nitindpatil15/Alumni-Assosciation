import { Router } from "express";
import authentication from "../Middleware/auth.middleware";
import { RegisterEvent } from "../Models/RegisterEvent";
import { GetAllRegisteredUserOfEvent } from "../Controllers/regsterevent.controller";

const router = Router()

router.route('/register').post(authentication,RegisterEvent)
router.route('/register/user').get(authentication,GetAllRegisteredUserOfEvent)

export default router