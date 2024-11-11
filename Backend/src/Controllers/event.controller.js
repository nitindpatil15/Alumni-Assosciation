import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";
import { Event } from "../Models/Event.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const AddNewEvent = async (req, res) => {
  const {
    organizer,
    speaker_name,
    event_type,
    event_title,
    event_description,
    start_date,
    end_date,
  } = req.body;
  const image = req.file?.path;
  // Validation
  if (
    !image ||
    !organizer ||
    !speaker_name ||
    !event_type ||
    !event_title ||
    !event_description
  ) {
    throw new ApiError(400, "Please fill all required fields");
  }

  const uploadImage = await uploadOnCloudinary(image);
  if (!uploadImage) {
    return new ApiError(401, "Failed to upload Image");
  }
  try {
    const event = new Event({
      image: uploadImage.url,
      organizer,
      speaker_name,
      event_type,
      event_title,
      event_description,
      start_date,
      end_date,
      owner: req.user._id,
    });
    const newEvent = await event.save();
    if (!newEvent) {
      throw new ApiError(401, "Failed add event");
    }
    return res.status(200).json(new ApiResponce(200, newEvent, "Event added"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

export const GetAllEvent = async (req, res) => {
  try {
    const allevents = await Event.find();
    if (!allevents) {
      throw new ApiError(401, "No events found");
    }
    return res
      .status(200)
      .json(new ApiResponce(200, allevents, "Fetched all events"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

export const GetEventById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "Id is required");
  }
  try {
    const event = await Event.findById(id);
    if (!event) {
      throw new ApiError(401, "Event not found");
    }
    return res
      .status(200)
      .json(new ApiResponce(200, event, "Fetched event by"));
  } catch (error) {
    throw new ApiError(500, `Server Error:${error}`);
  }
};

export const UpdateEvent = async (req, res) => {
  const { id } = req.params;
  const { event_title, event_description, start_date, end_date } = req.body;
  const image = req.file?.path; // Get the uploaded file path if it exists

  if (!id) {
    throw new ApiError(402, "Id is required");
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  let uploadImage;
  if (image) {
    // Only attempt to upload if an image file is provided
    uploadImage = await uploadOnCloudinary(image);
    if (!uploadImage) {
      throw new ApiError(404, "Failed to upload image");
    }
  }

  // Check authorization
  if (
    event.owner.toString() === req.user._id.toString() ||
    req.user.role === "Admin"
  ) {
    try {
      const updateData = {
        event_title,
        event_description,
        start_date,
        end_date,
      };

      // Only update the image URL if a new image was uploaded
      if (uploadImage) {
        updateData.image = uploadImage.url;
      }

      const updateEvent = await Event.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );

      if (!updateEvent) {
        throw new ApiError(402, "Failed to update event");
      }

      return res
        .status(200)
        .json(new ApiResponce(200, updateEvent, "Event Updated"));
    } catch (error) {
      throw new ApiError(500, `Server Error: ${error.message}`);
    }
  } else {
    throw new ApiError(403, "You are not the owner of this event");
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(401, "Id is required");
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  console.log(
    req.user._id,
    event.owner,
    req.user._id.toString() === event.owner.toString()
  );
  if (
    event.owner.toString() === req.user._id.toString() ||
    req.user.role === "Admin"
  ) {
    try {
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
        throw new ApiError(401, "Failed to delete Event");
      }
      return res
        .status(200)
        .json(new ApiResponce(200, deletedEvent, "Event Deleted"));
    } catch (error) {
      throw new ApiError(500, `Server Error: ${error.message}`);
    }
  } else {
    throw new ApiError(403, "You are not the owner of this event");
  }
};
