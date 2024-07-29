import jwt from "jsonwebtoken"


export const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers.authorization ||req.headers.Authorization
  if(!authHeader?.startsWith("Bearer ")){
    res.status(401);

    throw new Error(`Unauthorized`);
    
  } 

  const token = authHeader.split(" ")[1];

  jwt.verify(token,
    process.env.ACCESS_TOKEN_SECRET,
    (err,decoded) => {
        if(err){
          res.status(403)

          throw new Error(`Forbidden`);
          
        } 
       
        req.userId = decoded?.userInfo?.userId;
        next();

    }
  )



}