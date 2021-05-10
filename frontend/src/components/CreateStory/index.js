import React, { useEffect, useState } from 'react';
import SceneDisplay from './SceneDisplay/SceneDisplay';
import ScenesInfo from './SceneInfo/SceneInfo';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentStory, editStory, getCurrentStory } from '../../store/stories';

import './CreateStory.css';
import { clearCurrentScene, getCurrentScene } from '../../store/scenes';

function CreateStory() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { storyId } = useParams()
    const [storyLoaded, setStoryLoaded] = useState(false)
    const [sceneLoaded, setSceneLoaded] = useState(false)

    const user = useSelector(state => state.session.user)
    const story = useSelector(state => state.stories.currentStory);
    const firstScene = useSelector(state => state.stories.currentStory.Scenes)

    const [title, setTitle] = useState(story.title);
    const [description, setDescription] = useState(story.description);
    const [published, setPublished] = useState(story.published);
    console.log('The New Story Title: ', title)

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
        if (firstScene) {
            dispatch(getCurrentScene(firstScene[0].id)).then(() => setSceneLoaded(true))
        }
    }, [dispatch, firstScene])

    function handleSubmit(e) { // Double check this function and throw in validators
        e.preventDefault()
        //Make thumbnail dynamic in the future
        const thumbnail = 'https://lyrestone.s3.amazonaws.com/lyrestone-dragon.png';
        dispatch(editStory(story.id, user.id, title, description, thumbnail, published))
        history.push('/home')
    }

    return storyLoaded && sceneLoaded && (
        <>
            <div className='top_create_story'>
                <div>
                    <ScenesInfo />
                </div>
                <div>
                    <SceneDisplay />
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
                                <input
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
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateStory