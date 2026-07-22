import jwt from 'jsonwebtoken' 
import User from "../models/User.js"


export const protectRoute = async (req, res, next) => {
  try {
    console.log("========== protectRoute ==========");
    console.log("Cookies:", req.cookies);

    const accessToken = req.cookies.accessToken;
    console.log("Access Token:", accessToken);

    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized - No Access Token Provided",
      });
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.userId).select("-password");
    console.log("User:", user);

    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in ProtectRoute Middleware:", error);
    res.status(401).json({
      message: "Unauthorized! Invalid Access Token",
    });
  }
};

export const adminRoute = (req,res,next) =>  {
if (req.user && req.user.role === 'admin') {
  next()
} else{
  return res.status(403).json({message: 'Access Denied! Admin Only!'})
}
}
