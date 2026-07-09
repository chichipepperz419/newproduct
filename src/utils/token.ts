import jwt from "jsonwebtoken";

export function generateToken(userId: any, role: any) {
  return jwt.sign(
    {
      userId,
      role,
    },
    "i am a girl ,  maybe i am a boy",
    {
      expiresIn: "1hr",
    },
  );
}

