
import { generateOTP } from "../../utils/generateOtp.js";
import {
  loginService,
  logOutService,
  refreshService,
  registerUser,
} from "./auth.service.js";

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

    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });

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


export const sendVerificationOtpController = async(req, res) => {
  const user = req.user;

  try {
    const isAlreadyVerified = user.emailVerified;

    if(isAlreadyVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified"
      })
    }

    const {otp, hashedOtp} = generateOTP();


    user.emailOtpHash = otp;
    user.emailOtpExpiresAt = Date.now() + 600000;

    await user.save();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


