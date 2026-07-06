import { setRefreshTokenCookie } from "../../utils/setRefreshTokenCookie.js";
import { googleLoginService } from "./googleLoginService.js";


export const googleLoginController = async (req, res) => {
  const { idToken } = req.body;

  try {
    const { accessToken, refreshToken, user } =
      await googleLoginService(idToken);


    setRefreshTokenCookie(res, refreshToken);

    return res.status(200).json({
      success: true,
      message: "Google login successful",
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
      error.message === "Google email is not verified" ||
      error.message === "Invalid Google token"
    ) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Account is suspended") {
      return res.status(403).json({
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