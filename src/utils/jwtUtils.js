import jwt from "jsonwebtoken";

const JWT_SECRET = "doctorapplication";

export const generateToken = async (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d", algorithm: "HS256" });
};

export const verifyToken = async (token) => {
  return jwt.verify(token, JWT_SECRET);
};
