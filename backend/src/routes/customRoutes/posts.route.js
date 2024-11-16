import express from "express"
import asyncHandler from "../../utils/asyncHandler.js"
import PostController from "../../controller/posts.controller.js"


const postsRouter = express.Router()


postsRouter.post("/create", asyncHandler(PostController.createPost))

postsRouter.get("/getall", asyncHandler(PostController.getAllPosts))

postsRouter.get("/getsingle", asyncHandler(PostController.getSinglePost))

export default postsRouter