import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";

export const AddNewEvent = async (req, res) => {
  const {
    image,
    organizer,
    speaker_name,
    event_type,
    event_title,
    event_description,
    start_date,
    end_date,
  } = req.body;

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

  try {
    const event = new Event({
      image,
      organizer,
      speaker_name,
      event_type,
      event_title,
      event_description,
      start_date,
      end_date,
    });
    const newEvent = await event.save();
    if (!newEvent) {
      throw new ApiError(401, "Failed add event");
    }
    return res.status(200).json(new ApiResponce(200, newEvent, "Event added"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error}`);
  }
};

export const GetAllEvent = async (req, res) => {
  try {
    const allevents = await Event.find({});
    if (!allevents) {
      throw new ApiError(401, "No events found");
    }
    return res
      .status(200)
      .json(new ApiResponce(200, allevents, "Fetched all events"));
  } catch (error) {
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
  const { event_title, event_description, start_date, end_date, image } =
    req.body;

  if (!id) {
    throw new ApiError(402, "Id is required");
  }

  const event = await Event.findById(id);
  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (
    event.owner.toString() !== req.user._id.toString() ||
    req.user.role !== "Institution"
  ) {
    throw new ApiError(403, "You are not the owner of this event");
  }

  try {
    const updateEvent = await Event.findByIdAndUpdate(
      id,
      {
        $set: {
          event_title,
          event_description,
          start_date,
          end_date,
          image,
        },
      },
      { new: true }
    );
    if (!updateEvent) {
      throw new ApiError(402, "Failed to update");
    }
    return res
      .status(200)
      .json(new ApiResponce(200, updateEvent, "Event Updated"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error.message}`);
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

  if (
    event.owner.toString() !== req.user._id.toString() ||
    req.user.role !== "Institution"
  ) {
    throw new ApiError(403, "You are not the owner of this event");
  }

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
};

