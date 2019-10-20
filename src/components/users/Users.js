import React from 'react'
import { Useritem } from "./Useritem";
import propTypes from 'prop-types'
const Users = ({ users, loading }) => {

    return (<div style={userStyle} > {users.map(user => (<Useritem key={user.id} user={user} />))} </div>
    )


}
Users.propTypes = {
    users: propTypes.array.isRequired,
    loading: propTypes.bool.isRequired
}
const userStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1rem"
}

export default Users;