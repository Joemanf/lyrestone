import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHP } from '../../store/characters';

import './Health.css'

export default function Health() {
    const dispatch = useDispatch()

    //Get and set the original state to the current HP
    const currentHP = useSelector(state => state.characters.currentHP)
    const [HP, makeHP] = useState(currentHP)

    // Grab the selected character
    const selectedCharacterTemp = useSelector(state => state.characters.selectedChar)
    let characterId;
    for (let key in selectedCharacterTemp) {
        characterId = key;
    }
    const selectedCharacter = selectedCharacterTemp[characterId];

    // Grab the max health
    const maxHealth = () => {
        if (selectedCharacter) {
            return selectedCharacter.constitution + 10
        }
    }

    // Update the HP every time currentHP changes
    useEffect(() => {
        makeHP(currentHP)
        dispatch(setHP(HP))
    }, [dispatch, HP, currentHP])
    return (
        <>
            <div>Health: {HP} / {maxHealth()}</div>
        </>
    )
}