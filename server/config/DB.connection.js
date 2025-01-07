import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('\x1b[32m✓ MongoDB connected...\x1b[0m'); // Green tick
    } catch (err) {
        console.error('\x1b[31m✗ MongoDB connection failed:\x1b[0m', err.message); // Red cross
        process.exit(1);
    }
};

export default connectDB;
