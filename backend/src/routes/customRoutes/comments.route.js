import express from "express"
import asyncHandler from "../../utils/asyncHandler.js"
import CommentController from "../../controller/comments.controller.js"
import CommentMiddleWares from "../../middleware/comments.middleware.js"

const commentsRouter = express.Router()


commentsRouter.post("/create", asyncHandler(CommentMiddleWares.CreateCommentMiddleWare), asyncHandler(CommentController.createComment))

commentsRouter.delete("/delete", asyncHandler(CommentController.deleteComment))

commentsRouter.put("/update", asyncHandler(CommentMiddleWares.UpdateCommentMiddleWare),  asyncHandler(CommentController.UpdateComment))

export default commentsRouter