import React from 'react';
import { useSelector } from 'react-redux';

import './SceneDisplay.css'

function SceneDisplay() {
    const currentScene = useSelector(state => state.scenes.currentScene)
    return (
        <div>
            <div className='scene_view'>
                <div>Parent Scene</div>
                <div>{currentScene.title}</div>
                <div>
                    {currentScene.Choices.map(scene => (
                        <div>hey</div>
                    ))}
                </div>
            </div>
            <div>Add Scene</div>
        </div>
    )
}

export default SceneDisplay