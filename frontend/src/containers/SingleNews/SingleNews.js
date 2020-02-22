import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteComment, getComments, getSingleNews, postComment} from "../../store/actions/newsActions";
import CommentCard from "../../components/CommentCard/CommentCard";

class SingleNews extends Component {

    state = {
        name: '',
        comment: ''
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        this.props.getSingleNews(id)
    };

    onChangeText = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    onSubmit = event => {
        event.preventDefault();
        const id = this.props.match.params.id;
        const comment = {name: this.state.name, comment: this.state.comment, newsId: id};
        this.props.postComment(comment, id);
        this.props.getComments(id);
    };

    deleteCommentHandler = id => {
        const newsId = this.props.match.params.id;
        this.props.deleteComment(id);
        this.props.getComments(newsId);
    };

    render() {
        return (
            <div>
                <h1>{this.props.singleNews.title}</h1>
                <p>{this.props.singleNews.datetime}</p>
                <p>{this.props.singleNews.content}</p>
                <div>
                    <h2>Comments</h2>
                    {this.props.comments.map(comment => (
                        <CommentCard
                            key={comment.id}
                            name={comment.name}
                            comment={comment.comment}
                            id={comment.id}
                            deleteComment={this.deleteCommentHandler}
                        />
                    ))}
                    <div>
                        <h4>Add comment</h4>
                        <form onSubmit={this.onSubmit}>
                            <p><input type="text"
                                      name="name"
                                      placeholder="Name"
                                      autoComplete="off"
                                      onChange={this.onChangeText}/></p>
                            <textarea name="comment"
                                      cols="30"
                                      rows="10"
                                      placeholder="Comment"
                                      onChange={this.onChangeText}
                            />
                            <button type="submit" className="btn btn-success">Add</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    singleNews: state.singleNews,
    comments: state.comments,
});

const mapDispatchToProps = dispatch => ({
    getSingleNews: id => dispatch(getSingleNews(id)),
    postComment: (comment, id) => dispatch(postComment(comment, id)),
    deleteComment: id => dispatch(deleteComment(id)),
    getComments: id => dispatch(getComments(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleNews);