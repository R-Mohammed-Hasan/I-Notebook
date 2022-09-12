import React, { useContext, useEffect, useState } from "react";
import NoteContext from "./../context/notes/NoteContext";
import Alert from "./Alert";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useRef } from "react";

export default function Notes() {
  // to show all notes when page refreshes
  let { notes, getAllNotes, editNote } = useContext(NoteContext);
  useEffect(() => {
    getAllNotes();
  }, []);

  // modal opening fn; for editing a note
  let modalRef = useRef(0);
  let closeRef = useRef(0);
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});

  const updateNote = (currentNote) => {
    modalRef.current.click();
    setNote({id: currentNote._id,etitle: currentNote.title,edescription: currentNote.description,etag: currentNote.tag});

  };

  // editing note
  const onSubmitHandler = (event) => {
    event.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    closeRef.current.click();
  };
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={modalRef}
      >Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="my-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Note Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Note Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}

                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mx-3"
                  onClick={onSubmitHandler}
                >
                  Update Note
                </button>
                <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return (
            <NoteItem note={note} updateNote={updateNote} key={note._id} />
          );
        })}
      </div>
    </>
  );
}
