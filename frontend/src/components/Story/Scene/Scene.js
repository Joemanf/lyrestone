import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import { clearCurrentScene, getCurrentScene } from '../../../store/scenes'

function Scene() {
    const dispatch = useDispatch()
    const param = useParams()
    const [sceneLoaded, setSceneLoaded] = useState(false)
    const [sceneChange, setSceneChange] = useState(false)

    console.log('PARAM: ', param)

    const selectedCharacterTemp = useSelector(state => state.characters.selectedChar)
    const scene = useSelector(state => state.scenes.currentScene)

    let characterId;
    for (let key in selectedCharacterTemp) {
        characterId = key;
    }
    const selectedCharacter = selectedCharacterTemp[characterId];
    const choicesArr = scene.Choices;



    useEffect(() => {
        dispatch(clearCurrentScene())
        dispatch(getCurrentScene(parseInt(param.sceneId))).then(() => setSceneLoaded(true))
        setSceneChange(false)
    }, [dispatch, sceneChange])



    if (!selectedCharacter) {
        return <Redirect to='/' />
    }

    return sceneLoaded && (
        <div>
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
                            <Link to={`/stories/${scene.storyId}/${choice.nextSceneId}`}>
                                <div onClick={() => setSceneChange(true)}>
                                    {choice.body}
                                </div>
                            </Link>
                        )
                    } else {
                        return (
                            <div onClick={() => setSceneChange(true)}>
                                {choice.body}
                            </div>
                        )
                    }
                })
                    :
                    <Link to='/home'>
                        <div>
                            Game Over.
                        </div>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Scene