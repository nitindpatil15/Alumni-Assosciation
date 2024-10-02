import mongoose,{Schema} from "mongoose"

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobile:{
        type:Number,
        require:true
    },
    DOB:{
        type:Date
    },
    interest:[{
        type:String,
    }],
    branch:{
        type:String
    },
    batch:{
        type:String
    },
    prn:{
        type:Number
    },
    password:{
        type:String,
        required:true,
    },
    role:["Student","Alumni","Institution","Faculty"]
})

export const User = mongoose.model("User",userSchema)