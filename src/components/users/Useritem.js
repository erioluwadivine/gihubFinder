import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
export const Useritem = ({ user: { login, avatar_url, html_url } }) => {
    return (
        <div className="card text-center">
            <img src={avatar_url} className="round-img" alt="" style={{ width: '60px' }} />
            <div>
                <h4>{login}</h4>
                <Link to={`/user/${login}`} className="my-1 btn btn-dark btn-sm" >More </Link>
            </div>
        </div>
    )
}
Useritem.propTypes = {
    user: propTypes.object.isRequired
};
export default Useritem
