import { csrfFetch } from './csrf';

// Actions
const GET_STORIES = 'stories/getStories';
const CLEAR_CURRENT_STORY = 'stories/clearCurrentStory';
const CLEAR_STORIES = 'stories/clearStories';
const GET_THIS_STORY = 'stories/getThisStory';

const getStories = (story) => {
    return {
        type: GET_STORIES,
        payload: story,
    };
};

export const clearStories = () => {
    return {
        type: CLEAR_STORIES
    }
}

const getThisStory = (story) => {
    return {
        type: GET_THIS_STORY,
        payload: story
    }
}

export const clearCurrentStory = () => {
    return {
        type: CLEAR_CURRENT_STORY
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

//Edit a story's contents
export const editStory = (storyId, userId, title, description, thumbnail, published) => async (dispatch) => {
    // Throw AWS stuff here
    const response = await csrfFetch(`/api/stories/edit/${storyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId,
            title,
            description,
            thumbnail,
            published
        })
    })
    const data = await response.json();
    dispatch(getThisStory(data))
    return data
}

// Delete a story
export const deleteStory = (id) => async (dispatch) => {
    const response = await csrfFetch('/api/stories/delete-story', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    const data = await response.json()
    // console.log('Is parent null?', data.parent)
    // getCurrentScene(parent)
    // dispatch(getThisScene(data.parent))
    clearStories()
    getAllStories()
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
        case CLEAR_CURRENT_STORY:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.currentStory = {}
            return newState
        case CLEAR_STORIES:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.stories = {}
            return newState
        case GET_THIS_STORY:
            newState = Object.assign({}, state); // Always copy, never alter
            newState.currentStory = action.payload
            return newState;
        default:
            return state;
    }
};

export default storiesReducer;