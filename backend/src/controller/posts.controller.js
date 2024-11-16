import PostServices from "../services/posts.service.js";
import ResponseHandler from "../utils/responseHandler.utility.js";
import statusCodeUtility from "../utils/statuscode.utility.js";

class PostController{

    static async createPost(request , response, next){
        const{title, description} = request.body;
        const data = {
            title,
            description
        }
        const newPost = await PostServices.createnewpostService(data)

        return ResponseHandler(statusCodeUtility.Created, "post created successfully", newPost, response)
    
    }

    static async getAllPosts(request, response, next){
        const {limit} = request.query;
        const allPosts = await PostServices.getAllPostsService(limit)
        return ResponseHandler(statusCodeUtility.Success, "posts fetched successfully", allPosts, response)
    }


    static async getSinglePost(request, response, next){
        const {id} = request.query
        const singlePost = await PostServices.singlePostService({_id: id})
        return ResponseHandler(statusCodeUtility.Success, "post fetched successfully", singlePost, response)
    }

    static async addnewCommnet(request, response, next){
        const {postId, comment} = request.body;
        const data = {
            postId,
            content
        }
        const newComment = await PostServices.addNewCommentService(data)
        return ResponseHandler(statusCodeUtility.Created, "comment added successfully", newComment, response)
    }


}


export default PostController