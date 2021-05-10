import { csrfFetch } from './csrf';

// Actions
const GET_STORIES = 'stories/getStories';
const GET_THIS_STORY = 'stories/getThisStory'

const getStories = (story) => {
    return {
        type: GET_STORIES,
        payload: story,
    };
};

const getThisStory = (story) => {
    return {
        type: GET_THIS_STORY,
        payload: story
    }
}


// Thunks
// Get every story
export const getAllStories = () => async (dispatch) => {
    const response = await csrfFetch('/api/stories');
    const data = await response.json();
    dispatch(getStories(data.stories));
    return response;
};

//Get the story that the user is on
export const getCurrentStory = (storyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stories/${storyId}`);
    const data = await response.json();
    dispatch(getThisStory(data.story));
    return response
}

//Make a new story when the user clicks the button
export const makeStory = (userId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Change this to FormData and set it up that way
        body: JSON.stringify({
            userId,
        })
    })
    const data = await response.json();
    dispatch(getThisStory(data))
    return data
}


// Reducer
const initialState = { stories: {}, currentStory: {} };

const storiesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_STORIES:
            newState = Object.assign({}, state); // Always copy, never alter
            action.payload.forEach(story => {
                newState.stories[story.id] = story;
            })
            return newState;
        case GET_THIS_STORY:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.currentStory = action.payload
            return newState;
        default:
            return state;
    }
};

export default storiesReducer;