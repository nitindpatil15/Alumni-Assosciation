import {Router} from "express"
import { Adminlogin, Alumnilogin, AlumniRegister, getCurrentUser, studentlogin, StudentRegister, userlogout } from "../Controllers/user.controller.js"
import authentication from "../Middleware/auth.middleware.js"
import { upload } from "../Middleware/upload.middleware.js"

const router = Router()

router.route("/student/register").post(upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),StudentRegister)

router.route("/alumni/register").post(upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),AlumniRegister)
router.route("/student/login").post(studentlogin)
router.route("/alumni/login").post(Alumnilogin)
router.route("/admin/login").post(Adminlogin)
router.route("/user/current-user").get(authentication,getCurrentUser)
router.route("/user/logout").post(authentication,userlogout)

export default router