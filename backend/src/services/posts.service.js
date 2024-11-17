import mongoose from "mongoose";
import PostsRepository from "../repositery/posts.repository.js";
import { CustomError } from "../utils/errorHandler.utility.js";
import statusCodeUtility from "../utils/statuscode.utility.js";
import CommentService from "./comments.service.js";

class PostServices {

   static async createnewpostService(data){
      const newpost  = await PostsRepository.create(data)
      if(!newpost){
         throw new CustomError("not able to create post", statusCodeUtility.Conflict)
      }
      return newpost
   }


   static async getAllPostsService(filter ={}, limit){
      const allPosts = await PostsRepository.find(filter, limit)
      if(!allPosts){
         throw new CustomError("not able to fetch posts", statusCodeUtility.NotFound)
      }
      return allPosts
   }

   static async updateService(filter, data){
      const updatedPost = await PostsRepository.findOneAndUpdate(filter, data)
      if(!updatedPost){
         throw new CustomError("unable to update data", statusCodeUtility.Conflict)
      }
      return updatedPost
   }

   static async singlePostService(filter){
      const singlePost = await PostsRepository.findOne(filter)
      if(!singlePost){
         throw new CustomError("not able to fetch post", statusCodeUtility.NotFound)
      }
      return singlePost
   }

   static async deletePostService(filter){
      const session = await mongoose.startSession()

      try {
         await session.startTransaction()

         const deletedPost = await PostsRepository.findOndeAndDelete(filter, {session})

         if(!deletedPost){
            await session.abortTransaction()
            throw new CustomError("not able to delete post", statusCodeUtility.NotFound)
         }
         const payload = {postId:filter._id}


         await CommentService.deleteCommentService(payload,{})


         await session.commitTransaction()

         return deletedPost

      } catch (error) {
         await session.abortTransaction()
         throw new CustomError(error.message, statusCodeUtility.InternalServerError)

      }finally{
         await session.endSession()
      }
     
   }
   
   
}


export default PostServices;