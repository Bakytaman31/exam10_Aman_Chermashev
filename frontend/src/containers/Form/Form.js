import React, {Component} from 'react';
import {connect} from "react-redux";
import {postNews} from "../../store/actions/newsActions";

class Form extends Component {

    state = {
      title: '',
      content:'',
      image: '',
      datetime: new Date(),
    };

    onChangeText = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    submitFormHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.postNews(formData);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <form onSubmit={this.submitFormHandler}>
                    <h1>Add new post</h1>
                        <h3>Title</h3>
                        <input type="text"
                               name="title"
                               required
                               autoComplete="off"
                               value={this.state.title}
                               onChange={this.onChangeText}/>
                        <h3>Content</h3>
                        <textarea name="content"
                                  required
                                  autoComplete="off"
                                  cols="30"
                                  rows="10"
                                  value={this.state.content}
                                  onChange={this.onChangeText}/>
                        <h3>Image</h3>
                        <input type="file" name="image" onChange={this.fileChangeHandler}/>
                        <button type="submit" className="btn btn-success">Save</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToPros = dispatch => ({
    postNews: news => dispatch(postNews(news)),
});

export default connect(null, mapDispatchToPros)(Form);