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

const GetCookie = (req,res,next)=>{
  console.log(req.cookies)
  try{
    console.log("authToken", req.cookies.authToken);
    const token = req.cookies.token;
    console.log("cookietoken", token)
    if(!token) return next(new Error("cookie not found"))
    jwt.verify(token, process.env.JWT_SECRET, (error,user)=>{
      if(error) return next(new Error("invalid token")); 
      res.json({
        success:true,
        cookie:user
      })
    })
  } catch(err){
    next(err)
  }
}

export {
  authentication,
  GetCookie
}