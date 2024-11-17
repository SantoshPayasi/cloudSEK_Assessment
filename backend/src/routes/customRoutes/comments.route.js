import express from "express"
import asyncHandler from "../../utils/asyncHandler.js"
import CommentController from "../../controller/comments.controller.js"

const commentsRouter = express.Router()


commentsRouter.post("/create", asyncHandler(CommentController.createComment))

commentsRouter.delete("/delete", asyncHandler(CommentController.deleteComment))

commentsRouter.put("/update", asyncHandler(CommentController.UpdateComment))

export default commentsRouter