import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../reducer/Actions'; // Adjust the path accordingly

const Profile = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth); // Get the full 'auth' object

    useEffect(() => {
        if (!auth || !auth.user) {
            dispatch(getUser());  // Fetch user if not already available
        }
    }, [dispatch, auth]);

    if (!auth || !auth.user) {
        return <div>Loading...</div>;  // Optionally display loading state
    }

    return (
        <div>
            <h1 className='text-center text-danger'>Profile Page</h1>
            <div>
                <p><strong>First Name:</strong> {auth.user.first_name}</p>
                <p><strong>Last Name:</strong> {auth.user.last_name}</p>
                <p><strong>Email:</strong> {auth.user.email}</p>
            </div>
        </div>
    );
};

export default Profile;
