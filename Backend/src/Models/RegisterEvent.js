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
    eventId:{
        type:Schema.Types.ObjectId,
        ref:"Event"
    },
    re_user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

export const RegisterEvent = mongoose.model("RegisterEvent",RegisterEventSchema)