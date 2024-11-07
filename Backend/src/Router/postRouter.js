import { Router } from "express";
import { allPosts, createPost, deletePost, UpdatePost, userPost } from "../Controllers/post.controller.js"
import { upload } from "../Middleware/upload.middleware.js"
import authentication from "../Middleware/auth.middleware.js"

const router = Router()

router.route('/newpost').post(authentication,upload.single("mediaurl"),createPost)
router.route('/all-posts').get(allPosts)
router.route('/delete-post/:postId').delete(authentication,deletePost)
router.route('/update-post/:postId').patch(authentication,upload.single("mediaurl"),UpdatePost)
router.route('/user/all-posts').get(authentication,userPost)

export default router