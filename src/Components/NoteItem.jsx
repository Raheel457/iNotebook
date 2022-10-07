import React from "react";


export default function NoteItem(props) {
  return (
    <>
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <div className="d-block" style={{marginLeft:"85%",display:"block"}}>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{props.deletingNote(props.note)}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=> {props.updateNote(props.note)}}></i>
          </div>
          <p className="card-text">
          {props.note.description}
          </p>
        </div>
      </div>
    </>
  );
}
