import React from 'react'
import { useAuthContext } from '../context/authContext';
import toast from 'react-hot-toast';
import { useState } from 'react';
const useLogout = () => {
    let [loading,setloading] = useState(false);
    let {setAuthUser} = useAuthContext();
    const logout = async()=>{
        setloading(true);
    try{
        let res = await fetch('http://localhost:3000/api/auth/logout',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        
        let data = await res.json()
        if(data.error) throw new Error(data.error)


        localStorage.removeItem('chat-user')
        setAuthUser(null)
    }
    catch(error){
        toast.error(error.message)
    }
    finally{
        setloading = false
    }
}
return {loading,logout}
}

export default useLogout