import jwt from 'jsonwebtoken'
import 'dotenv/config'


const authUser = async (req, res, next) => {
    try {
        // Get the Authorization header
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ success: false, message: 'Not Authorized Login Again' });
        }

        // Extract token after "Bearer "
        const token = authHeader.split(" ")[1];

        // Verify token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attach userId to request body
        req.body.userId = token_decode.id;

        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authUser;
