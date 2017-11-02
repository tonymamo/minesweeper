import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './stylesheets/styles.css';

import AppContainer from './App/AppContainer';
import configureStore from '../src/configureStore.js';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
    <AppContainer/>
</Provider>, document.getElementById('root'));

registerServiceWorker();
