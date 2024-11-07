import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  company_location: {
    type: String,
    required: true,
  },
  job_location: {
    type: String,
    required: true,
  },
  company_email: {
    type: String,
    required: true,
  },
  job_type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Array of requirements/skills
  requirements: [{
    type: String, 
  }],
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assume User model exists
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  salary:{
    type:Number
  },
  company_size:{
    type:Number,
    required:true
  },
  link:{
    type:String
  }
},{timestamps:true});

export const Job = mongoose.model('Job', jobSchema);