import {Router} from "express"
import authentication from "../Middleware/auth.middleware.js"
import { DeleteJob, GetAllJobs, GetJobById, GetSavePost, NewJob, SaveJobPost, UpdateJob } from "../Controllers/job.controller.js"

const router = Router()

router.route('/newjob').post(authentication,NewJob)
router.route('/all-jobs').get(GetAllJobs)
router.route('/job/:id').get(GetJobById)
router.route('/job/update/:id').get(authentication,UpdateJob)
router.route('/job/delete/:id').get(authentication,DeleteJob)
router.route('/job/save/:id').get(authentication,SaveJobPost)
router.route('/job/saved/posts/:id').get(authentication,GetSavePost)

export default router