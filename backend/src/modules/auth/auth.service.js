import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";
import User from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    passwordHash: hashedPassword,
  });

  return newUser;
};

export const loginService = async (email, password) => {
  const user = await User.findOne({ email }).select("+passwordHash");

  if (!user) {
    throw new Error("Invalid email");
  }

  if (user.status === "suspended") {
    throw new Error("Account is suspended");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  const accessToken = await generateAccessToken(user);

  const { token: refreshToken, hashedRefreshToken } =
    await generateRefreshToken(user);

  await User.findOneAndUpdate(
    { email },
    {
      $push: { refreshTokenHashes: hashedRefreshToken },
      lastLoginAt: Date.now(),
    },
  );

  return { accessToken, refreshToken, user };
};

export const refreshService = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded._id);

    if (!user) {
      throw new Error("Invalid refresh token");
    }

    let isRefreshTokenPresent = false;

    for (const hash of user.refreshTokenHashes) {
      const isMatch = await bcrypt.compare(token, hash);

      if (isMatch) {
        isRefreshTokenPresent = true;
        break;
      }
    }

    if (!isRefreshTokenPresent) {
      throw new Error("Refresh token expired");
    }


    const newAccessToken = await generateAccessToken(user);

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};


export const logOutService = async (token) => {
  try {
    const decoded = await jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded._id);


    if (!user) {
      throw new Error("Invalid refresh token");
    }

    let isRefreshTokenPresent = false;

    for (const hash of user.refreshTokenHashes) {
      const isMatch = await bcrypt.compare(token, hash);
      if(isMatch) {
        isRefreshTokenPresent = true;
        const idx = user.refreshTokenHashes.indexOf(hash);
        user.refreshTokenHashes.splice(idx, 1);
        break;
      }
    }

    if (!isRefreshTokenPresent) {
      throw new Error("Invalid refresh token");
    }

    await user.save();

    return;

  } catch (error) {
    throw error
  }
}


export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);

    return user;

  } catch (error) {
    throw error;
  }
}