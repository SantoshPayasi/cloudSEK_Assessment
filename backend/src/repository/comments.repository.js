import commentsModel from "../models/comments.model.js"

class CommentRepository{
    static async create(data){
        const comment = await new commentsModel(data).save()
        return comment;
    }

    static async delete(filter){
        console.log(filter, "This is")
        const comment = await commentsModel.findOneAndDelete(filter)
        console.log("Comment is repo", comment)
        return comment;
    }


    static async update(filter, data){
        const comment = await commentsModel.findOneAndUpdate(filter, data, {new: true})
        return comment;
    }

    static async deleteMany(filter, options ={}){
        const deletedComments = await commentsModel.deleteMany(filter, options)
        return deletedComments;
    }
}




export default CommentRepository