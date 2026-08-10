import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
export function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new AppError("no token provided", 401);
        }
        const token = authHeader.split(" ")[1];
        console.log("this is token", token);
        const decodedToken = jwt.verify(token, "i am a girl ,  maybe i am a boy");
        req.user = decodedToken;
        next();
    }
    catch (error) {
        return res.status(500).json({
            message: "invalid Token",
            error,
        });
    }
}
;
//# sourceMappingURL=auth.middlewares.js.map