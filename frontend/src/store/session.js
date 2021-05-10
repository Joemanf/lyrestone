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
// Log in user
export const login = (user) => async (dispatch) => {
    const { credential, password } = user; // Credential is either email or username
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            credential,
            password,
        }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

// Make sure user stays logged in between page renders and refreshes
export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

// Sign up user
export const signup = (user) => async (dispatch) => {
    let { image, username, email, password } = user;
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);

    // // for multiple files
    // if (images && images.length !== 0) {
    //     for (let i = 0; i < images.length; i++) {
    //         formData.append("images", images[i]);
    //     }
    // }

    // for single file

    if (image) {
        formData.append("image", image);
        const response = await csrfFetch("/api/users/signup", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "application/json",
                'Something_random': 'Something_less_random'
            },
            // body: JSON.stringify(formData),
        });
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
    else {
        const response = await csrfFetch("/api/users/signup", {
            method: "POST",
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password,
                // throw a placeholder image here
            }),
        });
        const data = await response.json();
        dispatch(setUser(data.user));
        return response;
    }
};

// Log out
export const logout = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    dispatch(removeUser());
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