import React, {Component} from 'react';

class TodoList extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="todoList">
                <div className="todoListC1">
                    <div><input type="text"/></div>
                    <button>输入</button>
                </div>
                <ul>

                </ul>
            </div>
        )
    }
}

export default TodoList;