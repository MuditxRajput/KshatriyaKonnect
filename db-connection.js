import mongoose from "mongoose";
export const dbConnection = async()=>{
  try {
    
    const connection = await mongoose.connect(process.env.DB_URL);
    if(!connection)
    {
        throw new Error("Database connection is failed");
    }
    return {sucess:true,connection};
  } catch (error) {
    throw error;
  }
}