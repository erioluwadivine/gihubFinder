import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const User = ({ user, loading, getUser, getUserRepos, repos, match }) => {
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    }, [])

    const {
        name, avatar_url, location, bio, html_url, followers, following, public_repos, public_gists, hireable } = user;
    if (loading) {
        return <Spinner />
    }
    return <Fragment>
        <Link to="/" className="btn btn-light">
            Back to search
            </Link>
        Hirable : {' '}
        {hireable ? <i className='fas text-success fa-check' /> : <i className='fas text-danger fa-times-circle' />}
        <div className="card grid-2">
            <div className="all-center">
                <img className="round-img" src={avatar_url} alt="" style={{ width: "150px" }} />
            </div>
            <h1>{name}</h1>
            <p>Location:{location}</p>
            {bio && (
                <Fragment>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">Visit Github profile</a>
        </div>
        <div className="card text-center">
            <div className="badge badge-primary">Followers:{followers}</div>
            <div className="badge badge-success">Following:{following}</div>
            <div className="badge badge-danger">Public Repos:{public_repos}</div>
            <div className="badge badge-dark">Public Gists:{public_gists}</div>
        </div>
        <Repos repos={repos} />
    </Fragment>;
}
User.propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
};
export default User;
