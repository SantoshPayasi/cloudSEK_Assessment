import mongoose, { mongo } from "mongoose";



const postSchmea = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },

    comments :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // }
}, { timestamps: true }) 

export default mongoose.model("Posts", postSchmea)