import React from 'react';

import './Characters.css'

function Characters() {
    return (
        <div className='characters_container'>
            <div className='character_header'>
                <h2>
                    Characters:
                </h2>
                <button disabled={true}>Add a character</button>
            </div>
        </div>
    )
}

export default Characters