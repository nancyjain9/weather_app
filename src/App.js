import React, { useState, useCallback, useEffect } from 'react';
import { SideBar } from 'js/components/SideBar/SideBar';
import {  WeatherContent } from 'js/components/WeatherContent/WeatherContent';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'js/store/actions/types';
import { isEmpty } from 'lodash';

function App() {
  const [place, setPlace] = useState(null);
  const [location, setLocation] = useState(null);
  const places = useSelector( ( state ) =>  state.weatherData.places );
  const dispatch = useDispatch();

  //Called when the application is mounted
  //checks if the device supports geolocation, gets latitude and longitude
  //setLocation in the state
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( function getPosition(position){
        const latlong = `${position.coords.latitude},${position.coords.longitude}`
        setLocation(latlong)
      })
    }
  }, [])


  // if there are places and location, fetches places in that location
  useEffect( () => {
    if( !places && location ){
      getPlaces(location)
    }
  }, [location] )

  //if there are are places, set the place with the first place, is called everytime 
  //whenever list of places changes
  useEffect( () => {
      const firstResult = !isEmpty(places) && places.length > 0 ? places[0] : null;
      setPlace(firstResult)
  }, [places] )

  // fetches data of particular place, is called everytime whenever place changes
  useEffect( () => {
    if( place ){
      getWeatherData(place)
    }
  }, [place])

  //fetch places based on location
  const getPlaces = useCallback(
    ( location )=> {
      dispatch({
        type: actionTypes.FETCH_PLACES,
        payload: {
          value: location,
          isName: false,
        }
      })
    }, [dispatch]
  )

  //fetch consolidated data based on place
  const getWeatherData = useCallback(
    ( place )=> {
      dispatch({
        type: actionTypes.FETCH_DATA,
        payload: {
          locationID: place && place.woeid
        }
      })
    }, [dispatch]
  );

  return (
    <section className = 'page-container'>
        <main className = 'page-main'>
           <SideBar setLocation = { getPlaces }/>
           <WeatherContent/>
        </main>
        <footer className='page-footer'>
          Made by Nancy
        </footer>
    </section>
  );
}

export default App;
