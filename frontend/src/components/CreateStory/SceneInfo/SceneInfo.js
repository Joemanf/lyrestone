import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getParents, updateScene } from '../../../store/scenes';

import './SceneInfo.css';

function ScenesInfo({
    currentScene, infoErrors, setInfoErrors,
    // title, body, backgroundImage,
    // victory, kill, health,
    // strength, dexterity, constitution,
    // intelligence, wisdom, charisma
}) {
    const dispatch = useDispatch()

    const parentsArr = useSelector(state => state.scenes.parents)

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
    // useStates below have to do with parent
    const [victory, setVictory] = useState(stateChoice ? stateChoice.isWinning : false);
    const [kill, setKill] = useState(stateChoice ? stateChoice.killsPlayer : false);
    const [health, setHealth] = useState(stateChoice ? stateChoice.changeHealth : 0);
    const [strength, setStrength] = useState(tempStr ? tempStr : 1);
    const [dexterity, setDexterity] = useState(tempDex ? tempDex : 1);
    const [constitution, setConstitution] = useState(tempCon ? tempCon : 1);
    const [intelligence, setIntelligence] = useState(tempInt ? tempInt : 1);
    const [wisdom, setWisdom] = useState(tempWis ? tempWis : 1);
    const [charisma, setCharisma] = useState(tempCha ? tempCha : 1);
    // const [conditionsLoaded, setConditionsLoaded] = useState(false)


    useEffect(() => {
        setTitle(currentScene.title ? currentScene.title : '')
        setBody(currentScene.body ? currentScene.body : '')
        setBackgroundImage(currentScene.backgroundImage ? currentScene.backgroundImage : '')
        setVictory(stateChoice ? stateChoice.isWinning : false)
        setKill(stateChoice ? stateChoice.killsPlayer : false)
        setHealth(stateChoice ? stateChoice.changeHealth : 0)
        setStrength(tempStr)
        setDexterity(tempDex)
        setConstitution(tempCon)
        setIntelligence(tempInt)
        setWisdom(tempWis)
        setCharisma(tempCha)
    }, [currentScene, parentsArr, tempStr, tempDex, tempCon, tempInt, tempWis, tempCha, stateChoice])

    const handleSubmit = (e) => {
        e.preventDefault()
        setInfoErrors([])
        const unvalidated = [];
        if (title.length > 100) {
            unvalidated.push('Title must be 100 characters or less.')
        }
        if (title.length === 0) {
            unvalidated.push('Title must not be empty')
        }
        if (body.length === 0) {
            unvalidated.push("Body must not be empty")
        }
        if (currentScene.root) {
            if (
                strength !== 1 ||
                dexterity !== 1 ||
                constitution !== 1 ||
                intelligence !== 1 ||
                wisdom !== 1 ||
                charisma !== 1 ||
                health !== 0
            ) {
                unvalidated.push("Only change the title and body in the root scene")
            }
        }
        if (!currentScene.root) {
            if (strength > 9 || strength < 1) {
                unvalidated.push('Strength must be between 1 and 9')
            }
            if (dexterity > 9 || dexterity < 1) {
                unvalidated.push('Dexterity must be between 1 and 9')
            }
            if (constitution > 9 || constitution < 1) {
                unvalidated.push('Constitution must be between 1 and 9')
            }
            if (intelligence > 9 || intelligence < 1) {
                unvalidated.push('Intelligence must be between 1 and 9')
            }
            if (wisdom > 9 || wisdom < 1) {
                unvalidated.push('Wisdom must be between 1 and 9')
            }
            if (charisma > 9 || charisma < 1) {
                unvalidated.push('Charisma must be between 1 and 9')
            }
        }
        setInfoErrors(unvalidated)
        if (!unvalidated.length) {
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
            else { // else it's the root scene, and no conditionals should be changed
                dispatch(updateScene(
                    currentScene.id,
                    0,
                    currentScene.root,
                    title,
                    body,
                    backgroundImage,
                ))
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {infoErrors.map(err => (
                    <div required={true} key={err}>{err}</div>
                ))}
            </div>
            <div>
                <label>Title</label>
                <input type='text' required={true} value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Body</label>
                <textarea value={body} onChange={e => setBody(e.target.value)} />
            </div>
            <div className='other_options'>
                <div>
                    {/* <div>
                        <label>Background Image</label>
                        <input type='file' value={backgroundImage} onChange={e => setBackgroundImage(e.target.value)} />
                    </div> */}
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
                        <input type='number' disabled={currentScene.root ? true : false} value={health} onChange={e => setHealth(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Strength?</label>
                        <input type='number' disabled={currentScene.root ? true : false} min={1} max={9} value={strength} onChange={e => setStrength(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Dexerity?</label>
                        <input type='number' disabled={currentScene.root ? true : false} min={1} max={9} value={dexterity} onChange={e => setDexterity(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Constitution?</label>
                        <input type='number' disabled={currentScene.root ? true : false} min={1} max={9} value={constitution} onChange={e => setConstitution(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Intelligence?</label>
                        <input type='number' disabled={currentScene.root ? true : false} min={1} max={9} value={intelligence} onChange={e => setIntelligence(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Wisdom?</label>
                        <input type='number' disabled={currentScene.root ? true : false} min={1} max={9} value={wisdom} onChange={e => setWisdom(parseInt(e.target.value))} />
                    </div>
                    <div>
                        <label>Charisma?</label>
                        <input type='number' disabled={currentScene.root ? true : false} min={1} max={9} value={charisma} onChange={e => setCharisma(parseInt(e.target.value))} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ScenesInfo