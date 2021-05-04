import React from 'react';
import { Redirect } from 'react-router';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import './Splash.css'


function Splash() {

    const clickRedir = () => {
        return <Redirect to={'/hey'} />
    }
    return (
        <div className='border'>
            <TransformWrapper>
                <TransformComponent>
                    <div>
                        <div className='red'>Yeah</div>
                        <div>Okay</div>
                        <div>Sure</div>
                        <div>AMARO.</div>
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

export default Splash