import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3 shadow p-3 m-3 bg-body rounded">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h5 className="card-title">{note.title}</h5>
                        <div>
                            <i className="far fa-trash-alt mx-3" onClick={()=>{deleteNote(note._id);
        props.showAlert("Note deleted successfully", "success");
    }}></i>
                            <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                        </div>
                    </div>
                    <p className="card-text">{note.description}</p>

                </div>
            </div>
        </div>
    )
}

export default Noteitem
