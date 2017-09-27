import React, {Component} from 'react';

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

export default Comment;