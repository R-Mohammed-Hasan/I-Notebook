import React,{useContext} from "react";
import NoteContext from "./../context/notes/NoteContext";

export default function NoteItem(props) {
  let { deleteNote } = useContext(NoteContext);
  let { note } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title"> {note.title}</h5>
            <div className="mx-3">
              <i className="fa-solid fa-pen-to-square mx-2 icons"></i>
              <i className="fa-solid fa-trash mx-2 icons" onClick={()=>{deleteNote(note._id)}}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          {note.tag}
        </div>
      </div>
    </div>
  );
}
