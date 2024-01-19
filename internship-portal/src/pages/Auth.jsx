import React, { useRef, useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext.jsx';

const Auth = () => {

  const {user, googleSignIn, logOut} = UserAuth();
  const [loading, setLoading] = useState(true); 

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch(err) {
      console.log(err);
    }
  }

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 50))
        setLoading(false)
    }
    checkAuthentication()
}, [user])

  return (
    <button
        className='sign-up'
          onClick={handleSignIn}
        >
          Sign in with Google
    </button>
  )
}

export default Auth
