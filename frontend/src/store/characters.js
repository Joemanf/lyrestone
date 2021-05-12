import { csrfFetch } from './csrf';

// Actions
const GET_CHARACTERS = 'characters/getCharacters';
const CLEAR_ALL_CHARACTERS = 'characters/clearAllCharacters';
const SELECT_CHARACTER = 'characters/selectACharacter';
const REMOVE_CHARACTER_FROM_STORE = 'characters/removeCharacterFromStore'
const SET_HP = 'characters/setHP'
const SET_ORIGINAL_HP = 'characters/setOriginalHP'
const REMOVE_HP = 'characters/removeHP'

const getCharacters = (character) => {
    return {
        type: GET_CHARACTERS,
        payload: character,
    };
};

export const clearAllCharacters = () => {
    return {
        type: CLEAR_ALL_CHARACTERS,
    }
}

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

export const setHP = (health) => {
    return {
        type: SET_HP,
        payload: health
    }
}

export const setOriginalCurrentHp = (health) => {
    return {
        type: SET_ORIGINAL_HP,
        payload: health
    }
}

export const clearHP = () => {
    return {
        type: REMOVE_HP
    }
}


// Thunks
// Get all the characters associated with a user
export const getAllUserCharacters = () => async (dispatch) => {
    const response = await csrfFetch('/api/characters');
    const data = await response.json();
    dispatch(getCharacters(data.characters));
    return response;
};


// const dummyChar = {
//     id: 1,
//     name: "Eugene",
//     class: "Explorer",
//     userId: 1,
//     strength: 8,
//     dexterity: 7,
//     constitution: 8,
//     intelligence: 3,
//     wisdom: 5,
//     charisma: 7,
//     avatar: "https://cdn.discordapp.com/attachments/661999012873764935/839327174892060697/EUGENE_shorter_neck.png",
//     createdAt: "2021-05-07T16:14:17.270Z",
//     updatedAt: "2021-05-07T16:14:17.270Z",
// }

// Reducer
const initialState = { characters: {}, selectedChar: {}, currentHP: 18 };

const charactersReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CHARACTERS:
            newState = Object.assign({}, state); // Always copy, never alter
            action.payload.forEach(character => {
                newState.characters[character.id] = character;
            })
            return newState;
        case CLEAR_ALL_CHARACTERS:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.characters = {}
            return newState
        case SELECT_CHARACTER:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.selectedChar[action.payload.id] = action.payload
            return newState;
        case REMOVE_CHARACTER_FROM_STORE:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.selectedChar = {}
            return newState;
        case SET_HP:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.currentHP = action.payload
            return newState;
        case SET_ORIGINAL_HP:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.currentHP = action.payload
            return newState
        case REMOVE_HP:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.currentHP = {}
            return newState
        default:
            return state;
    }
};

export default charactersReducer;