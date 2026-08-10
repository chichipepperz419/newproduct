import jwt from "jsonwebtoken";
export function generateToken(userId, role) {
    return jwt.sign({
        userId,
        role,
    }, "i am a girl ,  maybe i am a boy", {
        expiresIn: "1hr",
    });
}
//# sourceMappingURL=token.js.map