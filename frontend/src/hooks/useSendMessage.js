import { useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation"


const useSendMessage = () => {
    let [loading,setLoading] = useState(false)
    let {messages,setMessages,selectedConversation} = useConversation();

    const sendMessage = async(message)=>{
        setLoading(true)
        try{
            let res = await fetch(`http://localhost:3000/api/messages/send/${selectedConversation._id}`,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({message}),
                credentials:"include"
            })
            let data = await res.json()
            
            if(data.error) throw new Error(data.error)
            messages ?  
            setMessages([...messages,data.newMessage])
            :
            setMessages([data.newMessage])
        }
        catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    return {loading,sendMessage}
}

export default useSendMessage