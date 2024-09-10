import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const login = async (req,res,next)=>{
  try{
    const {name, password} = req.body;
    const userName = name.toLowerCase();
    const userFind = await User.findOne({name:userName}).select("name password");
    if(!userFind) return next(new Error("incorrect username or password"));
    const matchPassword = await bcrypt.compare(password, userFind.password);
    if(!matchPassword) return next(new Error("incorrect username or password"));

    const token = jwt.sign({_id:userFind._id}, process.env.JWT_SECRET,{expiresIn: "168hr"});

    res.status(200).cookie("token",token,{
      httpOnly: true,
      secure: true,
    }).json({
      success: true,
      message: "login successfully",
      user:{
        _id: userFind._id,
        name: userFind.name,
      }
    })
  }catch(err){
    next(err)
  }
}


const register = async (req,res, next)=>{
  const {name, password} = req.body;
  const userName = name.toLowerCase();
  const userFind = await User.findOne({name:userName});
  console.log(userFind)
  if(userFind) return next(new Error("user already exists"));
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const user = new User({
      name: userName,
      password:hashedPassword
    })
    console.log(user);
    user.save();
    
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn: "168hr"});
    
    res.status(201).cookie("token",token,{
      httpOnly: true,
      secure: true,
    }).json({
      success: true,
      message: "User Created",
      user
    })
  } catch (error) {
    next(error);
  }
}


const profile = (req,res)=>{
  res.send("User profile");
}

export {
  login,
  register,
  profile
}