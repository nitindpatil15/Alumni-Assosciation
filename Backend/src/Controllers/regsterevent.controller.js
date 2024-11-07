import { RegisterEvent } from "../Models/RegisterEvent";
import { ApiError } from "../utils/ApiError";
import { ApiResponce } from "../utils/ApiResponse";

export const RegisterForEvents = async (req, res) => {
  const { eventId } = req.params;
  const { email, name, mobile } = req.body;
  if (!email || !name) {
    throw new ApiError(401, "Email or name not found");
  }
  try {
    const register = await RegisterEvent.create({
      email,
      fullName,
      mobile: mobile || null,
      eventId,
      re_user: req.user._id,
    });
    register.save();

    const user = req.user;
    user.event_registration = eventId;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponce(200, register, "Registered successfully"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error?.message}`);
  }
};

export const GetAllRegisteredUserOfEvent = async (req, res) => {
  const { eventId } = req.params;
  if (!eventId) {
    throw new ApiError(401, "Event not Found");
  }

  try {
    const AllRegistration = await User.find({ event_registration: eventId });
    if (!AllRegistration) {
      throw new ApiError(402, "No Regitartion Founded");
    }

    return res
      .status(200)
      .json(new ApiResponce(200, AllRegistration, "All User Fetched"));
  } catch (error) {
    throw new ApiError(500, `Server Error: ${error.message}`);
  }
};
