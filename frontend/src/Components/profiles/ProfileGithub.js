import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { getGithubRepos } from '../../actions/profile'
import { connect } from 'react-redux'

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username)
  }, [getGithubRepos, username])
  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github"></i> Github Repos
    </h2>
      {
        repos === null ? <h1>Loading....</h1> : (repos.map(repo => <div className="repo bg-white p-1 my-1" key={repo.id}>
          <div>
            <h4><a href={repo.html_url} target="_blank"
              rel="noopener noreferrer">{repo.name} </a></h4>
            {
              repo.description && (<p>{repo.description}</p>)
            }
            <div>
              <ul>
                <li className="badge badge-primary">Stars: {repo.stargazers_count} </li>
                <li className="badge badge-dark">Watchers: {repo.watches_count}</li>
                <li className="badge badge-light">Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        </div>))
      }
    </div>
  )
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  repos: state.profile.repos
})

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub) 
