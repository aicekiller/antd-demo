import React, {Component, PropTypes} from 'react';

import CommentInput from './commentInput';
import CommentList from './commentsList';
import wrapWithLoadData from './localStorageActions';
import './comments.css';


class CommentApp extends Component {

    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            comments: props.data
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
        this.props.saveData(this.state.comments);


    }

    handleDeleteComments(i) {
        this.state.comments.splice(i, 1);
        this.setState({
            comments: this.state.comments
        });
        this.props.saveData(this.state.comments);
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

CommentApp = wrapWithLoadData(CommentApp, 'comments');
export default CommentApp;