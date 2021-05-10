import { csrfFetch } from './csrf';

// Actions
const GET_THIS_SCENE = 'scenes/getThisScene';
const CLEAR_THIS_SCENE = 'scenes/clearThisScene'

const getThisScene = (scene) => {
    return {
        type: GET_THIS_SCENE,
        payload: scene,
    };
};

export const clearCurrentScene = () => {
    return {
        type: CLEAR_THIS_SCENE
    }
}


// Thunks
// Get current scene
export const getCurrentScene = (sceneId) => async (dispatch) => {
    const response = await csrfFetch(`/api/scenes/${sceneId}`);
    const data = await response.json();
    dispatch(getThisScene(data.currentScene));
    return data;
};

// Create a scene and its respective choice
export const createScene = (sceneId, storyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/scenes/${sceneId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storyId })
    });
    const data = await response.json();
    getCurrentScene(data.scene.id)
    return response;
};


// Reducer
const initialState = { currentScene: {} };

const scenesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_THIS_SCENE:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.currentScene = action.payload
            return newState;
        case CLEAR_THIS_SCENE:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.currentScene = {}
            return newState;
        default:
            return state;
    }
};

export default scenesReducer;