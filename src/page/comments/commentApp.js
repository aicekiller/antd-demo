import React, {Component} from 'react';

import CommentInput from './commentInput';
import CommentList from './commentsList';
import './comments.css';


class CommentApp extends Component {
    constructor() {
        super();
        this.state = {
            comments: []
        }
    }

    componentWillMount() {
        if (localStorage.getItem('comments')) {
            this.state.comments = JSON.parse(localStorage.getItem('comments'));
        }
    }

    handleSubmitComment(comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        this.state.comments.push(comment);
        this.setState({
            comments: this.state.comments
        });
        localStorage.setItem(
            'comments', JSON.stringify(this.state.comments)
        )
        localStorage.setItem(
            'username', comment.username
        )

    }

    handleDeleteComments(i) {
        this.state.comments.splice(i, 1);
        this.setState({
            comments: this.state.comments
        });
        localStorage.setItem(
            'comments', JSON.stringify(this.state.comments)
        );
    }

    render() {
        return (
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
                <CommentList onDelete={this.handleDeleteComments.bind(this)} comments={this.state.comments}/>
            </div>
        );
    }
}

export default CommentApp;