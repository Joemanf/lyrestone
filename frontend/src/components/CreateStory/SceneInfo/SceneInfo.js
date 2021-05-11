import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { csrfFetch } from '../../../store/csrf';
import { updateScene } from '../../../store/scenes';

import './SceneInfo.css';

function ScenesInfo() {
    const dispatch = useDispatch()

    const currentScene = useSelector(state => state.scenes.currentScene)
    // const currentChoices = currentScene.Choices


    let parentsArr = [];
    if (currentScene.id) {
        // parentsArr = getParents();
    }
    console.log('The parents?', parentsArr)
    const filteredArr = []
    if (parentsArr.length) {
        parentsArr.forEach(parent => {
            if (parent.nextSceneId === currentScene.id) filteredArr.push(parent)
        })
    }

    // set all of these to the info coming in
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [backgroundImage, setBackgroundImage] = useState();
    const [victory, setVictory] = useState(false);
    const [kill, setKill] = useState(false);
    const [health, setHealth] = useState();
    const [strength, setStrength] = useState();
    const [dexterity, setDexterity] = useState();
    const [constitution, setConstitution] = useState();
    const [intelligence, setIntelligence] = useState();
    const [wisdom, setWisdom] = useState();
    const [charisma, setCharisma] = useState();

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateScene())
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