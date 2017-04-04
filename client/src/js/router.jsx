import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import MainContainer from './components/containers/main-container';

/* eslint-disable no-underscore-dangle */
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

const history = createHashHistory();
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(routerMiddleware(history))
    )
);

export default () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <MainContainer />
        </ConnectedRouter>
    </Provider>
);
