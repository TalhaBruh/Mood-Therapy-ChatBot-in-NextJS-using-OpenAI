import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to the DB");
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connection Successful: [Connected to the Database]");
    return true;
  } catch (error) {
    console.log("Error 404:{ While Connecting to Database }", error);
    throw error;
  }
};

export default connectDB;
