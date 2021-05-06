import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import { clearCurrentScene, getCurrentScene } from '../../../store/scenes'

function Scene() {
    const dispatch = useDispatch()
    const param = useParams()
    const [sceneLoaded, setSceneLoaded] = useState(false)
    const [sceneChange, setSceneChange] = useState(false)

    console.log('PARAM: ', param)

    const scene = useSelector(state => state.scenes.currentScene)

    const choicesArr = scene.Choices;

    useEffect(() => {
        dispatch(clearCurrentScene())
        dispatch(getCurrentScene(parseInt(param.sceneId))).then(() => setSceneLoaded(true))
        setSceneChange(false)
    }, [dispatch, sceneChange])
    // return (
    return sceneLoaded && (
        <div>
            <div>{scene.title}</div>
            <div>
                <img></img>
                <div>{scene.body}</div>
            </div>
            <div>
                <h2>Choices: </h2>
                {choicesArr && choicesArr.length ? choicesArr.map(choice => (
                    <Link to={`/stories/${scene.storyId}/${choice.nextSceneId}`}>
                        <div onClick={() => setSceneChange(true)}>
                            {choice.body}
                        </div>
                    </Link>
                ))
                    :
                    <Link to='/home'>
                        <div>
                            Game Over.
                        </div>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Scene