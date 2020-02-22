import {GET_COMMENTS_SUCCESS, GET_NEWS_SUCCESS, GET_SINGLE_NEWS_SUCCESS} from "../actions/actionTypes";

const initialState = {
    news: [],
    comments: [],
    singleNews: {}
};

const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS_SUCCESS:
            return {
                ...state,
                news: action.news
            };
        case GET_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.comments
            };
        case GET_SINGLE_NEWS_SUCCESS:
            return {
                ...state,
                singleNews: action.singleNews
            };
        default:
            return state;
    }
};

export default newsReducer;