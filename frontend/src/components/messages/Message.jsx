import React from 'react'

const Message = () => {
  return (

<div>
<div className="chat chat-end">
<div className='chat-image avatar'>
    <div className='w-10 rounded-full'>
        <img alt='Tailwind CSS chat bubble component'  
        src='https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg'/>
    </div>
</div>
<div className="chat-bubble text-white bg-slate-500 pb-2">Hello I am </div>
<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
</div>
</div>
  )
}

export default Message;