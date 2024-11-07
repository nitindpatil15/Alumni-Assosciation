import {Router} from "express"
import { AddNewEvent, deleteEvent, GetAllEvent, GetEventById, UpdateEvent } from "../Controllers/event.controller.js"
import authentication from "../Middleware/auth.middleware.js"
import { upload } from "../Middleware/upload.middleware.js"

const router = Router()

router.route("/newevent").post(authentication,upload.single("image"),AddNewEvent)
router.route("/").post(GetAllEvent)
router.route("/getbyid/:id").post(GetEventById)
router.route("/update/:id").post(authentication,upload.single("image"),UpdateEvent)
router.route("/delete/:id").post(authentication,deleteEvent)

export default router