import mongoose from "mongoose";

async function connectDb() {
  try {
     await mongoose.connect(process.env.MONGO_URI, {
      dbName: "mern-blog",
    });
    console.log("Db connected successfully ✅ ");
  } catch (error) {
    console.log("Database connection failed : ❌ ", error);
    process.exit(1);
  }
}

export default connectDb;
