import React from 'react'
import { auth, provider } from '../config/firebase.js'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext';

const Auth = () => {

    const { setUserName } = useUser();

    const signInWithGoogle = async () => {
        const results = await signInWithPopup(auth, provider);
        console.log(results)
        setUserName(results.user.displayName);
    };

  return (
    <button
        className='sign-up'
          onClick={signInWithGoogle}
        >
          Sign in with Google
    </button>
  )
}

export default Auth
