import mongoose from "mongoose";

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
  },
  session: {
    type: Number,
  },
  gptResponse: {
    type: String,
  },
});

export default mongoose.models.User || mongoose.model("User", User);
