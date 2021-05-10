import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import { setHP, setOriginalCurrentHp } from '../../../store/characters'
import { clearCurrentScene, getCurrentScene } from '../../../store/scenes'
import Health from '../../Tests/TestDummyHp'

function Scene() {
    const dispatch = useDispatch()
    const param = useParams()
    const [sceneLoaded, setSceneLoaded] = useState(false)
    const [sceneChange, setSceneChange] = useState(false)

    const currentHP = useSelector(state => state.characters.currentHP)
    const [HP, makeHP] = useState(currentHP)

    const selectedCharacterTemp = useSelector(state => state.characters.selectedChar)
    const scene = useSelector(state => state.scenes.currentScene)

    let characterId;
    for (let key in selectedCharacterTemp) {
        characterId = key;
    }
    const selectedCharacter = selectedCharacterTemp[characterId];

    // if (!selectedCharacter) {
    //     return (<Redirect to='/' />)
    // }

    const choicesArr = scene.Choices;

    const maxHealth = () => {
        if (selectedCharacter) {
            return selectedCharacter.constitution + 10
        }
    }

    const currentHealth = (health, changer) => {
        const newHealth = health + changer;
        makeHP(newHealth)
    }

    useEffect(() => {
        dispatch(setHP(HP))
        dispatch(clearCurrentScene())
        dispatch(getCurrentScene(parseInt(param.sceneId))).then(() => setSceneLoaded(true))
        setSceneChange(false)
    }, [dispatch, sceneChange, HP])

    useEffect(() => {
        if (currentHP && !currentHP.length) {
            dispatch(setOriginalCurrentHp(maxHealth()))
        }
    }, [dispatch])

    if (!selectedCharacter) {
        return <Redirect to='/' />
    }

    if (currentHP <= 0) {
        return sceneLoaded && (
            <div>
                <div>
                    <img></img>
                    <div>Unfortunately, your wounds are too much to sustain your life, and you fall to the floor, dead.</div>
                </div>
                <div>
                    <Link to='/home'>
                        <h2>Game Over</h2>
                    </Link>
                </div>
            </div>
        )
    }

    return sceneLoaded && (
        <div>
            <Health />
            <div>{scene.title}</div>
            <div>
                <img></img>
                <div>{scene.body}</div>
            </div>
            <div>
                <h2>Choices: </h2>
                {choicesArr && choicesArr.length ? choicesArr.map(choice => {
                    const conditionalsArr = choice.conditionals.split('')
                    const str = parseInt(conditionalsArr[0]);
                    const dex = parseInt(conditionalsArr[1]);
                    const con = parseInt(conditionalsArr[2]);
                    const int = parseInt(conditionalsArr[3]);
                    const wis = parseInt(conditionalsArr[4]);
                    const cha = parseInt(conditionalsArr[5]);
                    if (
                        selectedCharacter.strength >= str &&
                        selectedCharacter.dexterity >= dex &&
                        selectedCharacter.constitution >= con &&
                        selectedCharacter.intelligence >= int &&
                        selectedCharacter.wisdom >= wis &&
                        selectedCharacter.charisma >= cha
                    ) {
                        return (
                            <Link key={choice.id} to={`/stories/${scene.storyId}/${choice.nextSceneId}`}>
                                <div onClick={() => {
                                    currentHealth(currentHP, choice.changeHealth)
                                    setSceneChange(true)
                                }}>
                                    {choice.body}
                                </div>
                            </Link>
                        )
                    } else {
                        return (
                            <div>
                                {choice.body}
                            </div>
                        )
                    }
                })
                    :
                    <Link to='/home'>
                        <h2>
                            Game Over.
                        </h2>
                    </Link>
                }
            </div>
        </div >
    )
}

export default Scene
