import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const AllBooks = ({ auth }) => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    axios
      .get('https://books-api.glitch.me/api/books', {
        auth: auth
      })
      .then((response) => {
        setBooks(response.data.books)
      })
  })

  if (!auth) {
    return <Redirect to='/login' />
  }

  return (
    <div className='Books'>
      <h1>My Book List</h1>
      {books.map((book) => (
        <div key={book.id} className='Book'>
          <h2>{book.title || 'No Title'}</h2>
          <p>{book.text}</p>
          <p>Written by: {book.authors}</p>
          <p>Notes: {book.notes}</p>
          <p>Status: {book.status}</p>
        </div>
      ))}
    </div>
  )
}

export default AllBooks
