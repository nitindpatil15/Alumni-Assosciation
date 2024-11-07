import { Post } from "../Models/Post.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postImage = req.file?.path;
    const { title, content } = req.body;
    if (!title || !content) {
      throw new ApiError(401, "All Fields are required");
    }
    if (!userId) {
      throw new ApiError(401, "Uauthoorized User");
    }
    const image = await uploadOnCloudinary(postImage);
    const newPost = await Post.create({
      title,
      content,
      mediaurl: image?.url || "",
      user: userId,
    });
    await newPost.save();

    if (!newPost) {
      throw new ApiError(401, "Failed to create post");
    }

    return res
      .status(200)
      .json(new ApiResponce(200, newPost, "Post Created Successfully"));
  } catch (error) {
    throw new ApiError(500, `Server Error : ${error}`);
  }
};

export const allPosts = async (req, res) => {
  try {
    const AllPosts = await Post.find({});
    if (!AllPosts) {
      throw new ApiError(401, "No Posts Found");
    }

    return res
      .status(200)
      .json(new ApiResponce(200, AllPosts, "AllPost Fetched Successfully"));
  } catch (error) {
    throw new ApiError(500, `Server Error : ${error}`);
  }
};

export const deletePost = async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(401, "Post Id is required");
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiError(402, "Post not found, please try again");
    }

    // Compare the IDs properly
    if (post.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to delete this post");
    }

    // Delete the post
    await Post.findByIdAndDelete(postId);
    return res
      .status(200)
      .json(new ApiResponce(200, {}, "Post Deleted Successfully"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

export const UpdatePost = async (req, res) => {
  const { postId } = req.params;
  const {title,content}=req.body
  if (!postId) {
    throw new ApiError(401, "Post Id is required");
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      throw new ApiError(402, "Post not found, please try again");
    }

    // Compare the IDs properly
    if (post.user.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to delete this post");
    }

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title,
          content,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json(new ApiResponce(200, {updatedPost}, "Post Deleted Successfully"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

export const userPost = async(req,res)=>{
    const userId = req.user._id
    if(!userId){
        throw new ApiError(401, "Unauthorized User!!")
    }

    try {
        const userposts = await Post.find({user:userId})
        if(!userposts){
            throw new ApiError("User Haven't Posted yet")
        }
        return res.status(200).json(new ApiResponce(200, {userposts}, "Fetched user Posts"))
    } catch (error) {
        throw new ApiError(500 , `Server Error :${error}`)
    }
}