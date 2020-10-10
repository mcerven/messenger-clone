import { Button } from '@material-ui/core';
import { auth, authProvider } from '../../../firebase';
import React from 'react';
import './Login.css';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(authProvider)
    }

    return (
        <div className="login">
            <img className="login__logo"
                src="https://seeklogo.com/images/F/facebook-messenger-logo-8302F91440-seeklogo.com.png"
                alt="Messenger logo" />
            <button className="login__button" onClick={signIn}>
                Sign In
            </button>
        </div>
    )
}

export default Login
