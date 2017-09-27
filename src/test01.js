import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Card extends Component {
    render() {
        return (
            <div className='card'>
                <div className='card-content'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
const loadAndRefresh = (url) => {
    return (WrappedComponent) => {
        class NewComponent extends Component {
            constructor() {
                super();
                this.state = {
                    content: ''
                }
            }

            componentWillMount() {
                this._loadingData();
            }

            async _loadingData() {
                this.setState({
                    content: '数据加载中...'
                });
                const content = await getData(url);
                this.setState({content});
            }

            handleData() {
                this._loadingData();
            }

            render() {
                return (
                    <WrappedComponent
                        content={this.state.content}
                        refresh={this.handleData.bind(this)}
                        {...this.props}
                    />
                )
            }
        }
        return NewComponent;
    }
}
const makeProvider = (data) => (Post) => {
    class NewComponent extends Component {
        static childContextTypes = {
            data: PropTypes.any.isRequired
        }

        constructor() {
            super();
            this.state = {
                data: data
            }
        }

        getChildContext() {
            return this.setState({
                data: this.state.data
            })
        }

        render() {
            return (
                <Post
                    {...this.props}
                />
            )
        }
    }
    return NewComponent;
}
class EventEmitter {
    on(eventName, func) {
        window.addEventListener(eventName, func, false);
    }

    emit(eventName, arg1, arg2, ...rest) {

    }

    off(eventName, func) {

    }
}

ReactDOM.render(
    <Card>
        <h2>React.js 小书</h2>
        <div>开源、免费、专业、简单</div>
        订阅：<input />
    </Card>,
    document.getElementById('root')
)