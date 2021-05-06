import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Stories.css'

function Stories() {
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

    console.log('Stories here:', stories)

    return (
        <div className='stories_container'>
            <div className='story_header'>
                <h2>
                    Stories:
                </h2>
                <button>Make a story</button>
            </div>
            <div>
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