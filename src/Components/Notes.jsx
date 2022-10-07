import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(noteContext);
  const ref = useRef(null);
  const delRef = useRef(null);

  const { notes, getNotes, updateNote , deleteNote } = context;
  let Navigate = useNavigate();
  const [note, setNote] = useState({
    noteId: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  useEffect(() => {
    if (localStorage.getItem('token')){
      getNotes();
    }
    else{
      Navigate("/main");
    }
  },[getNotes,Navigate]);
  const updatingNote = (currentNote) => {
    ref.current.click();
    setNote({
      noteId: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const deletingNote = (currentNote) => {
    delRef.current.click();
    setNote({
      noteId: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const HandleUpdate = () => {
    updateNote(note.noteId, note.etitle, note.edescription, note.etag);
  };
  const HandleDelete = ()=>{
    deleteNote(note.noteId)
  }
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#updateModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="form-group my-3">
                  <label htmlFor="Fortitle">Title</label>
                  <input
                    type="text"
                    className="form-control my-1"
                    id="eFortitle"
                    placeholder="Enter Title"
                    onChange={onchange}
                    name="etitle"
                    value={note.etitle}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="forDescription">Description</label>
                  <input
                    type="text"
                    className="form-control my-1"
                    id="eforDescription"
                    placeholder="Description ..."
                    onChange={onchange}
                    name="edescription"
                    value={note.edescription}
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="forTag">Tag</label>
                  <input
                    type="text"
                    className="form-control my-1"
                    id="eforTag"
                    placeholder="Tag ..."
                    onChange={onchange}
                    name="etag"
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length <= 3 || note.edescription.length <= 7
                }
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={HandleUpdate}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>


      <button
        ref={delRef}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#deleteModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Delete Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h2>Are you sure to delete this Note.</h2>
              <b>Title: </b><p>{note.etitle}</p>
              <b>Description: </b><p>{note.edescription}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={HandleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {notes.map((note) => {
          return (
            <div className="col-lg-4 col-md-6" key={note._id}>
              <NoteItem  updateNote={updatingNote} deletingNote={deletingNote} note={note} />
            </div>
          );
        })}
      </div>
    </>
  );
}
