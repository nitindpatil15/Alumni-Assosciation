import {Router} from "express"
import { AddNewEvent, deleteEvent, GetAllEvent, GetEventById, UpdateEvent } from "../Controllers/event.controller.js"
import authentication from "../Middleware/auth.middleware.js"
import { upload } from "../Middleware/upload.middleware.js"

const router = Router()

router.route("/newevent").post(authentication,upload.single("image"),AddNewEvent)
router.route("/").get(GetAllEvent)
router.route("/getbyid/:id").get(GetEventById)
router.route("/update/:id").patch(authentication,upload.single("image"),UpdateEvent)
router.route("/delete/:id").delete(authentication,deleteEvent)

export default router