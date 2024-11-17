import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import PostController from "../../controller/posts.controller.js";
import PostMiddlewares from "../../middleware/posts.middleware.js";

const postsRouter = express.Router();

postsRouter.post(
  "/create",
  asyncHandler(PostMiddlewares.createPostMiddleWare),
  asyncHandler(PostController.createPost)
);

postsRouter.get("/getall", asyncHandler(PostController.getAllPosts));

postsRouter.get(
  "/getsingle",
  asyncHandler(PostMiddlewares.getSinglePostMiddleWare),
  asyncHandler(PostController.getSinglePost)
);

postsRouter.delete(
  "/delete",
  asyncHandler(PostMiddlewares.deletePostMiddleWare),
  asyncHandler(PostController.deletePost)
);

postsRouter.put(
  "/update",
  asyncHandler(PostMiddlewares.updatePostMiddleWare),
  asyncHandler(PostController.updatePost)
);
export default postsRouter;
