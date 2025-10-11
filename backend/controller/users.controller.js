import user from "../models/user.models.js"

export const getUsersForSideBar = async(req,res)=>{
    try{
        let loggedInId = req.user.id
        let allUsers = await user.find({_id:{$ne:loggedInId}}).select("-password");

        return res.status(200).json(allUsers)
    }
    catch(error){
        console.log(`Error user controller - ${error.message}`)
        res.status(500).json({error:"Internal Server Error"})
    }
}