import React,{useContext} from "react";
import NoteContext from "./../context/notes/NoteContext";
import AlertContext from './../context/alert/AlertContext'


export default function NoteItem(props) {
  let showAlert = useContext(AlertContext);

  let { deleteNote } = useContext(NoteContext);
  let { note,updateNote } = props;
  return (
    <div className="col-md-3 my-3">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title"> {note.title}</h5>
            <div className="d-flex mx-3">
              <i className="fa-solid fa-pen-to-square mx-2 icons" onClick={() => {updateNote(note)}}></i>
              <i className="fa-solid fa-trash mx-2 icons" onClick={()=>{
                deleteNote(note._id);
                showAlert("Deleted note successfully..!","success");
                }}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          <p className="card-text fw-bold">@{note.tag}</p>
        </div>
      </div>
    </div>
  );
}
