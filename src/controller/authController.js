import { getUser } from "../services/userService.js";
import * as generateToken from "../utils/jwtUtils.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await getUser(email);

    console.log("------", user)
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not exist, register first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    let payload = {
      id: user._id,
      name: user.firstName + " " + user.lastName,
      email: user.email,
      role: user.role,
    };
    console.log(payload)
    const token = await generateToken.generateToken(payload);
console.log(token)
    res.status(200).json({
      message: "User login successfully",
      user: {
        name: user.firstName + " " + user.lastName,
        email: user.email,
        role: user.role
      },
      token,
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
