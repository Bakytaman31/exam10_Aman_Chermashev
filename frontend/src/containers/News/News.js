import React, {Component} from 'react';
import {connect} from "react-redux";
import NewsCard from "../../components/NewsCard/NewsCard";
import {deletePost, getNews} from "../../store/actions/newsActions";
import './News.css';

class News extends Component {

    componentDidMount() {
        this.props.getNews();
    };

    render() {
        return (
            <div className="News">
                {this.props.news.map(news => (
                    <NewsCard
                        key={news.id}
                        img={news.image}
                        id={news.id}
                        title={news.title}
                        datetime={news.datetime}
                        deletePost={this.props.deletePost}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    news: state.news
});

const mapDispatchToProps = dispatch => ({
    deletePost: id => dispatch(deletePost(id)),
    getNews: () => dispatch(getNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(News);