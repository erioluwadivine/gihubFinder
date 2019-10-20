import React, { useState } from 'react'
import propTypes from 'prop-types'
import GithubContext from '../../context/github/githubContext'

const Search = ({ showClear, clearUsers, setAlert }) => {
    const githubContext = useContext(GithubContext);

    const [text, setText] = useState('');

    const onChange = e => setText(e.target.value);
    const onSubmit = e => {
        e.preventDefault();
        if (text === "") {
            setAlert("please enter something", "light")
        } else {
            searchUsers(text)
            setText('')
        }

    }



    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" placeholder="search users..." value={text} onChange={onChange} />
                <input type="submit" value="Search" className="btn btn-block btn-dark" />
            </form>
            {showClear &&
                <button className="btn btn-light btn-block" onClick={clearUsers}>
                    clear
            </button>}

        </div>
    )

}
Search.PropTypes = {
    clearUsers: propTypes.func.isRequired,
    showClear: propTypes.bool.isRequired,
    setAlert: propTypes.func.isRequired
}
export default Search
