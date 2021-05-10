import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { csrfFetch } from '../../../store/csrf';
import { clearCurrentScene, createScene, getCurrentScene } from '../../../store/scenes';

import './SceneDisplay.css'

function SceneDisplay() {
    const dispatch = useDispatch()
    const [sceneLoaded, setSceneLoaded] = useState(false);
    const currentStory = useSelector(state => state.stories.currentStory)
    const currentScene = useSelector(state => state.scenes.currentScene)

    function makeScene() {
        setSceneLoaded(false)
        dispatch(createScene(currentScene.id, currentStory.id))
    }

    useEffect(() => {
        dispatch(clearCurrentScene());
        dispatch(getCurrentScene(currentScene.id)).then(() => setSceneLoaded(true))
    }, [sceneLoaded])

    async function getParents() {
        const response = await csrfFetch(`/api/scenes/parent/${currentScene.id}`)
        const data = await response.json();
        return data.parentScenes
    }

    const parentsArr = getParents();

    return sceneLoaded && (
        <div>
            <div className='scene_view'>
                <div>
                    {parentsArr && parentsArr.length ?
                        parentsArr.map(parent => (
                            <div key={parent.id}>{parent.body}</div>
                        ))
                        :
                        null
                    }
                </div>
                <div>{currentScene.title}</div>
                <div>
                    {currentScene.Choices ? currentScene.Choices.map(scene => (
                        <div>{scene.body}</div>
                    ))
                        :
                        null}
                </div>
            </div>
            <div>
                {currentScene.Choices && currentScene.Choices.length < 4 ?
                    <button onClick={makeScene}>Add a scene</button>
                    :
                    <button className='button_disabled'>Add a scene</button>
                }
            </div>
        </div>
    )
}

export default SceneDisplay