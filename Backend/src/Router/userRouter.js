import {Router} from "express"
import { getCurrentUser, StudentRegister, userlogin, userlogout } from "../Controllers/user.controller.js"
import authentication from "../Middleware/auth.middleware.js"
import { upload } from "../Middleware/upload.middleware.js"

const router = Router()

router.route("/user/register").post(upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),StudentRegister)
router.route("/user/login").post(userlogin)
router.route("/user/current-user").get(authentication,getCurrentUser)
router.route("/user/logout").post(authentication,userlogout)

export default router