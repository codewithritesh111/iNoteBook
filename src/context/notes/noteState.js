import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const url = "https://i-note-book-wine.vercel.app";
  const notes = [];
  const [useNote, setNote] = useState(notes);
  const getNotes = async () => {
    const response = await fetch(`${url}/api/notes/getnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setNote(json.notes);
  };

  const addNote = async (val) => {
    const response = await fetch(`${url}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: val.title,
        description: val.description,
      }),
    });
    getNotes();
  };

  const deleteNote = async (id, alertFunc) => {
    const response = await fetch(`${url}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("token"),
      },
    });
    const a = useNote.filter((note) => {
      return note._id !== id;
    });
    setNote(a);
    alertFunc("Deleted successfully", "warning");
  };

  const editNote = async (data) => {
    console.log(data);
    const response = await fetch(`${url}/api/notes/update/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
      }),
    });
    const a = JSON.parse(JSON.stringify(useNote));
    for (let i = 0; i < a.length; i++) {
      if (a[i]._id === data.id) {
        a[i].title = data.title;
        a[i].description = data.description;
        break;
      }
    }
    setNote(a);
  };

  return (
    <noteContext.Provider
      value={{ useNote, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
