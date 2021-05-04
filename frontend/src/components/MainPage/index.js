import React from 'react';
import Characters from './Characters/Characters'
import Stories from './Stories/Stories'

import './MainPage.css'

function MainPage() {
    return (
        <div className='greater_border'>
            <Characters />
            <Stories />
        </div>
    )
}

export default MainPage