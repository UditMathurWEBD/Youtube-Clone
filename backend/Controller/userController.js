import jwt from 'jsonwebtoken';
import User from '../Model/createUserModel.js';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import Video from "../Model/videoModel.js"


export async function getUserData(req,res){
  const {userId} = req.body;
      try{
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }  
        res.status(200).json({message : "User Found",data : user});
      }catch (err) {
    console.error("Error in getiing User Data:", err);
    res.status(500).json({ message: "Server error" });
  }
}


export async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Convert to plain JS object and remove password
    const userObj = newUser.toObject();
    delete userObj.password;

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '30m' });

    res.status(201).json({
      message: "User registered successfully",
      user: userObj,
      token,
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ message: "Server error" });
  }
}



export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Email is not registered. Please register." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is incorrect, please try again" });
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "30m" });

       // Convert to plain JS object and remove password
    const userObj = existingUser.toObject();
    delete userObj.password;


    res.status(200).json({
      message: "User Logged In successfully",
      user: userObj,
      token,
    });
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).json({ message: "Server error" });
  }
}


export async function createChannel(req, res) {
  const { userId, channelName, channelUsername } = req.body;

  try {
    const user = await User.findById(userId); // ✅ from body

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.channels.length > 0) {
      return res.status(400).json({ message: "Channel already created" });
    }

    const isDuplicate = user.channels.some(
      (ch) => ch.channelUsername === channelUsername
    );

    if (isDuplicate) {
      return res.status(400).json({ message: "Channel username already exists" });
    }

    user.channels.push({
      channelId : uuidv4(),
      channelName ,
      channelUsername : `@${channelUsername}`,
    })

    await user.save();

    res.status(201).json({
      message: "Channel Created Successfully",
      channel: user.channels[user.channels.length - 1],
    });
  } catch (err) {
    console.error("Error creating channel:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}



export function verifyJwtToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized. Token missing." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach decoded user info (like userId) to the request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Token Timeout, login again" });
  }
}

export async function getChannelData(req, res) {
  const { channelUsername } = req.params;

  try {
    // Find user that has a channel with this username
    const user = await User.findOne({ "channels.channelUsername": channelUsername });

    if (!user) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Find the specific channel object
    const channel = user.channels.find(
      (ch) => ch.channelUsername === channelUsername
    );

    if (!channel) {
      return res.status(404).json({ message: "Channel not found in user" });
    }

    // Fetch videos (assuming uploaderId stores user._id)
    const videos = await Video.find({ uploaderId: user._id });

    res.status(200).json({
      user: {
        username: user.username,
        avatarUrl: user.avatar,
        email: user.email,
      },
      channel,
      videos,
    });
  } catch (err) {
    console.error("Error in getChannelData:", err);
    res.status(500).json({ message: "Unable to get data" });
  }
}
