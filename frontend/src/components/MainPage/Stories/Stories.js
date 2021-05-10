import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStory } from '../../../store/stories';

import './Stories.css'

function Stories() {
    const dispatch = useDispatch()
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id);
    const stories = useSelector(state => state.stories.stories);
    const selectedCharacter = useSelector(state => state.characters.selectedChar);

    const storiesArr = []
    for (let key in stories) {
        storiesArr.push(stories[key])
    }

    const selectedCharArr = []
    for (let key in selectedCharacter) {
        selectedCharArr.push(selectedCharacter[key])
    }

    const createStory = async () => {
        const story = await dispatch(makeStory(userId))
        return history.push(`/create/${story.story.id}`)
    }

    return (
        <div className='stories_container'>
            <div className='story_header'>
                <h2>
                    Stories:
                </h2>
                <button onClick={createStory}>Make a story</button>
            </div>
            <div className='each_story'>
                {storiesArr.map(story => {
                    if (selectedCharArr.length) {
                        return (
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
                    } else {
                        return (
                            <h2 className='story_header'>Please select a character.</h2>
                        )
                    }
                }
                )}
            </div>
        </div>
    )
}

export default Stories