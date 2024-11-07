import mongoose, {Schema} from "mongoose"

const RegisterEventSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:Number
    },
    re_user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

export const RegisterEvent = mongoose.model("RegisterEvent",RegisterEventSchema)