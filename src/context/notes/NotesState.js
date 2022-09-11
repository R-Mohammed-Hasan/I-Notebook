import React from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    let state = {dummy:"don",name:"human"};
    return(
        <NoteContext.Provider value={state}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;
