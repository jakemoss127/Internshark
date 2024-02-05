import React, { useEffect, useContext } from "react";
import { UserAuth } from '../context/AuthContext.jsx';

const Auth = () => {
  const { user, googleSignIn, logOut } = UserAuth();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log("Error during sign-in:", err.message);
    }
  };


  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log("Error during sign-out:", err.message);
    }
  };

  return (
    <button className='sign-up' onClick={handleSignIn}>
      Sign in with Google
    </button>
  );
};

export default Auth;
