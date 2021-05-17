import React, { useEffect, useState } from 'react';
import SceneDisplay from './SceneDisplay/SceneDisplay';
import ScenesInfo from './SceneInfo/SceneInfo';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentStory, deleteStory, editStory, getCurrentStory } from '../../store/stories';

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
    const [infoErrors, setInfoErrors] = useState([])

    useEffect(() => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '1'
        }, 500)
    }, [])

    useEffect(() => {
        dispatch(clearCurrentStory())
        dispatch(getCurrentStory(storyId))
            // .then(() => dispatch(getParents(firstScene[0])))
            .then(() => setStoryLoaded(true))
    }, [dispatch, storyId])

    useEffect(() => {
        setTitle(story.title);
        setDescription(story.description);
        setPublished(story.published)
    }, [story])

    useEffect(() => {
        dispatch(clearCurrentScene())
        if (!firstLoad && firstScene) {
            dispatch(getCurrentScene(firstScene[0].id))
                .then(() => dispatch(getParents(firstScene[0].id)))
                .then(() => setFirstLoad(true)).then(() => setSceneLoaded(true))
        } else {
            dispatch(getCurrentScene(thisSceneId)).then(() => setSceneLoaded(true))
            if (currentScene.root) {
                dispatch(getParents(thisSceneId)).then(() => setParentsLoaded(true))
            } else {
                dispatch(getParents(thisSceneId)).then(() => setParentsLoaded(true))
            }
        }
    }, [dispatch, firstScene, thisSceneId])

    const handleCreateStoryTransition = () => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '0'
        }, 0)
        setTimeout(() => {
            history.push('/home')
        }, 1000)
    }

    function handleSubmit(e) { // Double check this function and throw in validators
        e.preventDefault()
        //Make thumbnail dynamic in the future
        const thumbnail = 'https://lyrestone.s3.amazonaws.com/lyrestone-dragon.png';
        dispatch(editStory(story.id, user.id, title, description, thumbnail, published))
        handleCreateStoryTransition()
    }

    function handleDeleteStory() {
        dispatch(deleteStory(story.id))
            .then(() => handleCreateStoryTransition())
    }

    if (storyLoaded && sceneLoaded && user.id !== story.userId) {
        return <Redirect to='/home' />
    }

    return storyLoaded && sceneLoaded && (
        <>
            <div className='top_create_story'>
                <div className='greater_scenes_info'>
                    <ScenesInfo
                        currentScene={currentScene}
                        sceneLoaded={sceneLoaded}
                        setSceneLoaded={setSceneLoaded}
                        infoErrors={infoErrors}
                        setInfoErrors={setInfoErrors}
                    />
                </div>
                <div className='greater_scene_display_and_name'>
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
                        <div className='story_create_name_desc_container'>
                            <div className='story_create_inputs'>
                                <label>Story Name</label>
                                <input
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='story_create_inputs'>
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
                        <div className='story_create_buttons'>
                            <button type='submit'>Save Story</button>
                            {/* I'll deal with publishing later, will require another DB  */}
                            {/*
                            <button>Publish</button>
                        */}
                            <button onClick={handleDeleteStory}>Delete Story</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateStory