import React, { useState, useEffect, useCallback } from 'react';
import closeIcon from 'assets/images/cancel.png';
import { SearchResultItem } from 'js/components/SearchResultItem/SearchResultItem';
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from 'js/store/actions/types';
import { isArray, isEmpty } from 'lodash';

export const SearchBar = ( props ) => {
    const [ searchValue, setSearchValue ] = useState('');
    const [ submitted, setSubmitted ] = useState(false);
    const { closeSearchBar } = props;
    const dispatch = useDispatch();

    //accessing places from store
    const places = useSelector((state) => state.weatherData.places);

    //clear places initially
    useEffect(() => {
        clearPlaceData();
    }, []);


    //if data is submitted, fetches places based on user search
    useEffect( ()=>{
        if( submitted ){
            getPlacesData(searchValue)
            setSubmitted(false)
        }
       
    }, [submitted] )

    //Called when user types in search box
    const onInputSearchChange = ( event ) => {
        setSearchValue(event.target.value)
    }

    //Called when user clicks search button
    const handleSearchClick = ( event ) => {
        onSubmit(event)
    }

    //Called when user presses enter or submits the form
    const onSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
    };

    //Called to fetch places based on user search value
    const getPlacesData = useCallback(
        ( searchValue ) => {
            dispatch( {
                type: actionTypes.FETCH_PLACES,
                payload: {
                    value: searchValue,
                    isName: true
                }
            } )
        },[dispatch]
    );

    const clearPlaceData = useCallback(
        () => dispatch({ type: actionTypes.CLEAR_PLACES }),
        [dispatch]
    );


    return(
        <section className='searchBar'>
            <div className='close-button' onClick = { closeSearchBar }>
                <img src={ closeIcon } alt={'close button'} width = {15}></img>
            </div>
            <form className='searchBar__form' onSubmit = { onSubmit }>
                <div className='searchBar__form__input-container'>
                    <input
                    placeholder='Search Location'
                    value = { searchValue }
                    className ='searchBar__form__input-container__input'
                    onChange = { onInputSearchChange }
                    />
                </div>
                <button
                className='searchBar__form__search-button'
                onClick = { handleSearchClick }
                >
                    Search
                </button>
            </form>
            <section className ='searchBar__list-container'>
                { !isEmpty( places ) && <div className = 'searchBar__list-container__title'>Recent Searches</div> }
                {
                    isArray( places ) && places.map( ( place ) => {
                        return (
                            <SearchResultItem
                                place = { place }
                                closeSearchBar = { closeSearchBar }
                            />
                        )
                    })
                }
            </section>

        </section>
    )
}