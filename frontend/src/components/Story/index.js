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
        console.log('Yeah first scene', firstScene)
        return <Redirect to={`/stories/${story.id}/${firstScene.id}`} />
    }



    return storyLoaded && (
        // <div>
        //     <div>{story.title}</div>
        //     <div>
        //         <img></img>
        //         <div>Text Area</div>
        //     </div>
        //     <div>
        //         Choices
        //     </div>
        // </div>
        <div></div>
    )
}

export default Story