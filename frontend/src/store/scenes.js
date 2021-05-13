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
    if (sceneId && !sceneId.length) {
        const response = await csrfFetch(`/api/scenes/parent/${sceneId}`)
        const choices = await response.json();
        const sender = choices.parentChoices
        const sent = sender[0]
        // const resArr = []
        const response2 = await csrfFetch(`/api/scenes/parent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sent })
        })
        const data = await response2.json();
        // resArr.push(data)
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
export const updateScene = (
    sceneId, choiceId, root, // choiceId is the Id of the parent scene
    title, body, backgroundImage,
    victory, kill, health,
    strength, dexterity, constitution,
    intelligence, wisdom, charisma
) => async (dispatch) => {
    const newValidated = {};
    if (root) {
        newValidated.root = true
    }
    else {
        newValidated.root = false
    }
    if (title !== undefined) {
        newValidated.title = title
    }
    if (body !== undefined) {
        newValidated.body = body
    }
    if (backgroundImage !== undefined) {
        newValidated.backgroundImage = backgroundImage
    }
    if (victory !== undefined) {
        newValidated.victory = victory
    }
    if (kill !== undefined) {
        newValidated.kill = kill
    }
    if (health !== undefined) {
        newValidated.health = health
    }
    if (strength !== undefined) {
        newValidated.strength = strength
    }
    if (dexterity !== undefined) {
        newValidated.dexterity = dexterity
    }
    if (constitution !== undefined) {
        newValidated.constitution = constitution
    }
    if (intelligence !== undefined) {
        newValidated.intelligence = intelligence
    }
    if (wisdom !== undefined) {
        newValidated.wisdom = wisdom
    }
    if (charisma !== undefined) {
        newValidated.charisma = charisma
    }

    const response = await csrfFetch(`/api/scenes/edit/${sceneId}/${choiceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newValidated })
    })

    const data = await response.json()

    dispatch(getThisScene(data.currentScene))
}

// Delete a scene
export const deleteScene = (id, parent) => async (dispatch) => {
    if (id) {
        const response = await csrfFetch('/api/scenes/delete-scene', {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })
        const data = await response.json()
        // getCurrentScene(parent)
        dispatch(getThisScene(data.parent))
        return data
    }
}

// Reducer
const initialState = { currentScene: {}, parents: {} };

const scenesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_THIS_SCENE:
            if (action.payload) {
                newState = Object.assign({}, state); // Always copy, never alter
                newState.currentScene = action.payload
                return newState;
            }
            else return state;
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