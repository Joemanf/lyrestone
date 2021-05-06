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
    console.log('Data in getAllStories', data)
    dispatch(getStories(data.stories));
    return response;
};

//Get the story that the user is on
export const getCurrentStory = (storyId) => async (dispatch) => {
    const response = await csrfFetch(`/api/stories/${storyId}`);
    const data = await response.json();
    console.log('Data in getCurrentStory: ', data);
    dispatch(getThisStory(data.story));
    return response
}


// Reducer
const initialState = { stories: {}, currentStory: {} };

const storiesReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_STORIES:
            newState = Object.assign({}, state); // Always copy, never alter
            action.payload.forEach(story => {
                console.log(newState.stories, story.id)
                newState.stories[story.id] = story;
            })
            return newState;
        case GET_THIS_STORY:
            newState = Object.assign({}, state); // Always copy, never alter
            console.log('Payload in GET_THIS_STORY: ', action.payload)
            newState.currentStory = action.payload
            return newState;
        default:
            return state;
    }
};

export default storiesReducer;