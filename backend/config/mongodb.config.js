import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB host is ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error during connect to mongoDb - ${error}`)
        process.exit(1)
    }
}

export default connectDB;