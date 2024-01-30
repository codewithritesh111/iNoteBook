import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/noteState";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Alert from "./components/Alert";
import { useState } from "react";

function App() {
  const [alert,showAlert] = useState(null)
  const showA = (message,type)=>{
    showAlert({message:message,type:type})
    setTimeout(()=>{
      showAlert(null)
    },2000)
  }

  return (
    <div className="App">
      <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} alertFunc={showAlert}/>
        <Routes>
          <Route exact path="/" element={<Home  alertFunc={showA}/>} />
          <Route exact path="/login" element={<Login  alertFunc={showA}/>} />
          <Route exact path="/signup" element={<Signup  alertFunc={showA}/>} />
          <Route exact path="/about" element={<About/>} />
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;
