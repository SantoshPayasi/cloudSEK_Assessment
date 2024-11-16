import statusCodeUtility from "./statuscode.utility.js"


const ResponseHandler = (statusCode=statusCodeUtility.Success, message = "Request Completed Successfully", data=null, response)=>{
    return response.status(statusCode).send({
        message,
        data
    });
}


export default ResponseHandler