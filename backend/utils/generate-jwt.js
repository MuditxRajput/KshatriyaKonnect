import jwt from 'jsonwebtoken';

export const generatejwt=(id,email)=>{
  try {
    const token =  jwt.sign({id,email},process.env.jwtkey,{expiresIn:"30d"});
  
    
    return {success : true,token};
  } catch (error) {
    return {success:false,error : error.message};
  }
}