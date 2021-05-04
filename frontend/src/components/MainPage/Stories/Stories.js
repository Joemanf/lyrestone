import React from 'react';

import './Stories.css'

function Stories() {
    return (
        <div className='stories_container'>
            <div className='story_header'>
                <h2>
                    Stories:
                </h2>
                <button>Make a story</button>
            </div>
        </div>
        // <div className='characters_container'>
        //     <div className='character_header'>
        //         <h2>
        //             Characters:
        //         </h2>
        //         <button disabled={true}>Add a character</button>
        //     </div>
        // </div>
    )
}

export default Stories