import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllStories } from '../../../store/stories';

import './Stories.css'

function Stories() {
    const dispatch = useDispatch()

    const stories = useSelector(state => state.stories.stories)

    const storiesArr = []
    for (let key in stories) {
        storiesArr.push(stories[key])
    }

    console.log('Stories here:', stories)

    useEffect(() => {
        dispatch(getAllStories())
    }, [dispatch])

    return (
        <div className='stories_container'>
            <div className='story_header'>
                <h2>
                    Stories:
                </h2>
                <button>Make a story</button>
            </div>
            <div>
                {storiesArr.map(story => (
                    <Link to={`/stories/${story.id}`} >
                        <div className='story_container'>
                            <div className='story_title_desc'>
                                <h3 className='story_title'>{story.title}</h3>
                                <div className='story_desc'>{story.description}</div>
                            </div>
                            <div className='story_img_container'>
                                <img src={story.thumbnail} alt={story.title} className='story_img'></img>
                            </div>
                        </div>
                    </Link>
                )
                )}
            </div>
        </div>
    )
}

export default Stories