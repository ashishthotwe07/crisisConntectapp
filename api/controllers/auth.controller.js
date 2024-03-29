import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

class AuthController {
  async signUp(req, res) {
    try {
      const { email, password, confirm_password, username } = req.body;

      if (password !== confirm_password) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
        username,
      });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error in sign up:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("token", token, { httpOnly: true });

      res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
      console.error("Error in sign in:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async signOut(req, res) {
    try {
      res.clearCookie("token");

      res.status(200).json({ message: "Sign-out successful" });
    } catch (error) {
      console.error("Error in sign out:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const updates = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      Object.keys(updates).forEach((key) => {
        if (key !== "password") {
          user[key] = updates[key];
        }
      });

      if (updates.password) {
        const hashedPassword = await bcrypt.hash(updates.password, 10);
        user.password = hashedPassword;
      }

      await user.save();

      res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
      console.error("Error in update user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      console.error("Error in delete user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default AuthController;
