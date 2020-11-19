import React from 'react'

const UserRepos = ({ userRepos, forked }) => (
  userRepos.map(repo => {
    if(forked || (!forked && !repo.fork)) { return (
      <a target="_blank" href={repo.html_url} className="repos"><div>
        <h2>{ repo.name }</h2>
        <p>{ repo.description }</p>
        <p>{ repo.language }</p>
        <div><p>fork : { repo.forks_count }</p> <p>watcher : { repo.watchers }</p></div>
      </div></a>
    )}
  })
)

export default UserRepos