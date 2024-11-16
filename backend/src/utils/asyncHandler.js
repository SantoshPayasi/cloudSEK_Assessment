const asyncHandler = (func) => async(request, response, next) =>{
    try {   
        await func(request, response, next)
        } catch (error) {
            console.log(error)
            next(error)
        }
}



export default asyncHandler