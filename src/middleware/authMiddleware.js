import User from "../models/userModel.js";
import { verifyToken } from "../utils/jwtUtils.js";
export const auth = async (req, res, next) => {
  try {
    
    const authHeader = req.headers.authorization;
      console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "unauthorized" });
    }

    // "Bearer token"
    const token = authHeader.split(" ")[1];
     console.log(token)
     if(!token){
     return res.status(401).json({ message: "unauthorized" });
     }
    const decode = await verifyToken(token);
    if(!decode){
        return res.status(401).json({ message: "unauthorized" }); 
    }
        console.log("sdfghjk" ,decode.email)
   console.log(decode.email)
    const user = await User.findOne({ email: decode.email });
    //check user exists
    // console.log("sdfghjk" ,user)

    if (!user) {
      return res.status(401).json({ message: "unauthorized, user not found" });
    }

    req.userId = user._id;
    req.email = user.email;
    req.role = user.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizeRole = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!req.role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.role)) {
      return res.status(401).json({ message: "Access denied" });
    }

    next();
  };
};
