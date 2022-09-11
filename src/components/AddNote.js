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
          <label htmlFor="title" className="form-label">
          Note Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            onChange={onChange}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="description"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onSubmitHandler}>
          Submit
        </button>
      </form>
    </>
  );
};
