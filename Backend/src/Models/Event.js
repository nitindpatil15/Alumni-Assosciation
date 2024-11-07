import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    image:{
        type:String,
        required:true
    },
    organizer:{
        type:String,
        required:true
    },
    speaker_name:{
        type:String,
        required:true
    },
    event_type:["Online","InPerson"],
    event_title:{
        type:String,
        required:true
    },
    event_description:{
        type:String,
        required:true
    },
    start_date:{
        type:Date,
    },
    end_date:{
        type:Date
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Event = mongoose.model("Event",eventSchema)