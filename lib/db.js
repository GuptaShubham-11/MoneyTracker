import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MongoDB URI is not defined in environment variables.");
        }
        if (mongoose.connection.readyState >= 1) {
            console.log("MongoDB is already connected.");
            return;
        }
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/MoneyTracker`
        );
        console.log(
            `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`,
        );
    } catch (error) {
        console.error("connectDB Error: ", error);
        process.exit(1);
    }
};

export { connectDB };
