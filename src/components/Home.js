import Notes from './Notes';
import React from 'react';

export const Home = (props) => {

    return (
        <div> 
            <Notes  showAlert={props.showAlert} />
        </div>
    )
}
