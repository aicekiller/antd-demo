/**
 * Created by weizhiqiang on 2017/9/22.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import routesconfig from './routers';

const history = createHistory();

ReactDOM.render(
    <Router history={history}>
        <div>
            {
                routesconfig.map((item, index) => {
                    return (
                        <Route key={index} path={item.path} component={item.component}></Route>
                    )
                })
            }
        </div>
    </Router>,
    document.getElementById('root')
)