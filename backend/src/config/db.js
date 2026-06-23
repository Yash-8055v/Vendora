import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(`${URI}/vendora-db`);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("DB connection failed", error.message);
    process.exit(1);
  }
};


export default dbConnect;
