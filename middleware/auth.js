import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorised user",
    });
  }

  try {
    const decode_token = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decode_token.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export default authMiddleware;
