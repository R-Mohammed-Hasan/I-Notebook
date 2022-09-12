import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let initialNotes = [];
  let [notes, setNotes] = useState(initialNotes);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxYWU0ODY5Y2RlM2Y4YTEyMmExYjFiIn0sImlhdCI6MTY2MjcxNTg2NH0.jdHZ9uUWT9c95FxDsRqvUb3wainfViP7VBn__twi3FI",
      },
    });
    const allNotes = await response.json();
    setNotes(allNotes);
  };

  // add note
  const addNote = async (note) => {
    let { title, description, tag } = note;
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxYWU0ODY5Y2RlM2Y4YTEyMmExYjFiIn0sImlhdCI6MTY2MjcxNTg2NH0.jdHZ9uUWT9c95FxDsRqvUb3wainfViP7VBn__twi3FI",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let responeNote = await response.json();
    setNotes(notes.concat(responeNote));
  };

  // edit note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxYWU0ODY5Y2RlM2Y4YTEyMmExYjFiIn0sImlhdCI6MTY2MjcxNTg2NH0.jdHZ9uUWT9c95FxDsRqvUb3wainfViP7VBn__twi3FI",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    for(let i = 0 ; i < notes.length; i++){
      let note = notes[i];
      if (note._id === id) {
        notes[i].title = title;
        notes[i].description = description;
        notes[i].tag = tag;
        break;
      }
    };
    setNotes(JSON.parse(JSON.stringify(notes)));
  };

  // delete note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjMxYWU0ODY5Y2RlM2Y4YTEyMmExYjFiIn0sImlhdCI6MTY2MjcxNTg2NH0.jdHZ9uUWT9c95FxDsRqvUb3wainfViP7VBn__twi3FI",
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
