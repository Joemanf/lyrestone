import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Splash.css'
import logo from '../../images/lyrestone.png'


function Splash() {
    const sessionUser = useSelector((state) => state.session.user); // Grabbing logged in user

    if (sessionUser) return <Redirect to="/home" />; // Change to history.push might fix the store

    return (
        <div className='wrap'>
            <div className='logo_links_container'>
                <div className='logo_container'>
                    <div className='logo_container_inner'>
                        <img src={logo} alt='lyrestone logo' className='logo_image'></img>
                    </div>
                    <h1 className='logo_text'>Lyrestone</h1>
                </div>
                <div className='links'>
                    <NavLink to='/login'>Log In</NavLink>
                    <NavLink to='/signup'>Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Splash