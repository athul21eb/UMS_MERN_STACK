import jwt from "jsonwebtoken";

////AccessToken
export const generateAccessToken = ( user) => {



   const accessToken = jwt.sign(

    {
        "userInfo":{
            "username":user.name,
                "email":user.email,
                'userId':user._id  ,
                "isAdmin":user.isAdmin,
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn :process.env.ACCESS_TOKEN_EXPIRED_IN}
   )

   return accessToken;
}


////RefreshToken

export const generateRefreshToken = (res,user) =>{
    const refreshToken = jwt.sign(
        {
            "email":user.email,
            'userId':user._id ,
            "isAdmin":user.isAdmin,
        },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn :process.env.REFRESH_TOKEN_EXPIRED_IN}

       )

       res.cookie("jwt",refreshToken,{
        httpOnly:true,
        maxAge:24*60*60*1000,

        sameSite:"strict",
       })
}

