import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { getCurrentStory } from '../../store/stories'

function Story() {
    const dispatch = useDispatch()
    const { storyId } = useParams()
    const [storyLoaded, setStoryLoaded] = useState(false)

    const story = useSelector(state => state.stories.currentStory)

    useEffect(() => {
        dispatch(getCurrentStory(storyId)).then(() => setStoryLoaded(true))
    }, [dispatch])

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