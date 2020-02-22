import {GET_COMMENTS_SUCCESS, GET_NEWS_SUCCESS, GET_SINGLE_NEWS_SUCCESS} from "./actionTypes";
import axiosApp from "../../axios-app";

export const getNewsSuccess = news => ({type: GET_NEWS_SUCCESS, news});
export const getCommentsSuccess = comments => ({type: GET_COMMENTS_SUCCESS, comments});
export const getSingleNewsSuccess = singleNews => ({type: GET_SINGLE_NEWS_SUCCESS, singleNews});

export const getNews = () => {
    return async (dispatch) => {
        const response = await axiosApp.get('/news');
        dispatch(getNewsSuccess(response.data));
    }
};

export const getComments = id => {
    return async (dispatch) => {
        const response = await axiosApp.get(`/comments?newsId=${id}`);
        console.log(response.data);
        dispatch(getCommentsSuccess(response.data));
    }
};

export const getSingleNews = id => {
    return async (dispatch) => {
        const response = await axiosApp.get(`/news/${id}`);
        dispatch(getSingleNewsSuccess(response.data));
        dispatch(getComments(id));
    }
};

export const postNews = news => {
    return async (dispatch) => {
        await axiosApp.post('/news', news);
        dispatch(getNews());
    }
};

export const postComment = (comment, id) => {
    return async (dispatch) => {
        await axiosApp.post('/comments', comment);
        dispatch(getComments(id));
    }
};

export const deletePost = id => {
    return async (dispatch) => {
        await axiosApp.delete(`/news/${id}`);
        dispatch(getNews());
    }
};

export const deleteComment = (id, newsId) => {
    return async (dispatch) => {
        await axiosApp.delete(`/comments/${id}`);
        dispatch(getComments(newsId));
    }
};