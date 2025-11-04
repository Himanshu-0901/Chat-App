import useGetConversation from "../../hooks/useGetConversation";
import useConversation from "../../zustand/useConversation";

const Conversation = ({conversat,lastIndex,emojis}) => {


	 const {selectedConversation,setSelectedConversation} = useConversation();
	 let isSelected = (selectedConversation?._id === conversat._id)
  
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
			    ${isSelected ? "bg-blue-500" : ""}`}
				onClick={()=>setSelectedConversation(conversat)}
			>
				<div className='avatar online'>
					<div className='w-12 rounded-full'>
						<img
							src={conversat.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversat.fullName}</p>
						<span className='text-xl'>{emojis}</span>
					</div>
				</div>
			</div>
       { !lastIndex && 
			<div className='divider my-0 py-0 h-1' />
	   }
		</>
	);
};
export default Conversation;