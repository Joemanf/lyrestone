import React from 'react';
import SceneDisplay from './SceneDisplay/SceneDisplay';
import ScenesInfo from './SceneInfo/SceneInfo';

import './CreateStory.css';

function CreateStory() {
    return (
        <>
            <form className='top_create_story'>
                <div>
                    <ScenesInfo />
                </div>
                <div>
                    <SceneDisplay />
                    <div>
                        <div>
                            <div>Story Name</div>
                            <div>Story Description</div>
                        </div>
                        <div>Save</div>
                        <div>Publish</div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateStory