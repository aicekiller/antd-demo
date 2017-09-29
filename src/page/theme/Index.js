import React, {Component} from 'react';
import Header from './Header';
import Content from './Content';
import {Provider} from './react-redux';
import './index.css';

function createStore(reducer) {
    let state = null;
    const listeners = [];
    const subscribe = listener => listeners.push(listener);
    const getState = () => state;
    const dispatch = action => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }
    dispatch({});
    return {getState, subscribe, dispatch}
}

const themeReducer = (state, action) => {
    if (!state) return {
        themeColor: 'red'
    }
    switch (action.type) {
        case 'CHANGE_COLOR':
            return {...state, themeColor: action.themeColor}
        default:
            return false
    }
}

const store = createStore(themeReducer);

class Index extends Component {

    render() {
        return (
            <Provider store={store}>
                <Header />
                <Content />
            </Provider>
        )
    }
}

export default Index;