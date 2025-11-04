import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
const SearchInput = () => {
  const [search,setSearch] = useState('')
  const {setSelectedConversation} = useConversation();
  const {conversation} = useGetConversation();

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(search.length==0) return;
    
    let conversat = conversation.find((c)=> c.fullName.toLowerCase().includes(search.toLowerCase()))
    if(conversat) setSelectedConversation(conversat)
  }

  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type='text' placeholder="Search..." 
        className='input input-bordered rounded-full'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-blue text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none text-slate-500'/>
        </button>
    </form>
  )
}

export default SearchInput