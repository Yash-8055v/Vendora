import jwt from "jsonwebtoken";
import { getUserById } from "../modules/auth/auth.service.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token missing or malformed.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await getUserById(decoded._id);

    if(!user) {
      return res.status(401).json({success: false, message: "Invalid or expired token." });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({success: false, message: "Invalid or expired token." });
  }
};


export const authorize = (allowedRoles) => (req, res, next) => {
  if(allowedRoles.includes(req.user.role)) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "You are unauthorized to access this route"
  })
}

