import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import reducers from './reducers';
import MainContainer from './components/containers/main-container';

require('../scss/app.scss');

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

if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
        // eslint-disable-next-line global-require
        const nextRootReducer = require('./reducers');
        store.replaceReducer(nextRootReducer);
    });
}

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

render(MainContainer);
if (module.hot) {
    module.hot.accept('./components/containers/main-container', () => {
        // eslint-disable-next-line global-require
        const nextMain = require('./components/containers/main-container').default;
        render(nextMain);
    });
}
