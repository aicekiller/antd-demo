import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CommentApp extends Component {
    constructor() {
        super();
        this.state = {
            list: []
        }
    }

    handleCommentSubmit(comment) {
        this.state.list.push(comment);
        this.setState({
            list: this.state.list
        })
    }

    render() {
        return (
            <div className="wrapper">
                <CommentInput onCommentSubmit={this.handleCommentSubmit.bind(this)}/>
                <CommentList dataList={this.state.list}/>
            </div>
        )
    }
}

class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            content: ''
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let author = this.state.author.trim();
        let content = this.state.content.trim();
        if (!author || !content) {
            return;
        }
        this.props.onCommentSubmit({author, content});
        this.setState({
            author: '',
            content: ''
        })

    }

    handleInputAuther(e) {
        this.setState({
            author: e.target.value
        })
    }

    handleContent(e) {
        this.setState({
            content: e.target.value
        })
    }

    render() {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <div className="commentInputFormc1">
                    <label htmlFor="">用户名：</label>
                    <input type="text" onChange={this.handleInputAuther.bind(this)}/>
                </div>
                <div className="commentInputFormc2">
                    <label htmlFor="">评论内容</label>
                    <textarea defaultValue={'123'} name="" id="" cols="30" rows="10"
                              onChange={this.handleContent.bind(this)}></textarea>
                </div>
                <input type="submit" value="发布"/>
            </form>
        )
    }
}

class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Comment list={this.props.dataList}/>
            </div>
        )
    }
}

class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>{
                this.props.list.length ?
                    this.props.list.map((comment,index) => {
                        return (
                            <div key={index}>
                                <span>{comment.author}</span><span>{comment.content}</span>
                            </div>
                        )
                    }) : null
            }
            </div>
        )
    }
}
ReactDOM.render(
    <CommentApp />,
    document.getElementById('root')
)