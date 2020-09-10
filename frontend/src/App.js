import React, { Fragment, useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './Components/common/Navbar'
import Home from './Components/common/Home'
import Login from './Components/auth/Login'
import Register from './Components/auth/Register'
import Alert from './Components/common/Alert'
import {loadAUser} from './actions/auth'
import {setAuthToken} from './utils/setAuthToken'

// Redux
import { Provider } from 'react-redux'
import store from './store'


  // Set header with token if there is one
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

const App = () => {

  useEffect(() => {
    store.dispatch(loadAUser())
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Home} />
          <section className="container">
            <Alert />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  )
}

export default App
