/**
 * Created by weizhiqiang on 2017/9/22.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import routesconfig from './routers';

ReactDOM.render(
    <Router>
        <div>
            {
                routesconfig.map((item) => {
                    return (
                        <Route path={item.path} component={item.component}></Route>
                    )
                })
            }
        </div>
    </Router>,
    document.getElementById('root')
)