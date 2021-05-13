import React, { useState } from 'react';
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
        <div>
            <div className='scene_view'>
                <div className='scene_view_errors'>
                    {errors.map(err => (
                        <div>
                            {err}
                        </div>
                    ))}
                </div>
                <div>
                    {parentsArr && parentsArr.length ?
                        parentsArr.map(parent => {
                            i++;
                            return (
                                <div className='scene_parents' key={`parent_${i}`} onClick={() => {
                                    setErrors([])
                                    setThisSceneId(parent.id)
                                }
                                } >
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

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { csrfFetch } from '../../../store/csrf';
// import { clearCurrentScene, createScene, deleteScene, getCurrentScene, getParents } from '../../../store/scenes';

// import './SceneDisplay.css'

// function SceneDisplay() {
//     const dispatch = useDispatch()
//     const [sceneLoaded, setSceneLoaded] = useState(false);
//     const [parentsLoaded, setParentsLoaded] = useState(false);
//     const currentStory = useSelector(state => state.stories.currentStory)
//     const currentScene = useSelector(state => state.scenes.currentScene)
//     let parentsArr = useSelector(state => state.scenes.parents)

//     const [thisSceneId, setThisSceneId] = useState(currentScene.id)

//     function makeScene() {
//         setSceneLoaded(false)
//         dispatch(createScene(currentScene.id, currentStory.id))
//     }

//     // function handleSceneDelete(id) {
//     //     setSceneLoaded(false)
//     //     dispatch(deleteScene(id))
//     // }

//     // function handleCurrentSceneDelete() {
//     //     if (currentScene.Choices && currentScene.Choices.length) {
//     //         return // "Scene must not have any children"
//     //     }
//     //     setSceneLoaded(false)
//     //     dispatch(deleteScene(currentScene.id))
//     // }

//     useEffect(() => {
//         dispatch(clearCurrentScene());
//         dispatch(getCurrentScene(thisSceneId)).then(() => setSceneLoaded(true))
//         dispatch(getParents(thisSceneId)).then(() => setParentsLoaded(true))
//     }, [sceneLoaded, parentsLoaded, thisSceneId])

//     let i = 0;

//     // parentsLoaded && sceneLoaded &&
//     return sceneLoaded && (
//         <div>
//             <div className='scene_view'>
//                 <div>
//                     {parentsArr && parentsArr.length ?
//                         parentsArr.map(parent => {
//                             i++;
//                             return (
//                                 <div className='scene_parents' key={`parent_${i}`} onClick={() => setThisSceneId(parent.id)}>
//                                     <p>Parent: {parent.title}</p>
//                                 </div>
//                             )
//                         })
//                         :
//                         <div className='scene_parents'></div>
//                     }
//                 </div>
//                 <div>
//                     <div>Current: {currentScene.title}</div>
//                     <div onClick={handleCurrentSceneDelete}>x</div>
//                 </div>
//                 <div>
//                     {currentScene.Choices ? currentScene.Choices.map(scene => {
//                         i++
//                         return (
//                             <div className='scene_children' key={`scene_${i}`}>
//                                 <div onClick={() => setThisSceneId(scene.nextSceneId)}>{scene.body}</div>
//                                 <div onClick={handleSceneDelete}>x</div>
//                             </div>
//                         )
//                     })
//                         :
//                         <div className='scene_children'></div>}
//                 </div>
//             </div>
//             <div>
//                 {currentScene.Choices && currentScene.Choices.length < 4 ?
//                     <button onClick={makeScene}>Add a scene</button>
//                     :
//                     <button className='button_disabled'>Add a scene</button>
//                 }
//             </div>
//         </div>
//     )
// }

// export default SceneDisplay