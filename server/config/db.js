import mongoose from 'mongoose';

const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected Succesfully")

    } catch (error) {
        console.error("Error Connecting MongoDB", error.message);
        process.exit();
    }
}

export default connectDB;