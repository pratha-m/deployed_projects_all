import React from 'react'
import "./eachNote.css"

const EachNote=({note}) => {
  return (
    <div className="eachNote">
     <div className="eachNoteTitle">{note.title}</div>
     <div className="eachNoteDesc">{note.description}</div>
     <div className="eachNoteButtons">
       <div className="eachNoteBtn shareBtn"><img src="./images/shareBtn.png" alt="" /></div>
       <div className="eachNoteBtn editBtn"><img src="./images/editButton.png" alt="" /></div>
       <div className="eachNoteBtn deleteBtn"><img src="./images/deleteButton.svg" alt="" /></div>
       <div className="eachNoteBtn copyBtn"><img src="./images/copy.png" alt="" /></div>
      </div>
    </div>
  )
}

export default EachNote