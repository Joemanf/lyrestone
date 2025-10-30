import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { clearSelectedCharacter, selectACharacter } from '../../../store/characters';
import * as sessionActions from '../../../store/session';

import './Characters.css'

function Characters() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [selected, setSelected] = useState(0)
    const [charHidden, setCharHidden] = useState(false)

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

    const handleLogoutTransition = () => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '0'
        }, 0)
        setTimeout(() => {
            navigate('/');
        }, 1000)
    }

    const showCharacter = (characterId) => {
        const charInfo = document.querySelector(`#main_page_char_${characterId}`);
        setCharHidden(!charHidden);
        if (charHidden) {
            charInfo.className = 'hidden char_info_container_characters'
        }
        else {
            charInfo.className = 'char_info_container_characters'
        }
    }

    const logout = (e) => {
        e.preventDefault();
        handleLogoutTransition()
        setTimeout(() => {
            dispatch(sessionActions.logout());
        }, 1000)
    };

    return (
        <>
            <div className='characters_container'>
                <div className='character_header'>
                    <h2>
                        Characters:
                    </h2>
                    {/* <button className='button_disabled' disabled={true}>Add a character</button> */}
                </div>
                <div className='main_characters_container'>
                    <div>
                        {charactersArr.map(character => (
                            <div key={character.id} className='character_container_greater'>
                                {character.id === selected ?
                                    <div
                                        className='selected'
                                        value={character.id}
                                        onClick={e => selectCharacter(character.id)}
                                    >
                                        <div className='character_name_class'>
                                            <div className='view_outer' >
                                                <div onClick={e => showCharacter(character.id)}>view</div>
                                                <div id={`main_page_char_${character.id}`} className='hidden char_info_container_characters'>
                                                    <div className='character_info_singular'>
                                                        <div>Name:</div>
                                                        <div>{character.name}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Class:</div>
                                                        <div>{character.class}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Strength:</div>
                                                        <div>{character.strength}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Dexterity:</div>
                                                        <div>{character.dexterity}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Constitution:</div>
                                                        <div>{character.constitution}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Intelligence:</div>
                                                        <div>{character.intelligence}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Wisdom:</div>
                                                        <div>{character.wisdom}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Charisma:</div>
                                                        <div>{character.charisma}</div>
                                                    </div>
                                                </div>
                                            </div>
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
                                            <div className='view_outer'>
                                                <div onClick={e => showCharacter(character.id)}>view</div>
                                                <div id={`main_page_char_${character.id}`} className='hidden char_info_container_characters'>
                                                    <div className='character_info_singular'>
                                                        <div>Name:</div>
                                                        <div>{character.name}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Class:</div>
                                                        <div>{character.class}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Strength:</div>
                                                        <div>{character.strength}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Dexterity:</div>
                                                        <div>{character.dexterity}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Constitution:</div>
                                                        <div>{character.constitution}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Intelligence:</div>
                                                        <div>{character.intelligence}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Wisdom:</div>
                                                        <div>{character.wisdom}</div>
                                                    </div>
                                                    <div className='character_info_singular'>
                                                        <div>Charisma:</div>
                                                        <div>{character.charisma}</div>
                                                    </div>
                                                </div>
                                            </div>
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
                </div>
                <div className='user_bar'>
                    <div className='user_section'>
                        <img className='user_profile_picture' alt='user avatar' src={user.avatar} />
                        <div>{user.username}</div>
                    </div>
                    <button onClick={logout}>Log Out</button>
                </div>
            </div>
        </>
    )
}

export default Characters