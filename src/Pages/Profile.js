import React, { useState } from 'react';
import './profile.css';
import Modalbox from '../components/modalbox';
import Navbar from '../components/NavBar';
import ProfileCard from '../components/ProfileCard';
import { baseURL, decodeToken, getToken } from '../services/base.services';
import axios from 'axios';

function ProfilePage() {
  // Sample profile data
  const [firstname,setfirstname] = useState('Not Available');
  const [lastname,setlastname]= useState('Not Available');
  const [username,setUsername] = useState('Not Available');
  const [email,setEmail] = useState('Not Available');
  const [birthday,setBirthday]=useState('Not Available');
  const [creationTime,setCreationTime]=useState('Not Available');

  const fetchUserProfile = async () => {
    const authtoken= getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${authtoken}`
      }
    };  
    try {
      const response = await axios.get(`${baseURL}api/User/userProfile`, config);
      const { success, message, user } = response.data;
  
  
      if (success) {
        // Handle successful response
        setfirstname(user.firstName);
        setlastname(user.lastName);
        setEmail(user.email);
        setUsername(user.username);
        const dateOfBirth = new Date(user.dateOfBirth);
        const createdAt = new Date(user.createdAt);
        
        const formattedDateOfBirth = dateOfBirth.toLocaleDateString();
        const formattedCreatedAt = createdAt.toLocaleDateString() + ' ' + createdAt.toLocaleTimeString();
        setBirthday(formattedDateOfBirth);
        setCreationTime(formattedCreatedAt);

      } else {
        // Handle error response
        console.error('Failed to retrieve profile:', message);
      }
    } catch (error) {
      // Handle request error
      console.error('Failed to make the request:', error.message);
    }
  };
  
  fetchUserProfile();
  // Call the function with the desired user ID


  const [showUpdateModal, setShowUpdateModal] = React.useState(false);
  const [showPasswordModal, setShowPasswordModal] = React.useState(false);

  const handleUpdateModalOpen = () => setShowUpdateModal(true);
  const handleUpdateModalClose = () => setShowUpdateModal(false);

  const handlePasswordModalOpen = () => setShowPasswordModal(true);
  const handlePasswordModalClose = () => setShowPasswordModal(false);

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <ProfileCard _firstname={firstname} _lastname={lastname}  _email={email}  _UserName ={username} _birthday={birthday} _time={creationTime} />
      </div>
      <button className="btn" onClick={handleUpdateModalOpen}>
        Update Profile
      </button>
      <button className="btn" onClick={handlePasswordModalOpen}>
        Change Password
      </button>
      <Modalbox title="Update Profile" show={showUpdateModal} onClose={handleUpdateModalClose} type="Profile" />
      <Modalbox title="Change Password" show={showPasswordModal} onClose={handlePasswordModalClose} type="Password"/>
    </>
  );
}

export default ProfilePage;
