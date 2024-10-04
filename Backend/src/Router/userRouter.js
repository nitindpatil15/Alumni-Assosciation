import {Router} from "express"
import { userlogin, userRegister } from "../Controllers/user.controller.js"

const router = Router()

router.route("/user/register").post(userRegister)
router.route("/user/login").post(userlogin)

export default router