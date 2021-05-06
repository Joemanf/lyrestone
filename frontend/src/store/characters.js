import { csrfFetch } from './csrf';

// Actions
const GET_CHARACTERS = 'characters/getCharacters';
const SELECT_CHARACTER = 'characters/selectACharacter'

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
            console.log('Action payload get characters', action.payload)
            newState = Object.assign({}, state); // Always copy, never alter
            action.payload.forEach(character => {
                console.log(newState.characters, character.id)
                newState.characters[character.id] = character;
            })
            console.log('THE NEW STATE IN CHARACTERS: ', newState)
            return newState;
        case SELECT_CHARACTER:
            newState = Object.assign({}, state); // Always copy, never alter
            console.log('Selected Char Action Payload', action.payload)
            newState.selectedChar[action.payload.id] = action.payload
            console.log('THE NEW STATE IIINNNN SELECT CHARACTER: ', newState)
            return newState;
        default:
            return state;
    }
};

export default charactersReducer;