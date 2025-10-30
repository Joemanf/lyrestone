import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStory } from '../../../store/stories';

import './Stories.css'

function Stories() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
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

    const handleCreateStoryTransition = (story) => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '0'
        }, 0)
        setTimeout(() => {
            navigate(`/create/${story.story.id}`)
        }, 1000)
    }

    const createStory = async () => {
        const story = await dispatch(makeStory(userId))
        handleCreateStoryTransition(story)
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
                {selectedCharArr.length ?
                    <>
                        {storiesArr.map(story => {
                            const handlePlayStoryTransition = () => {
                                const pageTransition = document.querySelector('.page_transition')
                                setTimeout(() => {
                                    pageTransition.style.opacity = '0'
                                }, 0)
                                setTimeout(() => {
                                    navigate(`/stories/${story.id}`)
                                }, 1000)
                            }

                            const handleEditStoryTransition = () => {
                                const pageTransition = document.querySelector('.page_transition')
                                setTimeout(() => {
                                    pageTransition.style.opacity = '0'
                                }, 0)
                                setTimeout(() => {
                                    navigate(`/create/${story.id}`)
                                }, 1000)
                            }

                            return (
                                <div key={story.id}>
                                    <div className='story_container'>
                                        <div className='story_title_desc'>
                                            <div className='story_title_desc_link'>
                                                <div className='link' onClick={handlePlayStoryTransition}>
                                                    <h3 className='story_title'>{story.title}</h3>
                                                    <div className='story_desc'>{story.description}</div>
                                                </div>
                                            </div>
                                            <div className='story_writer_edit'>
                                                <div className='written_by'>Written By: {story.User.username}</div>
                                                {userId === story.userId ?
                                                    <div className='link' onClick={handleEditStoryTransition}>Edit</div>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </div>
                                        <div className='story_img_container'>
                                            <img src={story.thumbnail} alt={story.title} className='story_img'></img>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </>
                    :
                    <h2 className='story_header'>Please select a character.</h2>
                }
            </div>
        </div>
    )
}

export default Stories