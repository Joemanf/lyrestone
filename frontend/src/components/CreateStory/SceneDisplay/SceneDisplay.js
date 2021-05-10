import React from 'react';

import './SceneDisplay.css'

function SceneDisplay() {
    return (
        <div>
            <div className='scene_view'>
                <div>Parent Scene</div>
                <div>Current Scene</div>
                <div>Multiple Children</div>
            </div>
            <div>Add Scene</div>
        </div>
    )
}

export default SceneDisplay