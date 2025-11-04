import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.config.js';
import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/users.route.js';
import cors from 'cors';

const app = express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// app.get('/',(req,res)=>{
//     res.send("Hello")
// })

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes)

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})