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
    let parentsArr = useSelector(state => state.scenes.parents)

    const [thisSceneId, setThisSceneId] = useState(currentScene.id)

    function makeScene() {
        setSceneLoaded(false)
        dispatch(createScene(currentScene.id, currentStory.id))
    }

    function handleSceneDelete() {
        setSceneLoaded(false)
        dispatch()
    }

    function handleCurrentSceneDelete() {
        if (currentScene.Choices && currentScene.Choices.length) {
            return // "Scene must not have any children"
        }
        setSceneLoaded(false)
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
                                <div className='scene_parents' key={`parent_${i}`} onClick={() => setThisSceneId(parent.id)}>
                                    <p>Parent: {parent.title}</p>
                                </div>
                            )
                        })
                        :
                        <div className='scene_parents'></div>
                    }
                </div>
                <div>
                    <div>Current: {currentScene.title}</div>
                    <div onClick={handleCurrentSceneDelete}>x</div>
                </div>
                <div>
                    {currentScene.Choices ? currentScene.Choices.map(scene => {
                        i++
                        console.log('Here?', scene)
                        return (
                            <div className='scene_children' key={`scene_${i}`}>
                                <div onClick={() => setThisSceneId(scene.nextSceneId)}>{scene.body}</div>
                                <div onClick={handleSceneDelete}>x</div>
                            </div>
                        )
                    })
                        :
                        <div className='scene_children'></div>}
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