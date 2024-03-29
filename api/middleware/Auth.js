import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract the token from the 'Bearer' authorization header
    const tokenParts = token.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid authorization header format" });
    }
    const jwtToken = tokenParts[1];

    // Verify token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user object to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in verify token middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default verifyToken;
