import mongoose from "mongoose";



const commentSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true,
        trim:true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    commentText:{
        type:String,
        required:true,
        trim:true
    }
}, { timestamps: true });


commentSchema.index({ postId: 1 });

export default mongoose.model('Comment', commentSchema);