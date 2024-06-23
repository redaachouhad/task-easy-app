import mongoose from "mongoose";

export async function connectMongodb() {
  await mongoose.connect(process.env.MONGODB_URL as string);
  console.log("MongoDb Connected");
}
