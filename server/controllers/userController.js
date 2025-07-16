import userModel from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ sucess: false, message: "Missing Details" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ sucess: true, token, user: { _id: user._id, name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ sucess: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        sucess: true,
        token,
        user: { _id: user._id, name: user.name },
      });
    } else {
      return res.json({ sucess: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    res.json({
      sucess: true,
      credits: user.creditBalance,
      user: { _id: user._id, name: user.name },
    });
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};
