import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useState,useEffect } from "react";

const useGetMessage = ()=>{
    const [loading,setLoading] = useState(false)
    let {messages,setMessages,selectedConversation} = useConversation()
    useEffect(()=>{
    const getMessage = async()=>{
    try{
        setLoading(true)
        let res = await fetch(`http://localhost:3000/api/messages/${selectedConversation._id}`,{
            credentials:'include'
        }
        );
        let data = await res.json();
        if(data.error) throw new Error(data.error)
        setMessages(data.message)
    }
    catch(error){
        toast.error(error.message)
    }
    finally{
        setLoading(false)
    }
    }

    if(selectedConversation._id) getMessage()
},[selectedConversation._id,setMessages])

return {loading,messages}
}

export default useGetMessage;