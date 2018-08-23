import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import reducer from '../client/reducers/reducers.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

console.log('App from inside index.js: ', App);

const store = createStore(
    reducer,
    composeWithDevTools()
)

console.log('store created', store.getState());

render (
    <Provider store = {store}>
        <App/>
    </Provider>,
    document.getElementById('content')
)


