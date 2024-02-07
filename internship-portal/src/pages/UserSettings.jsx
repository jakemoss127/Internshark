import React from 'react';
import Nav from '../components/Nav';
import './UserSettings.css';
import { IoMdSettings } from "react-icons/io";
import { UserAuth } from '../context/AuthContext';

const UserSettings = () => {

  const { user } = UserAuth();

  return (
    user ? (
      <div className='user-settings'>
        <header>
          <Nav />
        </header>
        <div className="setting-card">
          <div className="settings-container">
            <div className="row">
              <h1>Settings</h1>
              <IoMdSettings className='setting-icon' />
            </div>
            <div className="row">
              <h2>Name: <span style={{ color: '#327ee2' }}>{user.displayName}</span></h2>
            </div>
            <div className="row">
              <h2>Email: <span style={{ color: '#327ee2' }}>{user.email}</span></h2>
            </div>
            <div className='row'>
              <button>Cancel Subscription</button>
            </div>
          </div>
        </div>
      </div>
    )
    :
    (
      <div style={{fontSize:"4rem", color: 'white'}}>Redirect to home page</div>
    )
  )
}

export default UserSettings