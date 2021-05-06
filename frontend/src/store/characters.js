import { csrfFetch } from './csrf';

// Actions
const GET_CHARACTERS = 'characters/getCharacters';
const SELECT_CHARACTER = 'characters/selectACharacter';
const REMOVE_CHARACTER_FROM_STORE = 'characters/removeCharacterFromStore'

const getCharacters = (character) => {
    return {
        type: GET_CHARACTERS,
        payload: character,
    };
};

export const selectACharacter = (character) => {
    return {
        type: SELECT_CHARACTER,
        payload: character,
    }
}

export const clearSelectedCharacter = () => {
    return {
        type: REMOVE_CHARACTER_FROM_STORE
    }
}


// Thunks
// Get all the characters associated with a user
export const getAllUserCharacters = () => async (dispatch) => {
    const response = await csrfFetch('/api/characters');
    const data = await response.json();
    console.log('Data in getAllUserCharacters', data)
    dispatch(getCharacters(data.characters));
    return response;
};


// Reducer
const initialState = { characters: {}, selectedChar: {} };

const charactersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CHARACTERS:
            newState = Object.assign({}, state); // Always copy, never alter
            action.payload.forEach(character => {
                console.log(newState.characters, character.id)
                newState.characters[character.id] = character;
            })
            return newState;
        case SELECT_CHARACTER:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.selectedChar[action.payload.id] = action.payload
            return newState;
        case REMOVE_CHARACTER_FROM_STORE:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.selectedChar = {}
            console.log("IT'S! THE! NEW!", newState)
            return newState;
        default:
            return state;
    }
};

export default charactersReducer;