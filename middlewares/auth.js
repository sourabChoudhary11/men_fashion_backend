import jwt from "jsonwebtoken";

const authentication = (req,res,next)=>{
  try{
    const authHeader = req.headers.authorization;
    if(!authHeader) return next(new Error("please provide token"))
    const token = authHeader.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
      if(err) return next(new Error("invalid token"));
      req.user = user;
    })
  } catch(err){
    next(err);
  }
  next();
}

const authVerification = (req,res,next)=>{
  try{
    const token = req.cookies.token;
    if(!token) return next(new Error("please provide token"))
    jwt.verify(token, process.env.JWT_SECRET, (error,user)=>{
      if(error) return next(new Error("invalid token")); 
      res.json({
        success:true,
        user
      })
    })
  } catch(err){
    next(err)
  }
}

export {
  authentication,
  authVerification
}