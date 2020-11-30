import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Note (props) {
  const { id } = useParams()
  const [note, setNote] = useState({})

  useEffect(() => {
    axios.get('https://books-api.glitch.me/api/books/:id/notes', {
        auth: auth
    })
    .then(res => {
        const notes = res.data.notes
        setNote(notes.find(note => note._id ===id))
    })
  }, [id]

  return (
    <div>
      <h1>Note</h1>
    </div>
  )
}
