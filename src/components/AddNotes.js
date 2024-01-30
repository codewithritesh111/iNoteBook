import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function AddNotes(props) {
    const context = useContext(noteContext)
    const [data,setData] = useState({title:"",description:"",tags:""})
    const {addNote} = context
    const handleClick = (e)=>{
        e.preventDefault()
        props.alertFunc('Note Added SuccessFully','success')
        addNote(data)
        setData({title:"",description:"",tags:""})
    }
    const onChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
        <h2>Add Notes</h2>
        <form action="">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" onChange={onChange} value={data.title} name='title' placeholder="Add Title For Your Note"/>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description"  onChange={onChange} value={data.description} name='description' rows="3"></textarea>
        </div>
        <button className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
      </div>
    </div>
  )
}
