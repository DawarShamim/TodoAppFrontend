import React from 'react';
import './profile.css';

import Navbar from '../components/NavBar';

function ProfilePage() {
  // Sample profile data
  const email = 'example@example.com';
  const username = 'example_user';

  return (<>
  <Navbar/>
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div>
        <p>Email: {email}</p>
        <p>Username: {username}</p>
      </div>
    </div></>
  );
}

export default ProfilePage;
