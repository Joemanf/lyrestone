import React from 'react';
import Characters from './Characters/Characters'
import Stories from './Stories/Stories'

import './MainPage.css'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

function MainPage() {
    const sessionUser = useSelector((state) => state.session.user); // Grabbing logged in user

    if (!sessionUser) return <Redirect to="/" />;
    return (
        <div className='greater_border'>
            <Characters />
            <Stories />
        </div>
    )
}

export default MainPage