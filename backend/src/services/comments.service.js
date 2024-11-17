import CommentRepository from "../repositery/comments.repository.js";

class CommentService{


   static async createCommentService(data){
     const newComment = await CommentRepository.create(data)
     return newComment;
   }

   static async deleteCommentService(filter){
    const deletedComment = await CommentRepository.delete(filter)
    return deletedComment;
   }

   static async updateCommentService(filter, data){
    const updatedComment = await CommentRepository.update(filter, data)
    if(!updatedComment){
        throw new Error("not able to update comment")
    }
    return updatedComment;
   }


   static async deleteCommentsService(filter, options){
      const deletedComments = await CommentRepository.deleteMany(filter, options)
      return deletedComments;
   }
}


export default CommentService