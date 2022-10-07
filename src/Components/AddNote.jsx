import React, { useContext, useState } from "react";

import noteContext from "../Context/notes/noteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote, notes } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const HandleClick = (e) => {
    e.preventDefault();
    let status = true;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i].title === note.title) {
        props.showAlert("Title must be unique from already existing notes.", "warning");
        status = false;
        break;
      } else {
        status = true;
      }
    }

    if (status) {
      addNote(note.title, note.description, note.tag);
      setNote({
        title: "",
        description: "",
        tag: "",
      });
      props.showAlert("Note Added Successfully", "success");
    }
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <form className="my-3">
      <div className="form-group my-3">
        <label htmlFor="Fortitle">
          Title <b>*</b>
        </label>
        <input
          type="text"
          className="form-control my-1"
          id="Fortitle"
          aria-describedby="emailHelp"
          placeholder="Enter Title"
          onChange={onchange}
          name="title"
          value={note.title}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="forDescription">
          Description <b>*</b>
        </label>
        <input
          type="text"
          className="form-control my-1"
          id="forDescription"
          placeholder="Description ..."
          onChange={onchange}
          name="description"
          value={note.description}
        />
      </div>
      <div className="form-group my-3">
        <label htmlFor="forTag">Tag</label>
        <input
          type="text"
          className="form-control my-1"
          id="forTag"
          placeholder="Tag ..."
          onChange={onchange}
          name="tag"
          value={note.tag}
        />
      </div>
      <button
        disabled={note.title.length < 3 || note.description.length < 7}
        type="submit"
        className="btn btn-primary my-3"
        onClick={HandleClick}
      >
        Add Note
      </button>
    </form>
  );
}
