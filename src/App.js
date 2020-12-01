import './App.css'
import 'tachyons'
import Register from './components/Register'
import Login from './components/Login'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import AllBooks from './components/AllBooks'
import { useLocalStorage } from './hooks'
import Note from './components/Note'

function App () {
  const [auth, setAuth] = useLocalStorage('book_auth', null)

  return (
    <Router>
      <div className='App pv3 ph2 mw8 center bg-light-blue'>

        {auth && (
          <div>
            <span>Logged in as {auth.username}</span> | {' '}
            <button onClick={() => setAuth(null)}>Log out</button>
          </div>
        )}

        <Switch>
          <Route path='/note/:id'>
            <Note auth={auth} />
          </Route>
          <Route path='/signup'>
            <Register
              auth={auth}
              onRegister={setAuth}
            />
          </Route>
          <Route path='/login'>
            <Login
              auth={auth}
              onLogin={setAuth}
            />
          </Route>
          <Route path='/'>
            <AllBooks auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
