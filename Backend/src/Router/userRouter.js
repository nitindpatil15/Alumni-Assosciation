import {Router} from "express"
import { getCurrentUser, userlogin, userlogout, userRegister } from "../Controllers/user.controller.js"
import authentication from "../Middleware/auth.middleware.js"

const router = Router()

router.route("/user/register").post(userRegister)
router.route("/user/login").post(userlogin)
router.route("/user/current-user").get(authentication,getCurrentUser)
router.route("/user/logout").post(authentication,userlogout)

export default router