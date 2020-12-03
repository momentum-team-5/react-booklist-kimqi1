import { Link, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import clsx from 'clsx'
import AddBook from './AddBook'
import Note from './Note'

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
      <h1 className='underline flex justify-center mh2 mv3'>My Book List</h1>
      <div className='flex justify-center mv2'>
        <button><Link to='/addbook'>Add A Book</Link></button>
      </div>
      <div className='dt dt--fixed w-100 flex justify-center'>

        <div className='h3 dt dt--fixed w-100'>
          <h3 className='h3 reading flex justify-center ma3 pv4 pa3 ph6'>Reading</h3>
          {readingBooks.map(book => (
            <div
              key={book._id} className={clsx('grow ma2 book', {
                reading: book.status === 'reading',
                toread: book.status === 'toread',
                read: book.status === 'read'
              })}
            >
              <h2 className='ma2 underline'>{book.title || 'No Title'}</h2>
              <p className='ma3 i'>Written by: {book.authors}</p>
              <p><button onClick={() => deleteBook(book)}>Delete book</button></p>
              <div className='flex justify-center mv2'>
                <button><Link to='/note'>Add A Note</Link></button>
              </div>
            </div>
          ))}
        </div>
        <div className='h3 dt dt--fixed w-100'>
          <h3 className='toread h3 ma3 pv4 pa3 ph6'>ToRead</h3>
          {toReadBooks.map(book => (
            <div
              key={book._id} className={clsx('grow ma2 book', {
                reading: book.status === 'reading',
                toread: book.status === 'toread',
                read: book.status === 'read'
              })}
            >
              <h2 className='ma2 underline'>{book.title || 'No Title'}</h2>
              <p className='ma3 i'>Written by: {book.authors}</p>
              <p><button onClick={() => deleteBook(book)}>Delete book</button></p>
            </div>
          ))}
        </div>

        <div className='h3 dt dt--fixed w-100'>
          <h3 className='read h3 ma3 pv4 pa3 ph6'>Read</h3>
          {readBooks.map(book => (
            <div
              key={book._id} className={clsx('grow ma2 book', {
                reading: book.status === 'reading',
                toread: book.status === 'toread',
                read: book.status === 'read'
              })}
            >
              <h2 className='ma2 underline'>{book.title || 'No Title'}</h2>
              <p className='ma3 i'>Written by: {book.authors}</p>
              <p><button onClick={() => deleteBook(book)}>Delete book</button></p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default AllBooks
