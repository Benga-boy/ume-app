import React, { Fragment, useEffect } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './Components/common/Navbar'
import Home from './Components/common/Home'
import Login from './Components/auth/Login'
import Register from './Components/auth/Register'
import Dashboard from './Components/dashboard/Dashboard'
import SecureRoute from './Components/secureRouting/SecureRoute'
import CreateProfile from './Components/profile-form/CreateProfile'
import EditProfile from './Components/profile-form/EditProfile'
import AddExperience from './Components/profile-form/AddExperience'
import AddEducation from './Components/profile-form/AddEducation'
import Profiles from './Components/profiles/Profiles'
import Profile from './Components/profiles/Profile'
import Following from './Components/dashboard/Following'
import Posts from './Components/posts/Posts'
import Post from './Components/posts/Post'
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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:user_id" component={Profile} />
              <SecureRoute exact path="/posts" component={Posts} />
              <SecureRoute exact path="/posts/:post_id" component={Post} />
              <SecureRoute exact path="/dashboard" component={Dashboard} />
              <SecureRoute exact path="/dashboard/followings" component={Following} />
              <SecureRoute path="/create-profile" component={CreateProfile} />
              <SecureRoute path="/edit-profile" component={EditProfile} />
              <SecureRoute path="/add-experience" component={AddExperience} />
              <SecureRoute path="/add-education" component={AddEducation} />
            </Switch>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  )
}

export default App
