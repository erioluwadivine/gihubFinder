import React, { Fragment, useState } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Alert from './components/layout/Alert';
import About from './components/Pages/About';
import GithubState from './context/github/GithubState';
import GithubReducer from './context/github/githubReducer';
const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    searchUsers(res.data);
    setLoading(false);
  }

  const getUser = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }

  //get User repos
  const getUserRepos = async username => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);

  }

  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }
  const showAlert = (msg, type) => {
    setAlert({ msg, type });

    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <GithubState>
      <Router>
        <div className="App ">
          <i className="" />
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={searchUsers} clearUsers={clearUsers} setAlert={showAlert} showClear={users.length > 0 ? true
                    : false} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />

              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading} />)} />
            </Switch>

          </div>

        </div>
      </Router>
    </GithubState>
  );

}

export default App;
