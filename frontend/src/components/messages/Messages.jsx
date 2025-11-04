import { useEffect, useRef } from "react";
import useGetMessage from "../../hooks/useGetMessage";
import Message from "./Message";

const Messages = () => {
	const {loading,messages} = useGetMessage();
	console.log(messages)
	const lastMessageRef = useRef()

	useEffect(()=>{
		setTimeout(()=>{
			lastMessageRef.current?.scrollIntoView({behavior:'smooth'})
		},100)
	},[messages])
	return (
		<div className='px-4 flex-1 overflow-auto'>
	 
		    {loading ? <span className='loading loading-spinner mx-auto'></span> : null}

			{!loading && !messages &&
			<p className='text-center'>Send a message to start conversation</p>}

			{!loading && messages && 
			
			messages.map((message)=>(
				<div
				key = {message._id}
				ref = {lastMessageRef}
				>
			<Message 
			message = {message}
		    />
			</div>
		))
		}
		</div>
	);
};
export default Messages;