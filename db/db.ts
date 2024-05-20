import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to the DB");
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to the DB");
    return true;
  } catch (error) {
    console.log("this is an error", error);
    throw error;
  }
};

export default connectDB;
