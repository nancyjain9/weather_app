import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { WeatherCardUpcoming } from 'js/components/WeatherCardUpcoming/WeatherCardUpcoming';
import { weatherCardNumber as WeatherCardNumber } from 'js/components/WeatherCardHighLights/WeatherCardNumber';
import * as actionTypes from 'js/store/actions/types';
import { isEmpty, isArray } from 'lodash';

const WeatherContentPreloader = () => {
    return [ 1,2,3,4,5 ].map( () => {
        return(
            <article className='weather-card-upcoming preloader' ></article>
        )
    })
}

const WeatherHighLightsPreloader = () => {
    return [ 1,2,3,4 ].map( () => {
        return(
            <article className='card preloader'></article>
        )
    })
}

const WeatherDataPreloader = () => {
    return(
        <section className = 'weather-content'>
            <section className = 'weather-content__temp-buttons'>
                <button className = 'weather-content__temp-buttons__item preloader'></button>
                <button className = 'weather-content__temp-buttons__item preloader'></button>
            </section>
            <section className = 'weather-content__upcoming-days'>
                <WeatherContentPreloader/>
            </section>
            <section className = 'weather-content__highlights'>
                <section className = 'weather-content__highlights__content'>
                    <WeatherHighLightsPreloader/>
                </section>
            </section>
        </section>
    )
}


const getWeatherList = ( data ) => {
    const weatherInfo = data.length > 1 ? data.slice(1) : []
    return weatherInfo;
}


export const WeatherContent = ( props ) => {
    const data = useSelector((state) => state.weatherData.data );
    //const isLoading = useSelector((state) => state.weatherData.isLoading );
    const isCelcius = useSelector((state)=> state.weatherData.isCelsius );
    const dispatch = useDispatch();

    const cDegreeClassName = classNames('weather-content__temp-buttons__item', {
        'weather-content__temp-buttons__item--selected': isCelcius
    });
    const fDegreeClassName = classNames('weather-content__temp-buttons__item', {
        'weather-content__temp-buttons__item--selected': !isCelcius
    });


    //called when user clicks C button
    const setCDegree = useCallback( () => {
        dispatch({
            type: actionTypes.SET_C_DEGREE
        })
    },[dispatch] );

    //called when user clicks F button
    const setFDegree = useCallback( () => {
        dispatch({
            type: actionTypes.SET_F_DEGREE
        })
    },[dispatch] );
    

    const weatherData = !isEmpty( data ) ? getWeatherList( data.consolidated_weather ) : [];
    const todayData = !isEmpty( data ) ? data.consolidated_weather[0] : {};
    
    return(
        isEmpty( weatherData ) ? <WeatherDataPreloader/> :
        <section className = 'weather-content'>
            <section className = 'weather-content__temp-buttons'>
                <button className = { cDegreeClassName } onClick = { setCDegree }>
                    <span>°C</span>
                </button>
                <button className = { fDegreeClassName } onClick = { setFDegree }>
                     <span>°F</span>
                </button>
            </section>
            <section className = 'weather-content__upcoming-days'>
                {
                    !isEmpty( weatherData ) && isArray( weatherData ) && weatherData.length > 0 &&
                    weatherData.map( ( item, index ) => {
                        return (
                            <WeatherCardUpcoming
                             item = { item }
                             index ={ index }
                            />
                        )
                    })

                }

            </section>
            {
                !isEmpty( todayData ) &&
                <section className = 'weather-content__highlights'>
                    <h3 className='weather-content__highlights__heading'>Today's HighLights</h3>
                    <section className = 'weather-content__highlights__content'>
                        <WeatherCardNumber
                        title = { 'Wind status'}
                        unit = { 'mph'}
                        number = { Math.round( todayData.wind_speed ) }
                        showFigure= { true }
                        />
                        <WeatherCardNumber
                            title = {  'humidity' }
                            unit = { '%'}
                            number = { todayData.humidity }
                            showHumidityBar = { false }
                        />
                        <WeatherCardNumber
                            title = { 'Visibility'}
                            unit = { 'miles'}
                            number = { Math.round( todayData.visibility )}
                        />
                        <WeatherCardNumber
                            title = {  'Air Pressure' }
                            unit = { 'mb'}
                            number = { todayData.air_pressure }
                        />
                        
                </section>
            </section>
            }
            
        </section>
    )
}