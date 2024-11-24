import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import AddNotes from './pages/AddNotes/AddNotes';
import SpecialNotes from "./pages/Home/SpecialNotes"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/addnotes' element={<AddNotes/>}/>
        <Route path='/special' element={<SpecialNotes/>}/>
      </Routes>
    </Router>
  );
}

export default App;

