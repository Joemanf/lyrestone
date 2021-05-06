import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserCharacters, selectACharacter } from '../../../store/characters';
// import { Link } from 'react-router-dom';
// import { getAllStories } from '../../../store/stories';

import './Characters.css'

function Characters() {
    const dispatch = useDispatch()

    const [selected, setSelected] = useState(0)

    const characters = useSelector(state => state.characters.characters)

    const charactersArr = []
    for (let key in characters) {
        charactersArr.push(characters[key])
    }

    console.log('SELECTED: ', selected)

    console.log('Wait a second, ', characters, `It's an array`)

    useEffect(() => {
        dispatch(getAllUserCharacters())
    }, [dispatch])

    const selectCharacter = (characterId) => {
        setSelected(characterId)
        console.log(characters[characterId])
        dispatch(selectACharacter(characters[characterId])) // I'm Working here
    }

    return (
        <div className='characters_container'>
            <div className='character_header'>
                <h2>
                    Characters:
                </h2>
                <button disabled={true}>Add a character</button>
            </div>
            <div>
                {charactersArr.map(character => (
                    <div className='character_container_greater'>
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
        </div>
    )
}

export default Characters