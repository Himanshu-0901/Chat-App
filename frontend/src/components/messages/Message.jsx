import { useAuthContext } from "../../context/authContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  let fromMe = (message.senderId == authUser.id)

  

  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const chatclassName = fromMe ? 'chat-end' : 'chat-start'
  const bgColor = fromMe ? 'bg-slate-500' : 'bg-blue-500'
  const time = extractTime(message.createdAt)

  return (
    <div>
      <div className={`chat ${chatclassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilePic}
            />
          </div>
        </div>
        <div className={`chat-bubble text-white ${bgColor} pb-2`}>
          {message.message}
        </div>
        <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
          {time}
        </div>
      </div>
    </div>
  );
};

export default Message;
