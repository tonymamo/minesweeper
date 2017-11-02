import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

import rootReducer from './redux/index';
import logger from './redux/logger';

let middleware = [
    thunk,
    apiMiddleware,
    logger,
];

export const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if ( module.hot ) {
        module.hot.accept('./redux', () => {
            const nextReducer = require('./redux').default;
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
