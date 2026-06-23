import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export const generateAccessToken = async (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role
  }

  const token = await jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15m'});

  return token;
}



export const generateRefreshToken = async (user) => {
  
  const payload = {
    _id: user._id,
    role: user.role
  }

  const token = await jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'});

  const hashedToken = await bcrypt.hash(token, 10);


  return {token, hashedToken};
}