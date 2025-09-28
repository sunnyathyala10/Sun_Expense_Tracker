import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("DB Connected Successfully.");
  } catch (e) {
    console.error("Error connecting DB ", e);
  }
};

export default connectDB;
