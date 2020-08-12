import * as actionTypes from '../actions/types';

//import { act } from "react-dom/test-utils";

const INITIAL_STATE = {
    data: null,
    places: null,
    isLoading: true,
    isCelsius: true,

    // Error Message
    fetchDataFailMessage: null,
    fetchPlacesFailMessage: null,
};

export const weatherDataAndPlacesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
            };

        case actionTypes.FETCH_DATA_FAIL:
            return {
                ...state,
                fetchDataFailMessage: action.message,
                isLoading: false,
            };

        case actionTypes.FETCH_PLACES_SUCCESS:
            return {
                ...state,
                places: action.payload,
                isLoading: false,
            };

        case actionTypes.FETCH_PLACES_FAIL:
            return {
                ...state,
                fetchPlacesFailMessage: action.message,
                isLoading: false,
            };

        case actionTypes.CLEAR_PLACES:
            return {
                ...state,
                places: null,
            };

        case actionTypes.CLEAR_DATA:
            return {
                ...state,
                data: null,
            };

        case actionTypes.SET_C_DEGREE:
            return {
                ...state,
                isCelsius: true,
            };

        case actionTypes.SET_F_DEGREE:
            return {
                ...state,
                isCelsius: false,
            };

        default:
            return state;
    }
};

