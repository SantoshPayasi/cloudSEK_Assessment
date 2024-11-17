import express from "express"
import asyncHandler from "../../utils/asyncHandler.js"
import PostController from "../../controller/posts.controller.js"


const postsRouter = express.Router()


postsRouter.post("/create", asyncHandler(PostController.createPost))

postsRouter.get("/getall", asyncHandler(PostController.getAllPosts))

postsRouter.get("/getsingle", asyncHandler(PostController.getSinglePost))

postsRouter.delete("/delete", asyncHandler(PostController.deletePost))

postsRouter.put("/update", asyncHandler(PostController.updatePost))
export default postsRouter