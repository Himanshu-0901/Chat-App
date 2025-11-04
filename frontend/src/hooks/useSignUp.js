import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext'

const useSignUp = () => {

    const [loading,setloading] = useState(false)

    const {authUser,setAuthUser} = useAuthContext();

    const signup = async({fullName,username,password,confirmPassword,gender})=>{
        const success = handleInputErrors({fullName,username,password,
            confirmPassword,gender})

        if(!success) return;
        // setloading(true);
       
        try{
            let res = await fetch('http://localhost:3000/api/auth/signup',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName,userName:username,password,confirmPassword,gender}),
                credentials:"include"
            })
    
            let data = await res.json()
            if(data.error) throw new Error(data.error)


            // localstorage setup
            localStorage.setItem('chat-user',JSON.stringify(data))

            //context
            setAuthUser(data)
        }
        catch(error){
            console.log(error)
            toast.error(error.message,error);
        }
        finally{
            setloading(true);
        }

    }
    return {signup}
}
function handleInputErrors({fullName,username,password,confirmPassword,gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error('Please fill in all fields')
        return false
    }
    if(password != confirmPassword){
        toast.error('Confirm Password does not match')
        return false
    }
    if(password.length < 6){
        toast.error('Password must be at least 6 characters')
        return false
    }
    return true
}
export default useSignUp;