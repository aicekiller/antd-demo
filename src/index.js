/**
 * Created by weizhiqiang on 2017/9/22.
 */

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Input extends Component {

    render() {
        return (
            <div>
                <input onChange={this.props.changeValue.bind(this)} type='number'/>
            </div>
        )
    }
}

class PercentageShower extends Component {


    render() {
        return (
            <div>
                <div>{this.props.value}</div>
            </div>
        )
    }
}

class PercentageApp extends Component {

    constructor() {
        super();
        this.state = {
            num: ''
        }
    }

    handleInput(e) {
        var num = ((e.target.value * 10000) / 100).toFixed(2) + '%';
        this.setState({
            num: num
        })
    }

    render() {
        return (
            <div>
                <Input changeValue={this.handleInput.bind(this)}/>
                <PercentageShower value={this.state.num}/>
            </div>
        )
    }
}

ReactDOM.render(
    React.createElement(PercentageApp,null),
    //<PercentageApp />,
    document.getElementById('root')
)