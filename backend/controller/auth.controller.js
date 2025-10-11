import user from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateTokenAndCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, gender, password, confirmPassword } = req.body;

    if (password != confirmPassword) {
      return res.status(400).json({ error: "Password don't Match" });
    }
    const findUser = await user.findOne({ userName });

    if (findUser) {
      return res.status(400).json({ error: "UserName already exists." });
    }

    // Hash the password here
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // ProfilePic
    const BoyProfile = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const GirlProfile = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // Token Set
    generateTokenAndCookie(userName, res);

    const newUser = new user({
      fullName,
      userName,
      gender,
      password: hashPassword,
      profilePic: gender == "Male" ? BoyProfile : GirlProfile,
    });

    if (newUser) {
      await newUser.save();
      generateTokenAndCookie(newUser.id, res);
      return res.status(201).json({
        id: newUser.id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invalid User Data - Try Again" });
    }
  } catch (error) {
    console.log(`Error in signup controller - ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error." });
  }
};


export const login = async (req, res) => {
  try {
    let { userName, password } = req.body;

    const findUser = await user.findOne({ userName });
    const isPassword = await bcrypt.compare(password, findUser?.password || "");

    if (findUser && isPassword) {
      generateTokenAndCookie(findUser.id, res);
      return res.status(202).json({
        id: findUser.id,
        userName: findUser.userName,
        fullName: findUser.fullName,
        profielPic: findUser.profilePic,
      });
    } else {
      return res.status(400).json({ error: "Invalid userName or Password" });
    }
  } catch (error) {
    console.log(`Error in login Controller - ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
    try{
        res.cookie("AccessToken","",{
            maxAge:0
        })
        res.status(200).json({"message":"Logout Successfully"})
    }
    catch(error){
        console.log(`Error in Logout Controller ${error.message}`)
        res.status(500).json({ error: "Internal Server Error" });
    }
};
