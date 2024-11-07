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
    mediaurl:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[{
        type:Schema.Types.ObjectId,
        ref:"Comment",
        default:0
    }]
},{timestamps:true})

export const Post = mongoose.model("Post",postSchema)