import 'dotenv/config';


import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import summaryRoutes from './routes/summaryRoutes.js'
import cookieParser from 'cookie-parser';



connectDB();

const app = express();

app.use(cors(
    {
        origin: "http://localhost:3000",
    credentials: true
    }
));
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/summary', summaryRoutes);




app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`)
})