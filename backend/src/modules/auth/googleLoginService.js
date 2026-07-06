import googleClient from "../../config/google.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/generateToken.js";
import User from "./auth.model.js";
import bcrypt from "bcrypt";

export const googleLoginService = async (idToken) => {
  // Verify Google Token
  const ticket = await googleClient.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub, email, email_verified, name, picture } = payload;

  if (!email_verified) {
    throw new Error("Google email is not verified");
  }

  // Find User
  let user = await User.findOne({
    email,
  }).select("+passwordHash");

  // New User
  if (!user) {
    user = await User.create({
  name,
  email,
  googleId: sub,
  avatarUrl: picture,
  emailVerified: true,
  authProviders: ["google"],
});
  }

  // Existing Local User
  else if (!user.authProviders.includes("google")) {
    user.authProviders.push("google");

    user.googleId = sub;

    user.emailVerified = true;

    if (!user.avatarUrl) {
      user.avatarUrl = picture;
    }
  }

  // Account Status Check
  if (user.status === "suspended") {
    throw new Error("Account is suspended");
  }

  if (user.status === "deleted") {
    throw new Error("Account not found");
  }

  // Generate Tokens
  const accessToken = await generateAccessToken(user);

  const { token: refreshToken, hashedRefreshToken } =
    await generateRefreshToken(user);

  // Save Refresh Token
  user.refreshTokenHashes.push(hashedRefreshToken);

  user.lastLoginAt = new Date();

  await user.save();

  return {
    accessToken,
    refreshToken,
    user,
  };
};
