import { call, put, takeLatest } from 'redux-saga/effects';
import { queryFetchData, queryFetchLocation } from './queries';
import * as actionTypes from './actions/types';

/*
 takeEvery
  Starts fetchData on each dispatched `FETCH_DATA` action.
  Allows concurrent fetches of data.
*/
function* fetchDataHandler(params) {
    const { payload } = params;

    try {
        const response = yield call(queryFetchData, payload);

        if (response) {
            yield put({
                type: actionTypes.FETCH_DATA_SUCCESS,
                payload: response,
            });
        }
    } catch (error) {
        yield put({
            type: actionTypes.FETCH_DATA_FAIL,
            payload: { message: error },
        });
    }
}


/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of data. If "FETCH_DATA" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export function* fetchData() {
    yield takeLatest(actionTypes.FETCH_DATA, fetchDataHandler);
}

function* fetchPlacesHandler(params) {
    const { payload } = params;

    try {
        const response = yield call(queryFetchLocation, payload);

        if (response) {
            yield put({
                type: actionTypes.FETCH_PLACES_SUCCESS,
                payload: response,
            });
        }
    } catch (error) {
        yield put({
            type: actionTypes.FETCH_PLACES_FAIL,
            payload: { message: error },
        });
    }
}


export function* fetchPlaces() {
    yield takeLatest(actionTypes.FETCH_PLACES, fetchPlacesHandler);
}
