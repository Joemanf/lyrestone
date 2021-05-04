import React from 'react';
import { Link } from 'react-router-dom';

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
    )
}

export default Stories