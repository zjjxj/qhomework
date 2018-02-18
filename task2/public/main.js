import React from 'react'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import App from './containers/todoList'
import todoList from './reducer/todoList'

let store = createStore(todoList);

let rootElement = document.getElementById('content');

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    rootElement
);