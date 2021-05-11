import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { csrfFetch } from '../../../store/csrf';
import { clearCurrentScene, createScene, getCurrentScene, getParents } from '../../../store/scenes';

import './SceneDisplay.css'

function SceneDisplay() {
    const dispatch = useDispatch()
    const [sceneLoaded, setSceneLoaded] = useState(false);
    const [parentsLoaded, setParentsLoaded] = useState(false);
    const currentStory = useSelector(state => state.stories.currentStory)
    const currentScene = useSelector(state => state.scenes.currentScene)
    const parentsArr = useSelector(state => state.scenes.parents)

    function makeScene() {
        setSceneLoaded(false)
        dispatch(createScene(currentScene.id, currentStory.id))
    }

    useEffect(() => {
        dispatch(clearCurrentScene());
        dispatch(getCurrentScene(currentScene.id)).then(() => setSceneLoaded(true))
        dispatch(getParents(currentScene.id)).then(() => setParentsLoaded(true))
    }, [sceneLoaded, parentsLoaded])

    // const getParents = () => async () => {
    //     const response = await csrfFetch(`/api/scenes/parent/${currentScene.id}`)
    //     const data = await response.json();
    //     return data.parentScenes
    // }

    // const parentsArr = getParents();
    let i = 0;

    return parentsLoaded && sceneLoaded && (
        <div>
            <div className='scene_view'>
                <div>
                    {parentsArr && parentsArr.length ?
                        parentsArr.map(parent => {
                            i++;
                            return (
                                <div key={`parent_${i}`}>{parent.body}</div>
                            )
                        })
                        :
                        null
                    }
                </div>
                <div>{currentScene.title}</div>
                <div>
                    {currentScene.Choices ? currentScene.Choices.map(scene => {
                        i++
                        return (
                            <div key={`scene_${i}`}>{scene.body}</div>
                        )
                    })
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