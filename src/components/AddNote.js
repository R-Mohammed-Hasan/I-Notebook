import React, { useContext, useState } from "react";
import NoteContext from "./../context/notes/NoteContext";

export default function AddNote() {
  let { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({title:"",description:"",tag:""});

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addNote(note);
    setNote({title:"",description:"",tag:""});

  }
  const onChange = (event) => {
      setNote({...note,[event.target.name]: event.target.value});
  }
  return (
    <>
      <h2>Add a Note </h2>
      <form  onSubmit={onSubmitHandler}>
        <div className="my-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Note Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            onChange={onChange}
            minLength="5"
            required
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Note Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            minLength="5"
            required
            value={note.description}

          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
          Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}

          />
        </div>

        <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </>
  );
};
