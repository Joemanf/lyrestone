import { csrfFetch } from './csrf';

// Actions
const GET_STORIES = 'stories/getStories';

const getStories = (story) => {
    return {
        type: GET_STORIES,
        payload: story,
    };
};


// Thunks
// Log in user
export const getAllStories = () => async (dispatch) => {
    const response = await csrfFetch('/api/stories');
    const data = await response.json();
    dispatch(getStories(data));
    return response;
};


// Reducer
const initialState = { stories: null };

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_STORIES:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.stories = action.payload;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;