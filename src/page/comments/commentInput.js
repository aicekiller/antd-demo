import React, {Component} from 'react';
import PropTypes from 'prop-types';

import wrapWithLoadData from './localStorageActions';

class CommentInput extends Component {

    static propTypes = {
        onSubmit: PropTypes.func,
        data: PropTypes.string,
        saveData: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            username: props.data,
            content: ''
        }
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleContentChange(event) {
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
        this.setState({content: ''});
        this.props.saveData(this.state.username);
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

CommentInput = wrapWithLoadData(CommentInput, 'username');
export default CommentInput;