import React, { useContext, useState } from "react";
import NoteContext from "./../context/notes/NoteContext";

export default function AddNote() {
  let { addNote } = useContext(NoteContext);
  const [note, setNote] = useState({});

  const onSubmitHandler = (event) => {
    event.preventDefault();
    addNote(note);
  }
  const onChange = (event) => {
      setNote({...note,[event.target.name]: event.target.value});
  }
  return (
    <>
      <h2>Add a Note </h2>
      <form>
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
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>
          Add Note
        </button>
      </form>
    </>
  );
};
