
import { weatherDataAndPlacesReducer } from './weatherDataAndPlaces';
import { combineReducers } from 'redux';

export const combinedReducers = combineReducers( {
    weatherData: weatherDataAndPlacesReducer
} );