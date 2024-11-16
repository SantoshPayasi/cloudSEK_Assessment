import postsModel from "../models/posts.model.js"

class PostsRepository{
    static async create(data){
       const newPost = await new postsModel(data).save()
       return newPost
    }

    static async find(filter={}, limit){
        const allPosts = await postsModel.find(filter).select("-__v").populate({
            path:"comments",
            options: {sort: {createdAt: -1}, limit},
            select: "-__v"
        })
        return allPosts
    }

    static async findOne(filter){
        const singlePost = await postsModel.findOne(filter).select("-__v").populate({
            path:"comments",
            options: {sort: {createdAt: -1}},
            select: "-__v"
        })
        return singlePost
    }

    static async findOneAndUpdate(filter, data){
        const newComment = await postsModel.findOneAndUpdate(filter, data, {new: true})
        return newComment
    }
}


export default PostsRepository