import PostsRepository from "../repositery/posts.repository.js";
import { CustomError } from "../utils/errorHandler.utility.js";
import statusCodeUtility from "../utils/statuscode.utility.js";

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
      const newComment = await PostsRepository.findOneAndUpdate(filter, data)
      if(!newComment){
         throw new CustomError("not able to add comment", statusCodeUtility.Conflict)
      }
      return newComment
   }

   static async singlePostService(filter){
      const singlePost = await PostsRepository.findOne(filter)
      if(!singlePost){
         throw new CustomError("not able to fetch post", statusCodeUtility.NotFound)
      }
      return singlePost
   }
}


export default PostServices;