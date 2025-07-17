import jwt from'jsonwebtoken'
import { User } from "../database/user.model.js";

export const auth_middleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if(!token)
    {
      return res.status(401).json({ message: 'No token provided' });
    }
    const decode =  jwt.verify(token,process.env.jwtkey);
    const user = await User.findById(decode.id).select('_password');
    if(!user)  return res.status(403).json({ message: 'Unauthorized user' });
    req.user =user;
    next();
  } catch (error) {
      console.error("Auth error:", error.message);
      res.status(403).json({ message: 'Invalid or expired token' });
  }

  // You MUST call next() or the route won’t execute
};
