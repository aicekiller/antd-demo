import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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


class CommentInput extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            content: ''
        }
    }

    componentWillMount() {
        if (localStorage.getItem('username')) this.state.username = localStorage.getItem('username');
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleContentChange(event) {
        event.target.value.replace();
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                time: +new Date()
            });
        }
        this.setState({content: ''})
    }

    componentDidMount() {
        this.textarea.focus();
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={(textarea) => {
                                this.textarea = textarea
                            }}
                            value={this.state.content}
                            onChange={this.handleContentChange.bind(this)}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button
                        onClick={this.handleSubmit.bind(this)}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}


class CommentList extends Component {

    static defaultProps = {
        comments: []
    }

    render() {
        return (
            <div>
                {
                    this.props.comments.map((comment, i) => {
                        return (
                            <Comment onDelete={this.props.onDelete.bind(this, i)} key={i} comment={comment}/>
                        )
                    })
                }

            </div>
        )
    }
}

class Comment extends Component {
    constructor() {
        super();
        this.state = {
            timeString: ''
        }
    }

    _updateTimeString() {
        const comment = this.props.comment;
        const duration = (+Date.now() - comment.time) / 1000;
        this.setState({
            timeString: duration > 60 ? `${Math.round(duration / 60)}分钟前` : `${Math.round(Math.max(duration, 1))}秒前`
        })
    }

    _getProcessedContent(content) {
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>');
    }

    componentWillMount() {
        this._updateTimeString();
        this._timer = setInterval(this._updateTimeString.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    render() {
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span>{this.props.comment.username} </span>：
                </div>
                <p dangerouslySetInnerHTML={{__html: this._getProcessedContent(this.props.comment.content)}}/>
                <div className='comment-delete' onClick={this.props.onDelete.bind(this)}>x</div>
                <div className='comment-createdtime'>{this.state.timeString}</div>
            </div>
        )
    }
}

ReactDOM.render(
    <CommentApp/>,
    document.getElementById('root')
)