import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

const removeUser = () => {
    return {
        type: REMOVE_USER,
    };
};

// Thunks
export const login = (user) => async (dispatch) => {
    const { credential, password } = user; // Credential is either email or username
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};


// Reducer
const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;