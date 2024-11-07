import { Job } from "../Models/JobPost.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";

// Create new job posting
export const NewJob = async (req, res) => {
  const {
    title,
    company,
    company_location,
    job_location,
    company_email,
    job_type,
    salary,
    description,
    requirements,
    applicationDeadline,
    company_size,
    link,
  } = req.body;
  if (
    !title ||
    !company ||
    !company_location ||
    !company_email ||
    !job_location ||
    !job_type ||
    !description ||
    !requirements ||
    !company_size ||
    !applicationDeadline
  ) {
    throw new ApiError(400, "Please fill in all fields");
  }
  try {
    const job = new Job({
      title,
      company,
      company_location,
      job_location,
      job_type,
      salary,
      description,
      requirements,
      postedBy: req.user._id, // Assuming req.user is populated by auth middleware
      applicationDeadline,
      company_size,
      link: link || "",
    });

    const createdJob = await job.save();
    return res
      .status(200)
      .json(new ApiResponce(200, createdJob, "Created Job Post"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

// Get All Jobs/Internship
export const GetAllJobs = async (req, res) => {
  try {
    const AllJobs = await Job.find();
    if (!AllJobs) {
      throw new ApiError(401, "Something went Wrong!!! Try Again");
    }
    return res
      .status(200)
      .json(new ApiResponce(200, AllJobs, "Fetched All Jobs Successfully"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

// Get particular selected Job
export const GetJobById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(402, "Id is Required");
  }
  try {
    const job = await Job.findById(id);
    if (!job) {
      throw new ApiError(403, "Job Not Found");
    }
    return res.status(200).json(new ApiResponce(200, job, "Fetched Job"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

// Update job by Selecting
export const UpdateJob = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(402, "Id is Required");
  }

  const jobpost = await Job.findById(id);
  if (!jobpost) {
    throw new ApiError(402, "Job Not Found");
  }

  if (
    jobpost.postedBy.toString() !== req.user._id.toString() ||
    req.user.role !== "Institution"
  ) {
    throw new ApiError(403, "Access Denied");
  }

  try {
    const updateJob = await Job.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          job_type,
          salary,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponce(200, updateJob, "Job Updated!!"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

// Delete Job as per Require
export const DeleteJob = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(402, "Id is Required");
  }
  const jobpost = await Job.findById(id);
  if (!jobpost) {
    throw new ApiError(402, "Job Not Found");
  }

  if (
    jobpost.postedBy.toString() !== req.user._id.toString() ||
    req.user.role !== "Institution"
  ) {
    throw new ApiError(403, "Access Denied");
  }

  try {
    const deleteJob = await Job.findByIdAndDelete(id);
    return res.status(200).json(new ApiResponce(200, deleteJob, "Job Deleted"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

export const SaveJobPost = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "Select  the Post Correctly");
  }

  try {
    const savePost = await Job.findById(id);
    if (!savePost) {
      throw new ApiError(402, "Post not Found");
    }

    return res
      .status(200)
      .json(new ApiResponce(200, savePost, "Post Saved Successfully"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error.message}`);
  }
};

export const GetSavePost = async(req,res)=>{
  try {
    const SavedPosts = await Job.find()
    if(!SavedPosts){
      throw new ApiError(401,"Not saved any Post")
    }
    return res.status(200).json(new ApiResponce(200,SavedPosts,"Fetched Saved Posts"))
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error.message}`);
  }
}
