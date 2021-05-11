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

    // set all of these to the info coming in
    const [title, setTitle] = useState(currentScene.title);
    const [body, setBody] = useState(currentScene.body);
    const [backgroundImage, setBackgroundImage] = useState(currentScene.backgroundImage);
    // useStates below have to do with parent, don't test until scene change available
    const [victory, setVictory] = useState();
    const [kill, setKill] = useState();
    const [health, setHealth] = useState();
    const [strength, setStrength] = useState();
    const [dexterity, setDexterity] = useState();
    const [constitution, setConstitution] = useState();
    const [intelligence, setIntelligence] = useState();
    const [wisdom, setWisdom] = useState();
    const [charisma, setCharisma] = useState();

    useEffect(() => {
        setTitle(currentScene.title)
        setBody(currentScene.body)
        setBackgroundImage(currentScene.backgroundImage)
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
                null,
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
                    <div>
                        <label>Previous Scene: </label>
                    </div>
                    <div>
                        <label>Victory Scene?</label>
                        <input type='checkbox' value={victory} onChange={e => setVictory(!e.target.value)} />
                    </div>
                    <div>
                        <label>Kills player?</label>
                        <input type='checkbox' value={kill} onChange={e => setKill(!e.target.value)} />
                    </div>
                    <div>
                        <label>HP Change</label>
                        <input type='number' value={health} onChange={e => setHealth(e.target.value)} />
                    </div>
                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Strength?</label>
                        <input type='number' defaultValue={1} min={1} max={9} value={strength} onChange={e => setStrength(e.target.value)} />
                    </div>
                    <div>
                        <label>Dexerity?</label>
                        <input type='number' defaultValue={1} min={1} max={9} value={dexterity} onChange={e => setDexterity(e.target.value)} />
                    </div>
                    <div>
                        <label>Constitution?</label>
                        <input type='number' defaultValue={1} min={1} max={9} value={constitution} onChange={e => setConstitution(e.target.value)} />
                    </div>
                    <div>
                        <label>Intelligence?</label>
                        <input type='number' defaultValue={1} min={1} max={9} value={intelligence} onChange={e => setIntelligence(e.target.value)} />
                    </div>
                    <div>
                        <label>Wisdom?</label>
                        <input type='number' defaultValue={1} min={1} max={9} value={wisdom} onChange={e => setWisdom(e.target.value)} />
                    </div>
                    <div>
                        <label>Charisma?</label>
                        <input type='number' defaultValue={1} min={1} max={9} value={charisma} onChange={e => setCharisma(e.target.value)} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ScenesInfo