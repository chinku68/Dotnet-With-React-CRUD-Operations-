import React from 'react';


const UserProfile = ({ User }) => {
    if (!User) {
        return <div className="user-profile">User data is not available.</div>;
    }

    return (
        <div className="user-profile">
            <div className="input-group">
                <label>User Name:</label>
                <input type="text" value={User.userName || ''} readOnly />
            </div>
            <div className="input-group">
                <label>Email:</label>
                <input type="email" value={User.email || ''} readOnly />
            </div>
            <div className="input-group">
                <label>Phone Number:</label>
                <input type="tel" value={User.phoneNumber || ''} readOnly />
            </div>
            <div className="input-group">
                <label>Status:</label>
                <input type="text" value={User.userStatus === 1 ? 'Active' : 'Inactive'||""} readOnly />
            </div>
            <div className="input-group">
                <label>Type:</label>
                <input type="text" value={User.type || ''} readOnly />
            </div>
            <div className="input-group">
                <label>User Status:</label>
                <input type="text" value={User.userStatus || ''} readOnly />
            </div>
            <div className="input-group">
                <label>User ID:</label>
                <input type="text" value={User.userId || ''} readOnly />
            </div>
            <div className="input-group">
                <label>Created On:</label>
                <input type="text" value={User.createdOn || ''} readOnly />
            </div>
        </div>
    );
};

export default UserProfile;

