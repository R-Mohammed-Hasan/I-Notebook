import React, { useContext } from "react";
import NoteContext from "./../context/notes/NoteContext";
import Alert from "./Alert";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function Notes() {
  // useContext concept
  let { notes, addNote } = useContext(NoteContext);
  return (
    <>
      <AddNote />
      <div className="row my-4">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} />;
        })}
      </div>
    </>
  );
}
