import mongoose from "mongoose";



const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
}, { timestamps: true });


export default mongoose.model('Comment', commentSchema);