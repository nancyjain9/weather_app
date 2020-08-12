import React, { useCallback } from 'react';
import rightArrow from 'assets/images/right-arrow.png';
import { useDispatch } from 'react-redux';
import * as actionTypes from 'js/store/actions/types';

export const SearchResultItem = ( props ) => {
    const { place, closeSearchBar } = props;
    const dispatch = useDispatch();

    //fetches data based on place
    const getData = useCallback(
        (place) => {
            dispatch({
                type: actionTypes.FETCH_DATA,
                payload: {
                    locationID: place && place.woeid,
                },
            });
        },
        [dispatch]
    );
    
    //clears data
    const clearData = useCallback(() => {
        dispatch({
            type: actionTypes.CLEAR_DATA,
        });
    }, [dispatch]);

    return(
        <article 
        className = 'searchBar__list-container__list' 
        onClick={ 
            () => {
                clearData();
                closeSearchBar();
                getData( place );
            }
        }
        >
            <span>{ place.title }</span>
            <span className = 'searchBar__list-container__list__icon'>
                <img src={ rightArrow } alt={ 'right arrow'}></img>
            </span>
        </article>
    )
}