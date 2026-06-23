
import { z} from 'zod';



export const validate = (schema) => async (req, res, next) => {
  

  const result = await schema.safeParseAsync(req.body);

  if(!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.format()
    })
  }


  next()
}

export const validateToken = (schema) => async (req, res, next) => {
  const token = req.cookies.refreshToken;

  const result = await schema.safeParseAsync(token);

  if(!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.format()
    })
  }


  return next();
}

