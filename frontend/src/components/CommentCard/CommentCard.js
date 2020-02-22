import React from 'react';

const CommentCard = props => {
    return (
        <div id={props.id}>
            <p>{props.name}: {props.comment}</p>
            <button onClick={() => props.deleteComment(props.id)}>Delete</button>
        </div>
    );
};

export default CommentCard;