import mongoose from "mongoose";
import { CustomError } from "./errorHandler.utility.js";
import statusCodeUtility from "./statuscode.utility.js";


export const isValidObjectId = (id) =>{
   if(!id){
    return new CustomError("Id is not found validation failed", statusCodeUtility.BadRequest)
   }
   if(!mongoose.Types.ObjectId.isValid(id)){
    return new CustomError("Id is not valid", statusCodeUtility.BadRequest)
   }
   return ;
}