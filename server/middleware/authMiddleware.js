import jwt from 'jsonwebtoken';
import User from '../models/User';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if(!token)
            return res.status(401).json({ message: "No token provided" })

        const decoded = jwt.verify(
            token.replace("Bearer", ""),
            process.env.JWT_SECRET
        )

        req.user = await User.findById(decoded.id).select("-password")

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export default authMiddleware;