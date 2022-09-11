import React from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  let initialNotes = [
    {
      _id: "631c966a777458d9c22054fd",
      user: "631ae4869cde3f8a122a1b1b",
      title: "Todo updated",
      description: "Need to finish my project",
      tag: "work",
      timestamp: "2022-09-10T13:51:38.171Z",
      __v: 0,
    },
    {
      _id: "631d7cca3467a2be9de5834f",
      user: "631ae4869cde3f8a122a1b1b",
      title: "Todo",
      description: "Need to finish my project",
      tag: "personal",
      timestamp: "2022-09-11T06:14:34.675Z",
      __v: 0,
    },
    {
      _id: "631d8122c9c0220ca06d3aaf",
      user: "631ae4869cde3f8a122a1b1b",
      title: "Todo",
      description: "Need to finish my project",
      tag: "personal",
      timestamp: "2022-09-11T06:33:06.511Z",
      __v: 0,
    },
    {
      _id: "631d8122c9c0220ca06d3ab1",
      user: "631ae4869cde3f8a122a1b1b",
      title: "Todo",
      description: "Need to finish my project",
      tag: "personal",
      timestamp: "2022-09-11T06:33:06.645Z",
      __v: 0,
    },
    {
      _id: "631d8122c9c0220ca06d3ab3",
      user: "631ae4869cde3f8a122a1b1b",
      title: "Todo",
      description: "Need to finish my project",
      tag: "personal",
      timestamp: "2022-09-11T06:33:06.822Z",
      __v: 0,
    },
    {
      _id: "631d8123c9c0220ca06d3ab5",
      user: "631ae4869cde3f8a122a1b1b",
      title: "Todo",
      description: "Need to finish my project",
      tag: "personal",
      timestamp: "2022-09-11T06:33:07.009Z",
      __v: 0,
    },
    {
      _id: "631d8123c9c0220ca06d3ab7",
      user: "631ae4869cde3f8a122a1b1b",
      title: "Todo",
      description: "Need to finish my project",
      tag: "personal",
      timestamp: "2022-09-11T06:33:07.208Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(initialNotes);

  // add note
  const addNote = (note) => {
    console.log("adding note");
        note = {
            _id: "631d8123c9c0220ca06d3ab8",
            user: "631ae4869cde3f8a122a1b1c",
            title: note.title,
            description: note.description,
            tag: "personal",
            timestamp: "2022-09-11T06:33:07.208Z",
            __v: 0,
        }
        setNotes(notes.concat(note));
  };

  // edit note
  const editNote = () => {};

  // delete note
  const deleteNote = (id) => {
    console.log("deleting note "+id);
    const newNotes = notes.filter((note) =>{ return note._id !== id});
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes,addNote,editNote,deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
