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
    console.log('Data in getAllStories', data)
    dispatch(getStories(data.stories));
    return response;
};


// Reducer
const initialState = { stories: {} };

const storiesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_STORIES:
            console.log('Action payload', action.payload)
            newState = Object.assign({}, state); // Always copy, never alter
            action.payload.forEach(story => {
                console.log(newState.stories, story.id)
                newState.stories[story.id] = story;
            })
            console.log('THE NEW STATE: ', newState)
            return newState;
        default:
            return state;
    }
};

export default storiesReducer;