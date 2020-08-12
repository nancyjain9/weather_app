import React from 'react';
import { compose } from "recompose";
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider  } from 'react-redux';

import { combinedReducers } from './reducers';
import rootSaga from './root-saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

// mount it on the Store
export const store = createStore(
  combinedReducers,
  compose(applyMiddleware(...middleware))
);

//export store
export const getStore = () => { return store.getState() };

//export dispatch
export const dispatch =  store.dispatch ;

// then run the saga
//To run our Saga, we'll have to connect it to the Redux Store using the redux-saga middleware.
sagaMiddleware.run(rootSaga);

export const withStore = ( Component ) => {
    return ( props ) => {
        return (
            <Provider store = { store } >
                <Component { ...props } />
            </Provider>
        );
    };
};

