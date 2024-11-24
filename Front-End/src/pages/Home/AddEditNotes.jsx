import React, { useState } from 'react'
import TagInput from '../../components/input/TagInput'
import { MdClose } from 'react-icons/md'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'



const AddEditNotes = ({noteData,type,getAllNotes,onClose}) => {

  const [title, setTitle]=useState(noteData?.title||"")
  const [content, setContent]=useState(noteData?.content||"")
  const[ tags, setTags]=useState(noteData?.tags||[])

  const [error, setError]= useState(null)

  const navigate= useNavigate();
  

  // Add Note
  const addNewNote = async ()=>{
    try{
      const response = await axiosInstance.post("/add-note",{
        title,
        content,
        tags,
      })

      if(response.data && response.data.note){
          getAllNotes()
          onClose()
      }
    }catch (error){
        if(
          error.response &&
          error.response.data &&
          error.response.data.message
        ){
          setError(error.response.data.message)
        }
    }
  };

  // Edit Note
  const editNote = async ()=>{
    const noteId= noteData._id
    try{
      const response = await axiosInstance.put("/edit-note/"+noteId,{
        title,
        content,
        tags,
      })

      if(response.data && response.data.note){
          getAllNotes()
          onClose()
      }
    }catch (error){
        if(
          error.response &&
          error.response.data &&
          error.response.data.message
        ){
          setError(error.response.data.message)
        }
    }
  };


  const handleAddNote = ()=>{
    if (!title){
      setError("Plese enter the title");
      return;
    }

    if (!content){
      setError("Please enter the content")
      return;
    }

    setError("")

    if(type === 'edit'){
      editNote()
    }
    else{
      addNewNote()
      navigate('/Dashboard')
    }
  }

  const handleClick = () => {
    navigate('/dashboard') || window.location.reload(); 
  };

  return (
    <div className='relative'>

      <button
      className='w-10 h-10  flex items-center justify-center absolute -top-3 -right-3 btn-primary hover:bg-gray-800'
      onClick={handleClick}>
        <MdClose className="text-xl text-secondary"/>
      </button>



      <div className='flex flex-col gap-2'>
        <label className="input-label">TITLE</label>
        <input type="text"
        className="text-2xl text-slate-950 outline-none"
        placeholder="Go to Gym At 5"
        value={title}
        onChange={({target})=>setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
        type="text"
        className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
        placeholder='Content'
        rows={19}
        value={content}
        onChange={({target})=>setContent(target.value)}
        />
      </div>
      <div className='mt-3'>
        <label className='input-labbel'>TAGS</label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>
      
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button className="btn-primary font-medium mt-5 p-3" 
      onClick={handleAddNote}>
        {type ==='edit'?'UPDATE':'ADD'}</button>
    </div>
  )
}

export default AddEditNotes