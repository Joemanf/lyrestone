import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { csrfFetch } from '../../../store/csrf';
import { getParents, updateScene } from '../../../store/scenes';

import './SceneInfo.css';

function ScenesInfo() {
    const dispatch = useDispatch()

    const currentScene = useSelector(state => state.scenes.currentScene)
    const parentsArr = useSelector(state => state.scenes.parents)
    // const currentChoices = currentScene.Choices

    console.log('The parents?', parentsArr)
    // const filteredArr = []
    // if (parentsArr.length) {
    //     parentsArr.forEach(parent => {
    //         if (parent.nextSceneId === currentScene.id) filteredArr.push(parent)
    //     })
    // }

    let stateChoice;

    // Double loop is ugly, but generally parentsArr will be 1 scene (maybe at worse like... 4 or something)
    if (parentsArr.length) {
        parentsArr.forEach(parent => {
            parent.Choices.forEach(choice => {
                if (currentScene.id === choice.nextSceneId) {
                    stateChoice = choice
                }
            })
        })
    }

    let tempStr;
    let tempDex;
    let tempCon;
    let tempInt;
    let tempWis;
    let tempCha;

    if (stateChoice) {
        let conditionals = stateChoice.conditionals
        tempStr = parseInt(conditionals[0]);
        tempDex = parseInt(conditionals[1]);
        tempCon = parseInt(conditionals[2]);
        tempInt = parseInt(conditionals[3]);
        tempWis = parseInt(conditionals[4]);
        tempCha = parseInt(conditionals[5]);
        if (stateChoice.isWinning === 'true') {
            stateChoice.isWinning = true;
        } else {
            stateChoice.isWinning = false;
        }
        if (stateChoice.killsPlayer === 'true') {
            stateChoice.killsPlayer = true;
        } else {
            stateChoice.killsPlayer = false;
        }
    }
    else {
        tempStr = 1;
        tempDex = 1;
        tempCon = 1;
        tempInt = 1;
        tempWis = 1;
        tempCha = 1;
    }

    // set all of these to the info coming in
    const [title, setTitle] = useState(currentScene.title ? currentScene.title : '');
    const [body, setBody] = useState(currentScene.body ? currentScene.body : '');
    const [backgroundImage, setBackgroundImage] = useState(currentScene.backgroundImage ? currentScene.backgroundImage : '');
    // useStates below have to do with parent, don't test until scene change available
    const [victory, setVictory] = useState(stateChoice ? stateChoice.isWinning : false);
    const [kill, setKill] = useState(stateChoice ? stateChoice.killsPlayer : false);
    const [health, setHealth] = useState(stateChoice ? stateChoice.changeHealth : 0);
    const [strength, setStrength] = useState(tempStr ? tempStr : 1);
    const [dexterity, setDexterity] = useState(tempDex ? tempDex : 1);
    const [constitution, setConstitution] = useState(tempCon ? tempCon : 1);
    const [intelligence, setIntelligence] = useState(tempInt ? tempInt : 1);
    const [wisdom, setWisdom] = useState(tempWis ? tempWis : 1);
    const [charisma, setCharisma] = useState(tempCha ? tempCha : 1);

    useEffect(() => {
        setTitle(currentScene.title)
        setBody(currentScene.body)
        setBackgroundImage(currentScene.backgroundImage)
        setVictory(stateChoice ? stateChoice.isWinning : false)
        setKill(stateChoice ? stateChoice.killsPlayer : false)
        setHealth(stateChoice ? stateChoice.changeHealth : 0)
        setStrength(tempStr)
        setDexterity(tempDex)
        setConstitution(tempCon)
        setIntelligence(tempInt)
        setWisdom(tempWis)
        setCharisma(tempCha)
    }, [currentScene])

    const handleSubmit = (e) => {
        e.preventDefault()
        // const validated = [];
        // if (title !== undefined) {
        //     validated.push(title)
        // }
        // if (body !== undefined) {
        //     validated.push(body)
        // }
        // if (backgroundImage !== undefined) {
        //     validated.push(backgroundImage)
        // }
        // if (victory !== undefined) {
        //     validated.push(victory)
        // }
        // if (kill !== undefined) {
        //     validated.push(kill)
        // }
        // if (health !== undefined) {
        //     validated.push(health)
        // }
        // if (strength !== undefined) {
        //     validated.push(strength)
        // }
        // if (dexterity !== undefined) {
        //     validated.push(dexterity)
        // }
        // if (constitution !== undefined) {
        //     validated.push(constitution)
        // }
        // if (intelligence !== undefined) {
        //     validated.push(intelligence)
        // }
        // if (wisdom !== undefined) {
        //     validated.push(wisdom)
        // }
        // if (charisma !== undefined) {
        //     validated.push(charisma)
        // }
        // console.log('Well it has to hit here...', validated)
        dispatch(getParents(currentScene.id))
        if (parentsArr.length) {
            parentsArr.forEach(parent => (
                dispatch(updateScene(
                    currentScene.id,
                    parent.id,
                    currentScene.root,
                    title,
                    body,
                    backgroundImage,
                    victory,
                    kill,
                    health,
                    strength,
                    dexterity,
                    constitution,
                    intelligence,
                    wisdom,
                    charisma
                )))
            )
        }
        else {
            dispatch(updateScene(
                currentScene.id,
                0,
                currentScene.root,
                title,
                body,
                backgroundImage,
                victory,
                kill,
                health,
                strength,
                dexterity,
                constitution,
                intelligence,
                wisdom,
                charisma
            ))
        }
        // takes sceneId, choiceId, and info
        // I need the current scene's ID and the parentScene (choice) ID
    }

    console.log('VICTORY!!!', victory, typeof victory)
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Body</label>
                <textarea value={body} onChange={e => setBody(e.target.value)} />
            </div>
            <div className='other_options'>
                <div>
                    <div>
                        <label>Background Image</label>
                        <input type='file' value={backgroundImage} onChange={e => setBackgroundImage(e.target.value)} />
                    </div>
                    {/* <div>
                        <label>Previous Scene: </label>
                    </div> */}
                    {/* <div>
                        <label>Victory Scene?</label>
                        <input
                            type='checkbox'
                            checked={victory}
                            value={victory}
                            onChange={e => {
                                // console.log(e.target.value, typeof e.target.value)
                                if (e.target.value === 'true') {
                                    setVictory(false)
                                } else {
                                    setVictory(true)
                                }
                            }
                            }
                        />
                    </div> */}
                    {/* <div>
                        <label>Kills player?</label>
                        <input
                            type='checkbox'
                            checked={kill}
                            value={kill}
                            onChange={e => {
                                // console.log(e.target.value, typeof e.target.value)
                                if (e.target.value === 'true') {
                                    setKill(false)
                                } else {
                                    setKill(true)
                                }
                            }}
                        />
                    </div> */}
                    <div>
                        <label>HP Change</label>
                        <input type='number' value={health} onChange={e => setHealth(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Strength?</label>
                        <input type='number' min={1} max={9} value={strength} onChange={e => setStrength(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Dexerity?</label>
                        <input type='number' min={1} max={9} value={dexterity} onChange={e => setDexterity(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Constitution?</label>
                        <input type='number' min={1} max={9} value={constitution} onChange={e => setConstitution(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Intelligence?</label>
                        <input type='number' min={1} max={9} value={intelligence} onChange={e => setIntelligence(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Wisdom?</label>
                        <input type='number' min={1} max={9} value={wisdom} onChange={e => setWisdom(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Charisma?</label>
                        <input type='number' min={1} max={9} value={charisma} onChange={e => setCharisma(parseInt(e.target.value))} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ScenesInfo