import { csrfFetch } from './csrf';

// Actions
const GET_THIS_SCENE = 'scenes/getThisScene';
const GET_PARENTS = 'scenes/getParents'
const CLEAR_THIS_SCENE = 'scenes/clearThisScene'

const getThisScene = (scene) => {
    return {
        type: GET_THIS_SCENE,
        payload: scene,
    };
};

const getTheParents = (scenes) => {
    return {
        type: GET_PARENTS,
        payload: scenes,
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
    if (sceneId) {
        const response = await csrfFetch(`/api/scenes/${sceneId}`);
        const data = await response.json();
        dispatch(getThisScene(data.currentScene));
        return data;
    }
};

// Get parents
export const getParents = (sceneId) => async (dispatch) => {
    if (sceneId) {
        const response = await csrfFetch(`/api/scenes/parent/${sceneId}`)
        const data = await response.json();
        dispatch(getTheParents(data.parentScenes))
        return data
    }
}

// Create a scene and its respective choices
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

//Update a scene
export const updateScene = (sceneId, choiceId) => async (dispatch) => {
    const response = await csrfFetch(`/api/scenes/edit/${sceneId}/${choiceId}`)
}


// Reducer
const initialState = { currentScene: {}, parents: {} };

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
        case GET_PARENTS:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.parents = action.payload
            return newState
        default:
            return state;
    }
};

export default scenesReducer;