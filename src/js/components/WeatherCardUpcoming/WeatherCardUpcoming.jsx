import React from 'react';
import { weatherIcon as WeatherIcon } from 'js/components/WeatherIcon/WeatherIcon';
import { convertDate } from 'js/utils/convertDate';
import { useSelector } from 'react-redux';
import { convertToF } from 'js/utils/convertToF';



export const WeatherCardUpcoming = ( props ) => {
    const isCelcius = useSelector((state) =>  state.weatherData.isCelsius );
    const { item, index } = props;
    const { min_temp, max_temp, applicable_date } = item;

    const changeTempValue = ( value ) => {
        let temp = Math.round(value);
        if (!isCelcius) {
            temp = Math.round(convertToF(value));
        }
        return temp;
    }
    //applicable_date -> yyyy-mm-dd
    const splitted = applicable_date.split('-'); //['yyyy','mm','dd]
    let rearranged = [];
    rearranged.push(splitted[1]);
    rearranged.push(splitted[2]);
    rearranged.push(splitted[0]); //['mm','dd','yyyy']
    const modifiedDate = rearranged.join('-'); //mm-dd-yyyy
    const newDate = new Date( modifiedDate );
    
    return (
        <article className='weather-card-upcoming'>
            <div className='weather-card-upcoming__date'>
                { 0 === index ? 'Tomorrow' : convertDate( newDate )}
            </div>
            <WeatherIcon
                status = {item.weather_state_abbr}
                iconClassName = {'weather-card-upcoming__icon'}
            />
            <div className='weather-card-upcoming__temp-range'>
                <span className='weather-card-upcoming__temp-range__item'>
                    { changeTempValue( min_temp ) }
                    <span>{ isCelcius ? '°C' : '°F' }</span>
                </span>
                <span className='weather-card-upcoming__temp-range__item'>
                    { changeTempValue( max_temp ) }
                    <span>{ isCelcius ? '°C' : '°F' }</span>
                </span>
            </div>
        </article>
    )
}