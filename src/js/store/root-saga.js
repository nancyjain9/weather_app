import { all, call } from 'redux-saga/effects';
import { fetchData, fetchPlaces } from './saga';

// The Component dispatches a plain Object action to the Store. 
//We'll create a Saga that watches for all USER_FETCH_REQUESTED actions and
// triggers an API call to fetch the user data.

export default function* rootSaga() {
    yield all([call(fetchData), call(fetchPlaces)]);
}

