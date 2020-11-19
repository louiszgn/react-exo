import React from 'react'

const UserProfile = ({ userProfile }) => (
    <div className="userProfile" id="userProfile">
        <img src={ userProfile.avatar_url }></img>
        <h2>{ userProfile.name }</h2>
        <a target="_blank" href={ userProfile.html_url }>@{ userProfile.login }</a>
        <p>{ userProfile.bio }</p>
        { userProfile.company &&
            <p>{ userProfile.company }</p>
        }
        { userProfile.blog &&
            <a target="_blank" href={ userProfile.blog }>{ userProfile.blog }</a>
        }
        { userProfile.location &&
            <p>{ userProfile.location }</p>
        }
    </div>
)

export default UserProfile