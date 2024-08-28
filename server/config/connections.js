import mongoose from 'mongoose';

const uri = process.env.ATLAS_URI || '';

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            },
        });
        console.log('MongoDB connection established');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;