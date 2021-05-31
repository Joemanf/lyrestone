import React, { useState, useEffect } from 'react';
import Characters from './Characters/Characters'
import Stories from './Stories/Stories'

import './MainPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { clearCurrentStory, clearStories, getAllStories } from '../../store/stories';
import { clearAllCharacters, getAllUserCharacters, setHP } from '../../store/characters';

function MainPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user); // Grabbing logged in user
    const [isStoriesLoaded, setIsStoriesLoaded] = useState(false);
    const [isCharactersLoaded, setIsCharactersLoaded] = useState(false);

    useEffect(() => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '1'
        }, 500)
    }, [])

    useEffect(() => {
        dispatch(setHP(1))
        dispatch(clearAllCharacters())
        dispatch(clearCurrentStory())
        dispatch(clearStories())
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
            <div className='info_artists_container'>
                <div className='info_container'>
                    <p className='info_title'>My links:</p>
                    <a href='https://github.com/Joemanf'>Github</a>
                    <a href='https://www.linkedin.com/in/bryan-thomas-108b891b5/'>Linkedin</a>
                </div>
                <div className={'artists_container'}>
                    <p className={'info_title'}>Like the characters' artists?</p>
                    <a href='https://www.ochrogaster.com/'>Jay Kim's Art</a>
                    <a href='https://joeisdead.com/'>Read "Joe is Dead" by Lev Levinson</a>
                </div>
            </div>
        </>
    )
}

export default MainPage