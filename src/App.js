import "./App.css";
import React,{useState} from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NotesState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AlertState from "./context/alert/AlertState";
import Alert from "./components/Alert";



function App() {
  const [alert, setAlert] = useState(null);

  return (
    <>
    <NoteState>
      <AlertState setAlert={setAlert}>
      <BrowserRouter>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
      </AlertState>
   </NoteState>
    </>
  );
}

export default App;
