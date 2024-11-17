import { CustomError } from "../utils/errorHandler.utility.js";
import statusCodeUtility from "../utils/statuscode.utility.js";
import { isValidObjectId } from "../utils/validation.utility.js";

class PostMiddlewares{
    static async createPostMiddleWare (request, response, next){
        const {title, description, innerHTML} = request.body;
        if(!title || !description || !innerHTML){
             const map = {
               "title":title,
               "description":description,
               "innerHTML":innerHTML
             }
             const message = generateErrorMessage(map)
             return new CustomError(message, statusCodeUtility.BadRequest)
        }
        next()
    }


    static async updatePostMiddleWare (request, response, next){
        const {title, description, innerHTML} = request.body;
        const {id} = request.query;
        if(!id){
            return new CustomError("id is required", statusCodeUtility.BadRequest)
        }
        await isValidObjectId(id)

        if(!title || !description || !innerHTML){
             const map = {
               "title":title,
               "description":description,
               "innerHTML":innerHTML
             }
             const message = generateErrorMessage(map)
             return new CustomError(message, statusCodeUtility.BadRequest)
        }
        next()
    }

    static async getSinglePostMiddleWare (request, response, next){
        const {id} = request.query;
        await isValidObjectId(id)
        next()
    }

    static async deletePostMiddleWare (request, response, next){
        const {id} = request.query;
        console.log(id)
        if(!id){
            return new CustomError("id is required", statusCodeUtility.BadRequest)
        }
        await isValidObjectId(id)
        console.log("There")
        next()
    }
}






const generateErrorMessage = (dataMap) =>{
    const message = Object.entries(dataMap).filter(([key, value]) => value === false).map(([key, value]) => key).join(", ")
    return message
}


export default PostMiddlewares;