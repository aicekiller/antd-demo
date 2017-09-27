import React, {Component} from 'react';
import Comment from './comment';

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

export default CommentList;