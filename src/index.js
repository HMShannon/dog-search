import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import dogReducer from './store/reducers/dogReducer';

const store = createStore(dogReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
