import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected");
    } catch (err) {
        console.error('Failed to connect to MongoDB', err.message);
        process.exit(1);
    }
};

export default connectDB;
