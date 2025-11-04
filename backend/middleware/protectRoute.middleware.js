import jwt from 'jsonwebtoken';
import user from '../models/user.models.js';


export const protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.AccessToken;
        
     
        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided."})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid Token"})
        }
       
        const findUser = await user.findById(decoded.userId).select("-password")
        if(!findUser){
            return res.status(404).json({error:"User Not Found"})
        }

        req.user = findUser
        next();
    }
    catch(error){
        console.log(`Error in protectRoute Middleware - ${error.message}`)
        res.status(501).json({error:"Internal server error"})
    }
};