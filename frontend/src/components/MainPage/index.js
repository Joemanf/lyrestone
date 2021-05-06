import React, { useState, useEffect } from 'react';
import Characters from './Characters/Characters'
import Stories from './Stories/Stories'

import './MainPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { getAllStories } from '../../store/stories';
import { getAllUserCharacters } from '../../store/characters';

function MainPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user); // Grabbing logged in user
    const [isStoriesLoaded, setIsStoriesLoaded] = useState(false);
    const [isCharactersLoaded, setIsCharactersLoaded] = useState(false);

    useEffect(() => {
        dispatch(getAllStories()).then(() => setIsStoriesLoaded(true))
        dispatch(getAllUserCharacters()).then(() => setIsCharactersLoaded(true))
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/" />;

    return isStoriesLoaded && isCharactersLoaded && (
        <div className='greater_border'>
            <Characters />
            <Stories />
        </div>
    )
}

export default MainPage