import mongoose, {Schema} from "mongoose"

const postSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    likes:{
        type:Number
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment"
    }],
    joblink:{
        type:String
    }
},{timestamps:true})

export const Post = mongoose.model("Post",postSchema)