import mongoose from "mongoose";

const connectDB = async () => {
    try {
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

export default connectDB;
