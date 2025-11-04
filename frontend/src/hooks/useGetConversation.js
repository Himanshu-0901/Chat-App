import { useState,useEffect } from "react"
import toast from "react-hot-toast"
const useGetConversation =  () => {
    let [loading,setloading] = useState(false)
    let [conversation,setConversation] = useState([])

    useEffect(()=>{
        const getConversation = async()=>{
            setloading(true)
            try{
          
                let res = await fetch('http://localhost:3000/api/users',{
                    credentials:"include"
                })
                let data = await res.json()
               
                if(data.error) throw new Error(data.error)
                
                setConversation(data)
              
                
                
            }
            catch(error){
                toast.error(error.message)
            }
            finally{
                setloading(false)
            }
        }
        getConversation();
    },[])
    
    return {loading,conversation}
}

export default useGetConversation