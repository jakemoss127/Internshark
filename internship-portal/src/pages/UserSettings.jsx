import React from 'react';
import Nav from '../components/Nav';
import './UserSettings.css';

const UserSettings = () => {
  return (
    <div className='user-settings'>
        <header>
            <Nav />
        </header>
        <main>
            <div className="settings-container">
                <h1>Profile</h1>
            </div>
        </main>
    </div>
  )
}

export default UserSettings