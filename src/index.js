import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects'

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery(`GET_MOVIE`, getMovieSaga)
    yield takeEvery(`SELECT_MOVIE`, selectMovieSaga)
}

// Handle GET request and response from DB
function* getMovieSaga(){
    try {
        const getResponse = yield axios.get(`/movie`);
        yield put({ type: 'SET_MOVIES', payload: getResponse.data });
    }
    catch ( error ){
        console.log('Error with GET saga request', error);
    }
}

// Handle selected movie GET request and response from DB
function* selectMovieSaga(action){   
    let id = action.payload; 
    try {
        const getResponse = yield axios.get(`/movie/${id}`);
        yield put({ type: 'SET_GENRES', payload: getResponse.data });
    }
    catch ( error ){
        console.log('Error with select GET saga request', error);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
