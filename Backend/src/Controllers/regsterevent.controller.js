import { RegisterEvent } from "../Models/RegisterEvent.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/ApiResponse.js";

export const RegisterForEvents = async (req, res) => {
  const { eventId } = req.params;
  const { email, name, mobile } = req.body;

  console.log(email,mobile)
  if (!email || !mobile) {
    throw new ApiError(401, "Email or mobile number not found");
  }
  try {
    const register = await RegisterEvent.create({
      email,
      name: name || "",
      mobile,
      eventId,
      user: req.user._id,
    });

    // Save the registration data and update user record
    await register.save();
    req.user.event_registration = eventId;
    await req.user.save();

    return res
      .status(200)
      .json(new ApiResponce(200, register, "Registered successfully"));
  } catch (error) {
    console.log(error)
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
