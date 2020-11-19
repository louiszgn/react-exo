import React, { Component } from 'react'
import Searchform from './Searchform'
import UserProfile from './UserProfile'
import UserRepos from './UserRepos'
import config from './config'
import './style.css'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false,
            userProfile: false,
            userName: false,
            userRepos: false,
            forked: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const data = new FormData(e.target)
        const userName = data.get('userName')
        const forked = data.get('forked')
        
        this.fetchAllData(userName, forked)
    }

    clearData() {
        this.setState({
            isLoading: false,
            userProfile: false,
            userName: false,
            userRepos: false,
            forked: false
        })
    }

    async fetchAllData(userName, forked) {
        this.setState({
            isLoading: true,
        })
        const userProfile = await this.fetchCurrentUserProfile(userName)
        const userRepos = await this.fetchCurrentUserRepos(userName)
        if (!forked) {
            this.setState({
                forked: false
            })
        }
        else {
            this.setState({
                forked: true
            })
        }
        this.setState({
            isLoading: false,
            userName,
            userProfile,
            userRepos,
        })
    }

    async fetchCurrentUserProfile(userName) {
        const req = await fetch(`${config.apiUrl.base}${userName}`)
        const userProfile = await req.json()

        return userProfile
    }

    async fetchCurrentUserRepos(userName) {
        const req = await fetch(`${config.apiUrl.base}${userName}/${config.apiUrl.current}`)
        const userRepos = await req.json()

        return userRepos
    }

    render() {
        const { isLoading, userProfile, userRepos, userName, forked } = this.state
        return (
            <div className="wrapper">
                { !isLoading && !userProfile &&
                    <div className="searchbar-wrapper">
                        <Searchform
                            handleSubmit={this.handleSubmit}
                            userName={userName}
                        />
                        <div>f:{forked.toString()}</div>
                    </div>
                }
                { isLoading && <p className="searchbar-wrapper">Fetching user ...</p> }
                { !isLoading && userProfile && !userProfile.id &&
                    <div className="searchbar-wrapper">User not found <span className="btn-back" onClick={() => this.clearData()}>Back</span></div>
                }
                { !isLoading && userProfile && userProfile.id &&
                    <div id="panel-left">
                        {/* <span className="btn-back" onClick={() => this.clearData()}>Back</span> */}
                        <UserProfile 
                            userProfile={userProfile}
                        />
                    </div>
                }
                { !isLoading && userRepos && userProfile.id &&
                    <div id="panel-right">
                        <UserRepos
                            userRepos={userRepos}
                            forked={forked}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default App