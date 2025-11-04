import jwt from 'jsonwebtoken';

export const generateTokenAndCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{
        expiresIn:"2h"
    })
    console.log(token)
    res.cookie("AccessToken",token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,    // MS    
        httpOnly:true,                       // Prevents XSS attacks cross site scripting attacks
        sameSite:"strict",                    // CSRF attacks cross-site request forgery attack
        secure:process.env.Node_ENV !=="development"
    }) 

}

 