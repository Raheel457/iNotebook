import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";
import Login from "./Components/Login";
import Singup from "./Components/Singup";
import { useState } from "react";
import Alert from "./Components/Alert";
import Main from "./Components/Main";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=> {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1600);
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route exact path="main" element={<Main />} />
              <Route exact path="about" element={<About />} />
              <Route exact path="login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="signup" element={<Singup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
