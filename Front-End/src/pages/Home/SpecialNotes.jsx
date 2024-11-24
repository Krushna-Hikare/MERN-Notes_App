import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import AddEditNotes from './AddEditNotes'

export default function SpecialNotes() {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  })

  const [allNotes, setAllNotes] = useState([])

  const [userInfo, setUserInfo] = useState(null)

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
  }

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  // Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.")
    }
  }

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId)

      if (response.data && !response.data.error) {
        getAllNotes()
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected error occurred. Please try again.")
      }
    }
  }

  // Update isPinned
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id
    try {
      const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
        isPinned: !noteData.isPinned
      })

      if (response.data && response.data.note) {
        getAllNotes()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => { };
  }, [])

  // Filter the pinned notes
  const pinnedNotes = allNotes.filter(note => note.isPinned);

  return (
    <div className="bg-[url('/background.jpg')] bg-cover bg-center bg-fixed min-h-screen">
      <Navbar userInfo={userInfo} />

      <div className='container mx-auto'>
        <div className='grid grid-cols-3 gap-4 mt-8'>
          {pinnedNotes.map((item, index) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => { handleEdit(item) }}
              onDelete={() => { deleteNote(item) }}
              onPinNote={() => { updateIsPinned(item) }}
            />
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/dashboard')} className="fixed right-10 bottom-10 w-20 h-16 flex items-center justify-center rounded-2xl text-white bg-primary hover:bg-gray-800">
        Home
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => { }}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }}
          getAllNotes={getAllNotes}
        />
      </Modal>
    </div>
  )
}
