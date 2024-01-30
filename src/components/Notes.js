import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import NotesItem from './NotesItem'
import { useNavigate } from 'react-router-dom'

export default function Notes(props) {
  const navigate = useNavigate()
  const context = useContext(noteContext)
  const [data,setData] = useState({id:null,title:"",description:"",tags:""})
  const {editNote} = context
  const handleClick = (e)=>{
      console.log(data)
      ref.current.click()
      e.preventDefault()
      props.alertFunc("Note edited successfully",'success')
      editNote(data)
  }
  const onChange = (e)=>{
      setData({...data,[e.target.name]:e.target.value})
  }
  const ref = useRef(null)
  const {useNote,getNotes} = context
  useEffect(()=>{
    if(localStorage.getItem('token'))
    getNotes()
    else
    navigate('/login')
  },[])
  const update = (note)=>{
    ref.current.click()
    setData({id:note._id,title:note.title,description:note.description})
  }
    return (
      <>
      <button type="button" className="d-none btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch Modal
      </button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form action="">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="title" onChange={onChange} value={data.title} name='title' placeholder="Add Title For Your Note"/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="description" value={data.description} onChange={onChange} name='description' rows="3"></textarea>
                </div>
            </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button className="btn btn-secondary" onClick={handleClick}>Save Note</button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      <div className="row">
        {useNote.map((note)=>{
            return <NotesItem note={note} key={note._id} alertFunc={props.alertFunc} edit={update}/>
          })}
      </div>
      </>
    )
}
