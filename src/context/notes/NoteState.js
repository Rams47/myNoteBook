import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const initialnotes = []
    const [notes, setnotes] = useState(initialnotes)

    //get all notes
    const getNotes = async () => {
        //TODO: API Call

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYTFiNDcyNTkwOGFmNjkyNmY1ZmU0In0sImlhdCI6MTYzODU0Mzk2NH0.ti7Dp02yLqsCOeqP8ebmtKgPxHeX_dsj_5lytekt-n8'
            }
        });

        const json = await response.json();
        console.log(json);
        setnotes(json)

    }

    //Add a note
    const addNote = async (title, description, tag) => {
        //TODO: API Call

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYTFiNDcyNTkwOGFmNjkyNmY1ZmU0In0sImlhdCI6MTYzODU0Mzk2NH0.ti7Dp02yLqsCOeqP8ebmtKgPxHeX_dsj_5lytekt-n8'
            },
            body: JSON.stringify({title,description,tag})
        });
        const note = await response.json();

        setnotes(notes.concat(note));

    }

    //Delete a note
    const deleteNote = async (id) => {
        //TODO: API Call
        
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYTFiNDcyNTkwOGFmNjkyNmY1ZmU0In0sImlhdCI6MTYzODU0Mzk2NH0.ti7Dp02yLqsCOeqP8ebmtKgPxHeX_dsj_5lytekt-n8'
            }
        });

        const json = await response.json();
        console.log(json);



        console.log("Deleting note with id" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setnotes(newNotes);
    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        //API CALL
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFhYTFiNDcyNTkwOGFmNjkyNmY1ZmU0In0sImlhdCI6MTYzODU0Mzk2NH0.ti7Dp02yLqsCOeqP8ebmtKgPxHeX_dsj_5lytekt-n8'
            },
            body: JSON.stringify({title,description,tag})
        });

        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse( JSON.stringify(notes));
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }


    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;