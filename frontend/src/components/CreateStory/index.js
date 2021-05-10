import React, { useEffect, useState } from 'react';
import SceneDisplay from './SceneDisplay/SceneDisplay';
import ScenesInfo from './SceneInfo/SceneInfo';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentStory } from '../../store/stories';

import './CreateStory.css';

function CreateStory() {
    const dispatch = useDispatch()
    const { storyId } = useParams()
    const [storyLoaded, setStoryLoaded] = useState(false)

    const story = useSelector(state => state.stories.currentStory);

    const [title, setTitle] = useState(story.title);
    const [description, setDescription] = useState(story.description);


    useEffect(() => {
        dispatch(getCurrentStory(storyId)).then(() => setStoryLoaded(true))
    }, [dispatch])

    return storyLoaded && (
        <>
            <form className='top_create_story'>
                <div>
                    <ScenesInfo />
                </div>
                <div>
                    <SceneDisplay />
                    <div className='story_info_container'>
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
                        <div>
                            <button type='submit'>Save</button>
                        </div>
                        {/* I'll deal with publishing later, will require another DB  */}
                        {/* <div>
                            <button>Publish</button>
                        </div> */}
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateStory