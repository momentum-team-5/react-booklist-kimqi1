import { useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import axios from 'axios'
import { authPropType } from '../prop-types'

export default function Note ({ auth }) {
  const { id } = useParams()
  const [note, setNote] = useState({})
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios.get('https://books-api.glitch.me/api/books/' + id, {
      auth: auth
    })
      .then(res => {
        const notes = res.data.notes
        setNote(notes.find(note => note._id === id))
      })
  }, [id])

  function deleteNote () {
    axios.delete('https://notes-api.glitch.me/api/notes/' + id, {
      auth: auth
    })
      .then(res => {
        setDeleted(true)
      })
  }

  if (!auth) {
    return <Redirect to='/login' />
  }

  if (deleted) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <h1>{note.title || 'No Title'}</h1>
      <p>
        {note.text}
      </p>
      <div>
        <button onClick={deleteNote}>Delete this note</button>
      </div>
    </div>
  )
}

Note.propTypes = {
  auth: authPropType
}
