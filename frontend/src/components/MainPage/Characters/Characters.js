import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedCharacter, getAllUserCharacters, selectACharacter } from '../../../store/characters';
import * as sessionActions from '../../../store/session';
// import { Link } from 'react-router-dom';
// import { getAllStories } from '../../../store/stories';

import './Characters.css'

function Characters() {
    const dispatch = useDispatch()

    const [selected, setSelected] = useState(0)

    const user = useSelector(state => state.session.user)
    const characters = useSelector(state => state.characters.characters)

    const charactersArr = []
    for (let key in characters) {
        charactersArr.push(characters[key])
    }

    // useEffect(() => {
    //     dispatch(getAllUserCharacters())
    // }, [dispatch])

    const selectCharacter = (characterId) => {
        dispatch(clearSelectedCharacter())
        setSelected(characterId)
        dispatch(selectACharacter(characters[characterId]))
    }

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div className='characters_container'>
                <div className='character_header'>
                    <h2>
                        Characters:
                </h2>
                    <button className='button_disabled' disabled={true}>Add a character</button>
                </div>
                <div className='main_characters_container'>
                    {charactersArr.map(character => (
                        <div key={character.id} className='character_container_greater'>
                            {character.id === selected ?
                                <div
                                    className='character_container selected'
                                    value={character.id}
                                    onClick={e => selectCharacter(character.id)}
                                >
                                    <div className='character_name_class'>
                                        <div>view</div>
                                        <h3 className='character_name'>{character.name}</h3>
                                        <div className='character_class'>{character.class}</div>
                                    </div>
                                    <div className='character_img_container'>
                                        <img src={character.avatar} alt={character.name} className='character_img'></img>
                                    </div>
                                </div>
                                :
                                <div
                                    className='character_container'
                                    value={character.id}
                                    onClick={e => selectCharacter(character.id)}
                                >
                                    <div className='character_name_class'>
                                        <div>view</div>
                                        <h3 className='character_name'>{character.name}</h3>
                                        <div className='character_class'>{character.class}</div>
                                    </div>
                                    <div className='character_img_container'>
                                        <img src={character.avatar} alt={character.name} className='character_img'></img>
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
                <div className='user_bar'>
                    <div>{user.username}</div>
                    <button onClick={logout}>Log Out</button>
                </div>
            </div>
        </>
    )
}

export default Characters