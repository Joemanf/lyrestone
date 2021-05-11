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

    const [thisSceneId, setThisSceneId] = useState(currentScene.id)

    function makeScene() {
        setSceneLoaded(false)
        dispatch(createScene(currentScene.id, currentStory.id))
    }



    useEffect(() => {
        dispatch(clearCurrentScene());
        console.log('THIS, SCENE!!!!!!!', thisSceneId)
        dispatch(getCurrentScene(thisSceneId)).then(() => setSceneLoaded(true))
        dispatch(getParents(thisSceneId)).then(() => setParentsLoaded(true))
    }, [sceneLoaded, parentsLoaded, thisSceneId])

    let i = 0;

    console.log('just in case,', currentScene)

    // parentsLoaded && sceneLoaded &&
    return sceneLoaded && (
        <div>
            <div className='scene_view'>
                <div>
                    {parentsArr && parentsArr.length ?
                        parentsArr.map(parent => {
                            i++;
                            return (
                                <div key={`parent_${i}`}>
                                    <p>Parent: {parent.title}</p>
                                </div>
                            )
                        })
                        :
                        null
                    }
                </div>
                <div>
                    <div>Current: {currentScene.title}</div>
                    <div>x</div>
                </div>
                <div>
                    {currentScene.Choices ? currentScene.Choices.map(scene => {
                        i++
                        console.log('Here?', scene)
                        return (
                            <div>
                                <div onClick={() => setThisSceneId(scene.nextSceneId)} key={`scene_${i}`}>{scene.body}</div>
                                <div>x</div>
                            </div>
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