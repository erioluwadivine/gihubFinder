import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import Githubreducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    // SET_ALERT,
    // REMOVE_ALERT
} from '../types';
const GithubState = (props) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        searchUsers
    }
    const [state, dispatch] = useReducer(Githubreducer, initialState);
    //search users
    const searchUsers = async text => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
        dispatch({type: SET_LOADING,
        payload : res.data
        })
    }

    //set loading
    const setLoading = () => {
        dispatch({ type: SET_LOADING })
    }
    return (<GithubContext.Provider
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading
        }}
    >
        {props.children}
    </GithubContext.Provider  >)
}

export default GithubState;