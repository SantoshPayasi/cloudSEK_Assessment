
import CommentService from "../services/comments.service.js";
import PostServices from "../services/posts.service.js";
import { CustomError } from "../utils/errorHandler.utility.js";
import ResponseHandler from "../utils/responseHandler.utility.js";
import statusCodeUtility from "../utils/statuscode.utility.js";


class CommentController {

    static async createComment(request, response, next) {
            const { content, postId, commentText } = request.body;

            const data = {
                comment:content,
                postId,
                commentText
            }
            const newcomment = await CommentService.createCommentService(data)

            await PostServices.updateService({ _id: postId }, { $push: { comments: newcomment._id } })
            
            return ResponseHandler(statusCodeUtility.Created, "Created Successfully", newcomment, response)

    }


    static async deleteComment(request, response, next) {
            const { id } = request.query;
            const targetComment = await CommentService.deleteCommentService({ _id: id })

            await PostServices.updateService({ _id: targetComment.postId }, { $pull: { comments: id } })

            return ResponseHandler(statusCodeUtility.Success, "Deleted Successfully", targetComment , response)
    }


    static async UpdateComment(request, response, next) {
            const { id } = request.query;
            const { content, commentText } = request.body;
            const updatedComment = await CommentService.updateCommentService({ _id: id }, { comment: content , commentText})

            return ResponseHandler(statusCodeUtility.Success, "Updated Successfully", updatedComment, response)
    }
}


export default CommentController