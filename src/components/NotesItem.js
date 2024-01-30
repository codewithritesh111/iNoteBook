import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

export default function NotesItem(props) {
    const context = useContext(noteContext)
    const {deleteNote} = context
    const {note,edit} = props
  return (
    <div className='col-md-3 mx-3 my-3'>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <i className="fa-solid fa-trash mx-3" onClick={()=>deleteNote(note._id,props.alertFunc)}></i>
                <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>edit(note)}></i>
            </div>
        </div>
    </div>
  )
}
