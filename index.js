import 'dotenv/config'
import { dbConnection } from './db-connection.js';
import express from 'express';
import authRouter from './routes/authrouter.js';
import profileRouter from './routes/profilerouter.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/profile',profileRouter)
 dbConnection().then((res)=>app.listen(process.env.PORT,()=>console.log(`${res.sucess} server is up at @${process.env.PORT}`))).catch((err)=>console.log(err));
// app.listen(process.env.PORT,()=>console.log("Server is up"))
