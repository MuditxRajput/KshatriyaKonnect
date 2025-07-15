import 'dotenv/config'
import { dbConnection } from './db-connection.js';
import express from 'express';
import authRouter from './routes/authrouter.js';
const app = express();
app.use(express.json());
app.use('/api/auth',authRouter);
 dbConnection().then((res)=>app.listen(process.env.PORT,()=>console.log(`${res.sucess} server is up at @${process.env.PORT}`))).catch((err)=>console.log(err));
// app.listen(process.env.PORT,()=>console.log("Server is up"))
