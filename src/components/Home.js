import React from 'react'
import Notes from './Notes'
import AddNotes from './AddNotes'

export default function Home(props) {
  return (
    <div>
      <AddNotes alertFunc={props.alertFunc}/>
      <div className="container">
        <Notes alertFunc={props.alertFunc}/>
      </div>
    </div>
  )
}
