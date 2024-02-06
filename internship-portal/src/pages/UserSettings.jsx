import React from 'react';
import Nav from '../components/Nav';
import './UserSettings.css';
import { IoMdSettings } from "react-icons/io";

const UserSettings = () => {
  return (
    <div className='user-settings'>
      <header>
          <Nav />
      </header>
      <div className="setting-card">
        <div className="settings-container">
          <div className="row">
            <h1>Settings</h1>
            <IoMdSettings className='setting-icon'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSettings