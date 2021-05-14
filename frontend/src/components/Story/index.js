import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { clearCurrentStory, getCurrentStory } from '../../store/stories'

function Story() {
    const dispatch = useDispatch()
    const { storyId } = useParams()
    const [storyLoaded, setStoryLoaded] = useState(false)

    const story = useSelector(state => state.stories.currentStory)

    useEffect(() => {
        const pageTransition = document.querySelector('.page_transition')
        setTimeout(() => {
            pageTransition.style.opacity = '1'
        }, 500)
    }, [])

    useEffect(() => {
        dispatch(clearCurrentStory())
        dispatch(getCurrentStory(storyId)).then(() => setStoryLoaded(true))
    }, [dispatch, storyId])

    let firstScene = { id: Infinity };
    if (story.Scenes) {
        story.Scenes.forEach(scene => {
            if (scene.id < firstScene.id) {
                firstScene = scene
            }
        })
        return <Redirect to={`/stories/${story.id}/${firstScene.id}`} />
    }

    return storyLoaded && (
        <div></div>
    )
}

export default Story