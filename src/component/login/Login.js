import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from '../../firebase'

function Login() {

    const signIn = () => {
        //login
        auth.signInWithPopup(provider).catch((error) => alert(error.message))
    }

    return (
        <div className='login'>
            <div className='login__logo'>
                <img src='https://logosmarken.com/wp-content/uploads/2020/11/Discord-Logo.png' alt='Discord logo' />
            </div>
            <Button onClick={signIn}>Sign in</Button>
        </div>
    )
}

export default Login
