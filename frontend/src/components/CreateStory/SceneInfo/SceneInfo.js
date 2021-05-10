import React from 'react';

import './SceneInfo.css';

function ScenesInfo() {
    return (
        <form>
            <div>
                <label>Title</label>
                <input type='text' />
            </div>
            <div>
                <label>Body</label>
                <textarea />
            </div>
            <div className='other_options'>
                <div>
                    <div>
                        <label>Background Image</label>
                        <input type='file' />
                    </div>
                    <div>
                        <label>Previous Scene: </label>
                    </div>
                    <div>
                        <label>Victory Scene?</label>
                        <input type='checkbox' />
                    </div>
                    <div>
                        <label>Kills player?</label>
                        <input type='checkbox' />
                    </div>
                    <div>
                        <label>HP Change</label>
                        <input type='number' />
                    </div>
                    <div>
                        <button type='submit'>Save</button>
                    </div>
                </div>
                <div>
                    <div>
                        <label>Strength?</label>
                        <input type='number' defaultValue={1} min={1} max={9} />
                    </div>
                    <div>
                        <label>Dexerity?</label>
                        <input type='number' defaultValue={1} min={1} max={9} />
                    </div>
                    <div>
                        <label>Constitution?</label>
                        <input type='number' defaultValue={1} min={1} max={9} />
                    </div>
                    <div>
                        <label>Intelligence?</label>
                        <input type='number' defaultValue={1} min={1} max={9} />
                    </div>
                    <div>
                        <label>Wisdom?</label>
                        <input type='number' defaultValue={1} min={1} max={9} />
                    </div>
                    <div>
                        <label>Charisma?</label>
                        <input type='number' defaultValue={1} min={1} max={9} />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ScenesInfo