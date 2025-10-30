import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { setHP, setOriginalCurrentHp } from '../../../store/characters'
import { clearCurrentScene, getCurrentScene } from '../../../store/scenes'
import Health from '../../Tests/TestDummyHp'

import "./Scene.css"

function Scene() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const param = useParams()
    const [sceneLoaded, setSceneLoaded] = useState(false)
    const [sceneChange, setSceneChange] = useState(false)
    const [charHidden, setCharHidden] = useState(false)
    // const [first, setFirst] = useState(false)
    // const [showReqs, setShowReqs] = useState(0)

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
    //     return (<Navigate to="/" replace />)
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
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '1'
        }, 1500)
    }, [scene])

    useEffect(() => {
        dispatch(setHP(HP))
        dispatch(clearCurrentScene())
        dispatch(getCurrentScene(parseInt(param.sceneId))).then(() => setSceneLoaded(true))
        setSceneChange(false)
    }, [dispatch, sceneChange, HP, param.sceneId])

    useEffect(() => {
        if (currentHP && !currentHP.length) {
            dispatch(setOriginalCurrentHp(maxHealth()))
        }
    }, [dispatch])

    // useEffect(() => {
    //     console.log(showReqs)
    // })

    if (!selectedCharacter) {
        return <Navigate to="/" replace />
    }

    const handleGameOverTransition = () => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '0'
        }, 0)
        setTimeout(() => {
            navigate('/home')
        }, 1000)
    }

    const showCharacter = () => {
        const charInfo = document.querySelector('.char_info_container');
        setCharHidden(!charHidden);
        if (charHidden) {
            charInfo.className = 'hidden char_info_container'
        }
        else {
            charInfo.className = 'char_info_container'
        }
    }

    if (currentHP <= 0) {
        return sceneLoaded && (
            <div className='scene_gameover_container'>
                <div className='scene_body_container'>
                    {/* <img alt='unsure'></img> */}
                    <div>Unfortunately, your wounds are too much to sustain your life, and you fall to the floor, dead.</div>
                </div>
                <div>
                    <div className='link' onClick={handleGameOverTransition}>
                        <h2 className='scene_choice gameover'>Game Over</h2>
                    </div>
                </div>
            </div>
        )
    }

    let i = 0;

    return sceneLoaded && (
        <div className='scene_greater_container'>
            <div className='image_container'></div>
            <div className='health_outer'>
                <Health />
            </div>
            <div className='character_outer'>
                <button onClick={showCharacter}>Character</button>
                <div className='hidden char_info_container'>
                    <div className='character_info_singular'>
                        <div>Name:</div>
                        <div>{selectedCharacter.name}</div>
                    </div>
                    <div className='character_info_singular'>
                        <div>Class:</div>
                        <div>{selectedCharacter.class}</div>
                    </div>
                    <div className='character_info_singular'>
                        <div>Strength:</div>
                        <div>{selectedCharacter.strength}</div>
                    </div>
                    <div className='character_info_singular'>
                        <div>Dexterity:</div>
                        <div>{selectedCharacter.dexterity}</div>
                    </div>
                    <div className='character_info_singular'>
                        <div>Constitution:</div>
                        <div>{selectedCharacter.constitution}</div>
                    </div>
                    <div className='character_info_singular'>
                        <div>Intelligence:</div>
                        <div>{selectedCharacter.intelligence}</div>
                    </div>
                    <div className='character_info_singular'>
                        <div>Wisdom:</div>
                        <div>{selectedCharacter.wisdom}</div>
                    </div>
                    <div className='character_info_singular'>
                        <div>Charisma:</div>
                        <div>{selectedCharacter.charisma}</div>
                    </div>
                </div>
            </div>
            {/* <div className='scene_display_instructions' onClick={e => setHidden(!hidden)}> Help
                        <div id='instructions_container_1' className='instructions_container'>
                    <div id='instructions_1' className='hidden'>To add a scene, click the button at the top right.</div>
                    <div id='instructions_2' className='hidden'>To delete a scene, click the x.</div>
                    <div id='instructions_3' className='hidden'>To switch between scenes, simply click on them.</div>
                </div>
            </div> */}
            <div className='scene_container_sans_health'>
                <div className='scene_container'>
                    <div className='scene_filler'></div>
                    <div className='scene_filler'></div>
                    <div className='scene_title_body_container'>
                        <div className='scene_title'>{scene.title}</div>
                        <div className='scene_body_container'>
                            {/* <img alt='unsure'></img> */}
                            <div className='scene_body'>{scene.body}</div>
                        </div>
                    </div>
                    <div className='scene_choices_container'>
                        {/* <h2>Choices: </h2> */}
                        {choicesArr && choicesArr.length ? choicesArr.map(choice => {

                            // Gives each choice the transition
                            const handleClickTransition = () => {
                                const pageTransition = document.querySelector('.page_transition')
                                setTimeout(() => {
                                    pageTransition.style.opacity = '0'
                                }, 0)
                                setTimeout(() => {
                                    navigate(`/stories/${scene.storyId}/${choice.nextSceneId}`)
                                }, 1000)
                            }

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
                                i++
                                return (
                                    <div className='choice_and_reqs'>
                                        <div key={i} className='link' onClick={handleClickTransition}>
                                            <div onClick={() => {
                                                currentHealth(currentHP, choice.changeHealth)
                                                setSceneChange(true)
                                            }}
                                                className='scene_choice'
                                            >
                                                {choice.body}
                                            </div>
                                        </div>
                                        <div>
                                            {/* <div value={i} onClick={e => {
                                                // Grabs the outerHTML of this, splits it on all ", grabs the second element (the value), turns it from a string into an integer
                                                // DO NOT PUT ANYTHING BEFORE VALUE! EVERYTHING HAS TO COME AFTER!
                                                const value = parseInt(e.target.outerHTML.split('"')[1])
                                                setShowReqs(value)
                                            }} className='requirements_click'>Requirements</div> */}
                                            <div className={`story_reqs_container story_reqs_container_${i}`}>
                                                {str > 1 || dex > 1 || con > 1 ?
                                                    <div>
                                                        {str > 1 ? <div>str: {str}</div> : null}
                                                        {dex > 1 ? <div>dex: {dex}</div> : null}
                                                        {con > 1 ? <div>con: {con}</div> : null}
                                                    </div>
                                                    : null
                                                }
                                                {int > 1 || wis > 1 || cha > 1 ?
                                                    <div>
                                                        {int > 1 ? <div>int: {int}</div> : null}
                                                        {wis > 1 ? <div>wis: {wis}</div> : null}
                                                        {cha > 1 ? <div>cha: {cha}</div> : null}
                                                    </div>
                                                    : null
                                                }

                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                i++
                                return (
                                    <div className='choice_and_reqs'>
                                        <div key={i} className='scene_choice'>
                                            {choice.body}
                                        </div>
                                        <div>
                                            {/* <div value={i} onClick={e => {
                                                // Grabs the outerHTML of this, splits it on all ", grabs the second element (the value), turns it from a string into an integer
                                                // DO NOT PUT ANYTHING BEFORE VALUE! EVERYTHING HAS TO COME AFTER!
                                                const value = parseInt(e.target.outerHTML.split('"')[1])
                                                setShowReqs(value)
                                            }} className='requirements_click'>Requirements</div> */}
                                            <div className={`story_reqs_container story_reqs_container_${i}`}>
                                                {str > 1 || dex > 1 || con > 1 ?
                                                    <div>
                                                        {str > 1 ? <div>str: {str}</div> : null}
                                                        {dex > 1 ? <div>dex: {dex}</div> : null}
                                                        {con > 1 ? <div>con: {con}</div> : null}
                                                    </div>
                                                    : null
                                                }
                                                {int > 1 || wis > 1 || cha > 1 ?
                                                    <div>
                                                        {int > 1 ? <div>int: {int}</div> : null}
                                                        {wis > 1 ? <div>wis: {wis}</div> : null}
                                                        {cha > 1 ? <div>cha: {cha}</div> : null}
                                                    </div>
                                                    : null
                                                }

                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                            :
                            <div>
                                {scene.body ?
                                    <div onClick={handleGameOverTransition} className='link'>
                                        <h2 className='scene_choice'>
                                            Game Over.
                        </h2>
                                    </div>
                                    :
                                    null
                                }

                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Scene
