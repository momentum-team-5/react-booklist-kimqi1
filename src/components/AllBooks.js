import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import clsx from 'clsx'

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
  }, [auth])
  if (!auth) {
    return <Redirect to='/login' />
  }

  const readBooks = books.filter(book => book.status === 'read')
  const toReadBooks = books.filter(book => book.status === 'toread')
  const readingBooks = books.filter(book => book.status === 'reading')

  function deleteBook (bookToDelete) {
    axios.delete(`https://books-api.glitch.me/api/books/${bookToDelete._id}`, {
      auth: auth
    })
      .then(res => {
        // Remove the book that we just deleted
        // from our books array in state.
        setBooks(books.filter(currentBook => (
          currentBook._id !== bookToDelete._id)
        ))
      })
  }

  return (
    <div className='BookList'>
      <h1 className='mh2 mv3'>My Book List</h1>
      <div className='key flex'>

        <div>
          <h3 className='reading ma3 pv4 pa3 ph6'>Reading</h3>
          {readingBooks.map(book => (
            <div
              key={book._id} className={clsx('ma2 book', {
                reading: book.status === 'reading',
                toread: book.status === 'toread',
                read: book.status === 'read'
              })}
            >
              <h2 className='ma2 underline'>{book.title || 'No Title'}</h2>
              <p className='ma3 i'>Written by {book.authors}</p>
              <p><button onClick={() => deleteBook(book)}>Delete book</button></p>
            </div>
          ))}
        </div>
        <div>
          <h3 className='toread ma3 pv4 pa3 ph6'>To Read</h3>
          {toReadBooks.map(book => (
            <div
              key={book._id} className={clsx('ma2 book', {
                reading: book.status === 'reading',
                toread: book.status === 'toread',
                read: book.status === 'read'
              })}
            >
              <h2 className='ma2 underline'>{book.title || 'No Title'}</h2>
              <p className='ma3 i'>Written by {book.authors}</p>
              <p><button onClick={() => deleteBook(book)}>Delete book</button></p>
            </div>
          ))}
        </div>

        <div> <h3 className='read ma3 pv4 pa3 ph6'>Read</h3>
          {readBooks.map(book => (
            <div
              key={book._id} className={clsx('ma2 book', {
                reading: book.status === 'reading',
                toread: book.status === 'toread',
                read: book.status === 'read'
              })}
            >
              <h2 className='ma2 underline'>{book.title || 'No Title'}</h2>
              <p className='ma3 i'>Written by {book.authors}</p>
              <p><button onClick={() => deleteBook(book)}>Delete book</button></p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AllBooks
