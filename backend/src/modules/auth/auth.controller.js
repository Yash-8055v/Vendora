import { generateOTP } from "../../utils/generateOtp.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { verifyEmailTemplate } from "../../templates/verifyEmailTemplate.js";
import bcrypt from "bcrypt";
import {
  forgotPasswordService,
  loginService,
  logOutService,
  refreshService,
  registerUser,
  resetPasswordService,
} from "./auth.service.js";
import User from "./auth.model.js";
import { forgotPasswordValidation } from "./auth.validation.js";
import { setRefreshTokenCookie } from "../../utils/setRefreshTokenCookie.js";

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await registerUser(name, email, password);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    if (error.message === "Email already registered") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { accessToken, refreshToken, user } = await loginService(
      email,
      password,
    );

    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Use login successfully",
      token: accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLoginAT: user.lastLoginAt,
      },
    });
  } catch (error) {
    if (
      error.message === "Invalid email" ||
      error.message === "Invalid password"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (error.message === "Account is suspended") {
      return res.status(401).json({
        success: false,
        message: "Account suspended. Please contact support.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    const newAccessToken = await refreshService(refreshToken);

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    if (error.message === "Invalid refresh token") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logOutController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    await logOutService(refreshToken);

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  } catch (error) {
    if (error.message === "Invalid refresh token") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentUserController = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      status: user.status,
    },
  });
};

export const sendVerificationOtpController = async (req, res) => {
  const user = req.user;

  try {
    const isAlreadyVerified = user.emailVerified;

    if (isAlreadyVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified",
      });
    }

    const { otp, hashedOtp } = await generateOTP();

    user.emailOtpHash = hashedOtp;
    user.emailOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    const to = user.email;
    const subject = "Verify Your Email Address • Vendora";
    const html = verifyEmailTemplate(otp);

    const info = await sendEmail(to, subject, html);

    if (!info) {
      return res.status(500).json({
        success: false,
        message: "Error while sending mail",
      });
    }

    return res.status(200).json({
      success: true,
      message: "email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmailController = async (req, res) => {
  const { otp } = req.body;
  

  try {
    const user = await User.findById(req.user._id).select('+emailOtpHash');

    if (user.emailVerified === true) {
      return res.status(409).json({
        success: false,
        message: "email is already verified",
      });
    }

    if(!user.emailOtpHash || !user.emailOtpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "no OTP generated",
      });
    }

    if (Date.now() > user.emailOtpExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }


    const isMatch = await bcrypt.compare(otp, user.emailOtpHash);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "incorrect OTP",
      });
    }

    user.emailVerified = true;

    user.emailOtpHash = null;

    user.emailOtpExpiresAt = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verification successful"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const forgotPasswordController = async (req, res) => {
  try {
    const {email} = req.body;
    const info = await forgotPasswordService(email);

    return res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const verifyResetPasswordOtpController = async (req, res) => {
  try {
    const {email, otp} = req.body;
    await verifyResetPasswordOtpService(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  
  } catch(error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const resetPasswordController = async (req, res) => {
  try {
    const {email, otp, newPassword} = req.body;
    await resetPasswordService(email, otp, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. Please login again.",
      
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
      
    });
  }
}