import { connect, isValidObjectId } from "mongoose";
import { CustomError } from "../utils/errorHandler.utility.js";
import statusCodeUtility from "../utils/statuscode.utility.js";


class CommentMiddleWares{



    static async CreateCommentMiddleWare(request, response, next){
      const {content, postId, commentText} = request.body

      if(!postId){
        throw new CustomError("Post id not found", statusCodeUtility.BadRequest)
      }
      await  isValidObjectId(postId)

      if(!commentText.trim()){
        throw new CustomError("Comment text not found", statusCodeUtility.BadRequest)
      }
      if(!content){
        throw new CustomError("Comment innerHTML is not found", statusCodeUtility.BadRequest)
      }
      request.body = {...request.body, content: replacerbService(content)}
      next()
    }


    static async UpdateCommentMiddleWare(request, response, next){
        const {content, commentText} = request.body
        const {id} = request.query

        if(!id){
            throw new CustomError("Comment id not found", statusCodeUtility.BadRequest)
        }
        await  isValidObjectId(id)

        if(!commentText.trim()){
            throw new CustomError("Comment text not found to ", statusCodeUtility.BadRequest)
        }
        if(!content){
            throw new CustomError("Comment innerHTML is not found", statusCodeUtility.BadRequest)
        }
        request.body = {...request.body, content: replacerbService(content)}
        next()
    }
}


const replacerbService =(content)=>{
    return content.replace(/(<br\s*\/?>)+$/gi, '')
}

export default CommentMiddleWares