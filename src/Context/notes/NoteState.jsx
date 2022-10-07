import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initNotes = [];
  const [notes, setNotes] = useState(initNotes);
  // Get all notes first-hand
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json = await response.json();
    setNotes(json);
  };
  // Adding Note
  const addNote = async (title, description, tag) => {
    let finalTag =  tag === "" ? "General" : tag
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, finalTag }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
  };
  // Deleting Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "Authorization":
            localStorage.getItem('token'),
        },
      });
      const json = await response.json();
      console.log(json);
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };
  // Updating Note
  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "Authorization":
          localStorage.getItem('token'),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, updateNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
