import 'dotenv/config'
import { dbConnection } from './db-connection.js';
import express from 'express';
import authRouter from './routes/authrouter.js';
import profileRouter from './routes/profilerouter.js';
import cookieParser from 'cookie-parser';
import userrouter from './routes/userrouter.js';
import userinteraction from './routes/userinteraction.js';
import matchRouter from './routes/matchesrouter.js';
import cors from 'cors'
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001', // or wherever your frontend runs
  credentials: true,               // allow cookies to be sent
}));
app.use('/api/auth',authRouter);
app.use('/api/profile',profileRouter);
app.use('/api/user',userrouter);
app.use('/api/interaction',userinteraction);
app.use('/api/matches',matchRouter)
 dbConnection().then((res)=>app.listen(process.env.PORT,()=>console.log(`${res.sucess} server is up at @${process.env.PORT}`))).catch((err)=>console.log(err));
// app.listen(process.env.PORT,()=>console.log("Server is up"))
