import React from 'react'

const Searchform = ({ handleSubmit, userName }) => (
    <form onSubmit={handleSubmit}>
        <input
            type="text" 
            className="searchbar transparent"
            id="search"
            placeholder={userName ? userName : 'enter username'}
            name="userName"
        />
        <input className="button" id="button" type="submit" value="Go" />
        <div>Show only owned repositories <input type="checkbox" name="forked"/></div>
    </form>
)

export default Searchform