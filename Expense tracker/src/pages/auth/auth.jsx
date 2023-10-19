import React from 'react'
import './auth.css'
import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


const Auth = () => {
  const navigate = useNavigate()

  const signInwithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)
    console.log(result)

     const authInfo = {
     name: result.user.displayName,
     userID: result.user.uid,
     profilePhoto: result.user.photoURL,
     isAuth:true,
    }

    localStorage.setItem("auth", JSON.stringify(authInfo))
    navigate("/expense")
  }

  return (
    <div className='login-page'>
        <p>Sign in with google to continue</p>
        <button className='login-with-google-btn' onClick={signInwithGoogle}>Sign in with google</button>
    </div>
  )
}

export default Auth