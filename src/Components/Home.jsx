import React , {useContext} from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";
import noteContext from "../Context/notes/noteContext";

export default function Home(props) {
  const context = useContext(noteContext);
  const { notes } = context;
  return (
    <div>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <AddNote showAlert={props.showAlert}/>
        <h2>{notes.length!==0?"Your Notes":"No Notes to Display"}</h2>
        <Notes />
      </div>
    </div>
  );
}
