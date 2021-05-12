import React, { useEffect, useState } from 'react';
import SceneDisplay from './SceneDisplay/SceneDisplay';
import ScenesInfo from './SceneInfo/SceneInfo';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentStory, deleteStory, editStory, getAllStories, clearStories, getCurrentStory } from '../../store/stories';

import './CreateStory.css';
import { clearCurrentScene, getCurrentScene, getParents } from '../../store/scenes';

function CreateStory() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { storyId } = useParams()
    const [storyLoaded, setStoryLoaded] = useState(false)
    const [sceneLoaded, setSceneLoaded] = useState(false)
    const [parentsLoaded, setParentsLoaded] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false)

    const user = useSelector(state => state.session.user)
    const story = useSelector(state => state.stories.currentStory);
    const firstScene = useSelector(state => state.stories.currentStory.Scenes)
    const currentScene = useSelector(state => state.scenes.currentScene)
    const [thisSceneId, setThisSceneId] = useState(currentScene.id)

    const [title, setTitle] = useState(story.title);
    const [description, setDescription] = useState(story.description);
    const [published, setPublished] = useState(story.published);

    useEffect(() => {
        dispatch(clearCurrentStory())
        dispatch(getCurrentStory(storyId))
            .then(() => setStoryLoaded(true))
    }, [dispatch])

    useEffect(() => {
        setTitle(story.title);
        setDescription(story.description);
        setPublished(story.published)
    }, [story])

    useEffect(() => {
        dispatch(clearCurrentScene())
        if (!firstLoad && firstScene) {
            dispatch(getCurrentScene(firstScene[0].id)).then(() => setFirstLoad(true)).then(() => setSceneLoaded(true))
        } else {
            dispatch(getCurrentScene(thisSceneId)).then(() => setSceneLoaded(true))
            if (currentScene.root) {
                console.log('checking these,', thisSceneId)
                dispatch(getParents(thisSceneId)).then(() => setParentsLoaded(true))
            } else {
                console.log('checking these,', thisSceneId)
                dispatch(getParents(thisSceneId)).then(() => setParentsLoaded(true))
            }
        }
    }, [dispatch, firstScene, thisSceneId])

    // useEffect(() => {
    //     // dispatch(clearCurrentScene());
    //     // dispatch(getCurrentScene(thisSceneId)).then(() => setSceneLoaded(true))
    //     dispatch(getParents(thisSceneId)).then(() => setParentsLoaded(true))
    // }, [parentsLoaded, thisSceneId])

    function handleSubmit(e) { // Double check this function and throw in validators
        e.preventDefault()
        //Make thumbnail dynamic in the future
        const thumbnail = 'https://lyrestone.s3.amazonaws.com/lyrestone-dragon.png';
        dispatch(editStory(story.id, user.id, title, description, thumbnail, published))
        history.push('/home')
    }

    function handleDeleteStory() {
        dispatch(deleteStory(story.id))
            .then(() => history.push('/home'))
    }

    return storyLoaded && sceneLoaded && (
        <>
            <div className='top_create_story'>
                <div>
                    <ScenesInfo
                        currentScene={currentScene}
                        sceneLoaded={sceneLoaded}
                        setSceneLoaded={setSceneLoaded}
                    />
                </div>
                <div>
                    <SceneDisplay
                        currentScene={currentScene}
                        sceneLoaded={sceneLoaded}
                        setSceneLoaded={setSceneLoaded}
                        thisSceneId={thisSceneId}
                        setThisSceneId={setThisSceneId}
                        parentsLoaded={parentsLoaded}
                        setParentsLoaded={setParentsLoaded}
                    />
                    <form onSubmit={handleSubmit} className='story_info_container'>
                        <div>
                            <div>
                                <label>Story Name</label>
                                <input
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Story Description</label>
                                <textarea
                                    required
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* <div>
                            <input type='checkbox' value={published} onClick={e => setPublished(!e.target.value)}>Publish?</input>
                        </div> */}
                        <div>
                            <button type='submit'>Save</button>
                        </div>
                        {/* I'll deal with publishing later, will require another DB  */}
                        {/* <div>
                            <button>Publish</button>
                        </div> */}
                        <div>
                            <button onClick={handleDeleteStory}>Delete</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateStory