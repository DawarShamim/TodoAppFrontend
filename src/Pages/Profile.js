import React from 'react';
import './profile.css';
import Modalbox from '../components/modalbox';
import Navbar from '../components/NavBar';
import ProfileCard from '../components/ProfileCard';

function ProfilePage() {
  // Sample profile data
  const email = 'example@example.com';
  const phoneno = 'example_user';

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
        <ProfileCard _name={"DAWar"} _email={email} _phoneno={phoneno} _birthday={"dsagv"} />
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
