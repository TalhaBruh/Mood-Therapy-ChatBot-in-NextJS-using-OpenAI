import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to the DB");
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to the Database");
    return true;
  } catch (error) {
    console.log("Error Connecting to DataBase", error);
    throw error;
  }
};

export default connectDB;
