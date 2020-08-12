import React, { useState, Fragment, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyLocationIcon from 'assets/images/myLocation.png';
import location from 'assets/images/location.png';
import { weatherIcon as WeatherIcon } from 'js/components/WeatherIcon/WeatherIcon';
import { SearchBar } from 'js/components/SearchBar/SearchBar';
import * as actionTypes from 'js/store/actions/types';
import { isEmpty } from 'lodash';
import { convertToF } from 'js/utils/convertToF';
import { convertDate } from 'js/utils/convertDate';

const SideBarPreloader = () => {
    return(
      <section className = 'sidebar__main weather-now preloader'></section>
    )
  }

export const SideBar = ( props ) => {
    const { setLocation } = props;
    const [isSearchOpen, setIsSearchBarOpen ] = useState(false);
    const data = useSelector((state) => state.weatherData.data );
    const isCelcius = useSelector((state)=> state.weatherData.isCelsius );
    const dispatch = useDispatch();

    const todayData = !isEmpty( data ) ? data.consolidated_weather[0] : {};

    //open search bar view
    const openSearchBar = () => {
        setIsSearchBarOpen(true);
    }
    //close search bar view
    const closeSearchBar = () => {
        setIsSearchBarOpen(false);
    }

    //Clears all places and data
    const clearAllData = useCallback( () =>{
        dispatch({ type: actionTypes.CLEAR_PLACES} );
        dispatch({ type: actionTypes.CLEAR_DATA } );

    }, [ dispatch ] );


    const getMyLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function getPosition(position) {
                const latlong = `${position.coords.latitude},${position.coords.longitude}`;
                clearAllData();
                setLocation(latlong);
            });
        }
    };

    const changeTempValue = ( value ) => {
        let temp = Math.round(value);
        if (!isCelcius) {
            temp = Math.round(convertToF(value));
        }
        return temp;
    }
    
    return(
        
        <aside 
        className = 'sidebar'
        >
            {
                isSearchOpen && 
                <SearchBar
                    isOpen = { isSearchOpen }
                    closeSearchBar = { closeSearchBar }
                />
            }
            

            {  !isSearchOpen &&
                <Fragment>
                    <header className='sidebar__header'>
                        <button 
                            className='sidebar__header__search-button'
                            onClick = { openSearchBar }
                        >
                            Search for places
                        </button>
                        <button className='sidebar__header__set-my-location'>
                            <img 
                            src = { MyLocationIcon }
                            alt = {'Get my location'}
                            onClick = { getMyLocation }
                            ></img>
                        </button>
                    </header>
                    {
                        isEmpty(data) ? <SideBarPreloader/> :
                        <section className = 'sidebar__main weather-now'>
                            <div className='weather-now__icon'>
                                <WeatherIcon
                                    status = { todayData.weather_state_abbr }
                                />
                            </div>
                            <div className='weather-now__temperature'>
                                {
                                    changeTempValue( todayData.the_temp )
                                }
                                <span className='weather-now__temperature__degree'>{ isCelcius ? '°C' : '°F'}</span>
                            </div>
                            <div className='weather-now__status'>{ todayData.weather_state_name }</div>
                            <div className='weather-now__date'>
                                <span className = 'weather-now__date__today'>Today</span>
                                <span className = 'weather-now__date__today'>{ convertDate(todayData.created)}</span>
                            </div>
                            <div className='weather-now__location'>
                                <span className='weather-now__location__icon'>
                                    <img src={location} alt={'location'} width={10}></img>
                                </span>
                                <span className='weather-now__location__place'>{ data.title }</span>
                            </div>
                    </section>
                    }
                    
                </Fragment>
            }
        </aside>
    )
}