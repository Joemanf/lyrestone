import React, { useState, useEffect } from 'react';
import Characters from './Characters/Characters'
import Stories from './Stories/Stories'

import './MainPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { getAllStories } from '../../store/stories';
import { clearAllCharacters, getAllUserCharacters, setHP } from '../../store/characters';

function MainPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user); // Grabbing logged in user
    const [isStoriesLoaded, setIsStoriesLoaded] = useState(false);
    const [isCharactersLoaded, setIsCharactersLoaded] = useState(false);

    useEffect(() => {
        dispatch(setHP(1))
        dispatch(clearAllCharacters())
        dispatch(getAllStories()).then(() => setIsStoriesLoaded(true))
        dispatch(getAllUserCharacters()).then(() => setIsCharactersLoaded(true))
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/" />;

    return isStoriesLoaded && isCharactersLoaded && (
        <>
            <div className='greater_border'>
                <Characters />
                <Stories />
            </div>
            {/* {sessionUser.id === 1 ? */}
            <div>
                <div className={'artists_container'}>
                    <p className={'artists_title'}>Like the characters' artists?</p>
                    <a href='https://www.ochrogaster.com/'>Jay Kim's Art</a>
                    <a href='https://joeisdead.com/'>Read "Joe is Dead" by Lev Levinson</a>
                </div>
            </div>
            {/* : null */}
            {/* } */}
        </>
    )
}

export default MainPage