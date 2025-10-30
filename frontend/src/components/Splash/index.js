import React, { useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './Splash.css'
import logo from '../../images/lyrestone.png'


function Splash() {
    const sessionUser = useSelector((state) => state.session.user); // Grabbing logged in user
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '1'
        }, 0)
        const text = document.querySelector('.logo_text')
        const image = document.querySelector('.logo_container_inner');
        const links = document.querySelector('.inner_links');
        setTimeout(() => {
            if (text) {
                text.style.top = '0';
                text.style.opacity = '1';
            }
        }, 1000)
        setTimeout(() => {
            if (image) {
                image.style.left = '0';
                image.style.opacity = '1';
            }
            if (links) {
                links.style.bottom = '0';
                links.style.opacity = '1';
            }
        }, 3500)
    }, [])

    const handleLoginTransition = () => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '0'
        }, 0)
        setTimeout(() => {
            navigate('/login')
        }, 1000)
    }

    const handleSignupTransition = () => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '0'
        }, 0)
        setTimeout(() => {
            navigate('/signup')
        }, 1000)
    }

    const loginAsDemo = (e) => {
        return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    }

    if (sessionUser) return <Navigate to="/home" replace />; // Change to navigate might fix the store

    return (
        <div className='wrap'>
            <div className='logo_links_container'>
                <div className='logo_container'>
                    <div className='logo_container_inner'>
                        <img src={logo} alt='lyrestone logo' className='logo_image'></img>
                    </div>
                    <h1 className='logo_text'>Lyrestone</h1>
                </div>
                <div className='inner_links'>
                    <button onClick={handleLoginTransition}>
                        <div>Log In</div>
                    </button>
                    <button onClick={loginAsDemo}>
                        <div className='login_as_demo'>Log In as Demo</div>
                    </button>
                    <button onClick={handleSignupTransition}>
                        <div>Sign Up</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Splash