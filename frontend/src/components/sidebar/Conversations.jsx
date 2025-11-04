
import useGetConversation from '../../hooks/useGetConversation.js'
import { randomEmojis } from '../../utils/emojis.js';
import Conversation from './Conversation.jsx';
const Conversations = () => {

  
    let {loading,conversation} = useGetConversation();
  console.log(conversation)
  return (
    <div className='py-2 flex flex-col overflow-auto'>

    
       {conversation.map((conversat,idx)=>(
  
            <Conversation
            key = {conversat._id}
            conversat={conversat}
            lastIndex = {idx==conversation.length-1}
            emojis = {randomEmojis()}
            />
          
       )
      )
       }
      
    

    {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    
    </div>
  )
}

export default Conversations