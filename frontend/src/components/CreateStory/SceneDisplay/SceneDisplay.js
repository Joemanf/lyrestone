import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createScene, deleteScene, getCurrentScene, getParents } from '../../../store/scenes';

import './SceneDisplay.css'

function SceneDisplay({ currentScene, sceneLoaded, setSceneLoaded, thisSceneId, setThisSceneId, parentsLoaded, setParentsLoaded }) {
    const dispatch = useDispatch()
    // const [parentsLoaded, setParentsLoaded] = useState(false);
    const currentStory = useSelector(state => state.stories.currentStory)
    const [errors, setErrors] = useState([])
    // const currentScene = useSelector(state => state.scenes.currentScene)
    let parentsArr = useSelector(state => state.scenes.parents)

    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        const inst1 = document.querySelector('#instructions_1');
        const inst2 = document.querySelector('#instructions_2');
        const inst3 = document.querySelector('#instructions_3');
        const container = document.querySelector('#instructions_container_1')
        if (hidden) {
            inst1.className = 'hidden'
            inst2.className = 'hidden'
            inst3.className = 'hidden'
            container.className = 'hidden instructions_container'
        }
        else {
            inst1.className = ''
            inst2.className = ''
            inst3.className = ''
            container.className = 'instructions_container'
        }
    }, [hidden])

    function makeScene() {
        setSceneLoaded(false)
        const sceneId = currentScene.id
        dispatch(createScene(currentScene.id, currentStory.id))
            .then(() => dispatch(getCurrentScene(sceneId)))
            .then(() => setSceneLoaded(true))
    }

    function handleCurrentSceneDelete() {
        setErrors([])
        const tempDelErrs = []
        if (currentScene.root) {
            tempDelErrs.push("Cannot delete the root. Delete the story instead")
        }
        else if (currentScene.Choices && currentScene.Choices.length) {
            tempDelErrs.push("Scene must not have any children")
        }
        setErrors(tempDelErrs)
        if (!tempDelErrs.length) {
            setSceneLoaded(false)
            dispatch(deleteScene(currentScene.id, parentsArr[0]))
                .then(() => dispatch(getParents(parentsArr[0].id)))
                .then(() => dispatch(getCurrentScene(parentsArr[0].id)))
                .then(() => setSceneLoaded(true))
            // dispatch(getCurrentScene(parentsArr[0])).then(() => setSceneLoaded(true))
        }
    }

    let i = 0;

    // parentsLoaded && sceneLoaded &&
    return sceneLoaded && (
        <div className='scene_display_container'>
            <div className='scene_view'>
                <div className='scene_view_errors'>
                    {errors.map(err => (
                        <div key={err}>
                            {err}
                        </div>
                    ))}
                </div>
                <div>
                    {parentsArr && parentsArr.length ?
                        parentsArr.map(parent => {
                            i++;
                            return (
                                <div className='scene_parents_displayed' key={`parent_${i}`} onClick={() => {
                                    setErrors([])
                                    setThisSceneId(parent.id)
                                }
                                } >
                                    <div>Parent: {parent.title}</div>
                                </div>
                            )
                        })
                        :
                        <div className='scene_parents'></div>
                    }
                </div>
                <div className='current_scene'>
                    <div>Current: {currentScene.title}</div>
                    <div className='delete_scene' onClick={handleCurrentSceneDelete}>x</div>
                    <div className='scene_display_instructions' onClick={e => setHidden(!hidden)}> Help
                        <div id='instructions_container_1' className='instructions_container'>
                            <div id='instructions_1' className='hidden'>To add a scene, click the button at the top right.</div>
                            <div id='instructions_2' className='hidden'>To delete a scene, click the x.</div>
                            <div id='instructions_3' className='hidden'>To switch between scenes, simply click on them.</div>
                        </div>
                    </div>
                </div>
                <div className='scene_children_container'>
                    {currentScene.Choices ? currentScene.Choices.map(scene => {
                        i++
                        return (
                            <div className='scene_children' key={`scene_${i}`}>
                                <div onClick={() => {
                                    setErrors([])
                                    setThisSceneId(scene.nextSceneId)
                                }}>{scene.body}</div>
                                {/* <div onClick={handleSceneDelete}>x</div> */}
                            </div>
                        )
                    })
                        :
                        <div className='scene_children'></div>}
                </div>
            </div>
            <div className='add_scene_button_container'>
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