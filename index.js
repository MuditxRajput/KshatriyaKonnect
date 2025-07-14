import 'dotenv/config'
import { dbConnection } from './db-connection.js';
import express from 'express';
const app = express();
 dbConnection().then((res)=>app.listen(process.env.PORT,()=>console.log(`${res.sucess} server is up at @${process.env.PORT}`))).catch((err)=>console.log(err));
// app.listen(process.env.PORT,()=>console.log("Server is up"))
