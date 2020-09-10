import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Ume Developer LinkUp</h1>
          <p className="lead">
            Create a developer profile, showoff your github repositories share and like posts, favourite other developers and contact them
          </p>
          <div className="buttons">
            <Link className="btn btn-primary" to="/register">Sign Up</Link>
            <Link className="btn btn-light" to="/login">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home