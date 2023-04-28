import mongoose from "mongoose";

export async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env["DB_URL"] as string);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
