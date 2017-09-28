/**
 * Created by weizhiqiang on 2017/9/22.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import routesconfig from './routers';

ReactDOM.render(
    <Router>
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