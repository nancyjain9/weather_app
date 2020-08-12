
const  WEATHER_API = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/';

//const WEATHER_API = 'https://www.metaweather.com/api/location/';

export async function queryFetchData(params) {
    const { locationID } = params;
    const response = await fetch(`${WEATHER_API}${locationID}`);
    const data = await response.json();
    return data;
}

export async function queryFetchLocation(params) {
    const { value, isName } = params;
    const response = await fetch(
        `${WEATHER_API}search/?${isName ? "query" : "lattlong"}=${value}`
    );
    const data = await response.json();
    return data;
}