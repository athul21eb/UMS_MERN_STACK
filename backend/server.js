
import express from 'express';
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRouter from './Routes/userRoutes.js';
import connectMongoDB from './config/mongo_db.js';
import cookieParser from 'cookie-parser';
import adminRouter from './Routes/adminRoutes.js';
dotenv.config();
const PORT = process.env.PORT;
connectMongoDB();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.get("/", (req, res) => {
    res.send("Server is ready");
})
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is  Running http://localhost:${PORT}`)
});