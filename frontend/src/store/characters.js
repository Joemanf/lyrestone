import { csrfFetch } from './csrf';

// Actions
const GET_CHARACTERS = 'characters/getCharacters';

const getCharacters = (character) => {
    return {
        type: GET_CHARACTERS,
        payload: character,
    };
};


// Thunks
// Get all the characters associated with a user
export const getAllUserCharacters = () => async (dispatch) => {
    const response = await csrfFetch('/api/characters');
    const data = await response.json();
    console.log('Data in getAllUserCharacters', data)
    dispatch(getCharacters(data.stories));
    return response;
};


// Reducer
const initialState = { characters: {} };

const charactersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CHARACTERS:
            console.log('Action payload get characters', action.payload)
            newState = Object.assign({}, state); // Always copy, never alter
            action.payload.forEach(character => {
                console.log(newState.stories, character.id)
                newState.stories[character.id] = character;
            })
            console.log('THE NEW STATE IN CHARACTERS: ', newState)
            return newState;
        default:
            return state;
    }
};

export default charactersReducer;