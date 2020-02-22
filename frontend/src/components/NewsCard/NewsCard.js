import React from 'react';
import {NavLink} from "react-router-dom";
import './NewsCard.css';
import imageNotAvailable from '../../assets/images/sorry-image-not-available.jpg';

 let img;
const NewsCard = props => {
    if (props.img === '') {
        img = imageNotAvailable;
    } else {
        img = 'http://localhost:8001/uploads/' + props.img;
    }
    return (
        <div className="NewsCard">
            <img src={img} alt="#"/>
            <h4>{props.title}</h4>
            <p>{props.datetime}</p>
            <NavLink to={`/news/${props.id}`}>Read Full Post</NavLink>
            <button onClick={() => props.deletePost(props.id)}>Delete</button>
        </div>
    );
};

export default NewsCard;