import React from 'react';
import Clear from 'assets/images/Clear.png';
import Hail from "assets/images/Hail.png";
import HeavyCloud from "assets/images/HeavyCloud.png";
import HeavyRain from "assets/images/HeavyRain.png";
import LightCloud from "assets/images/LightCloud.png";
import LightRain from "assets/images/LightRain.png";
import Shower from "assets/images/Shower.png";
import Sleet from "assets/images/Sleet.png";
import Snow from "assets/images/Snow.png";
import Thunderstorm from "assets/images/Thunderstorm.png";



export const weatherIcon = ( { status, iconClassName } ) => {
    let iconSrc = null;
    switch( status ){
        case "sn":
            iconSrc = Snow;
            break;
        case "sl":
            iconSrc = Sleet;
            break;
        case "h":
            iconSrc = Hail;
            break;
        case "t":
            iconSrc = Thunderstorm;
            break;
        case "hr":
            iconSrc = HeavyRain;
            break;
        case "lr":
            iconSrc = LightRain;
            break;
        case "s":
            iconSrc = Shower;
            break;
        case "hc":
            iconSrc = HeavyCloud;
            break;
        case "lc":
            iconSrc = LightCloud;
            break;
        case "c":
            iconSrc = Snow;
            break;

        default:
            iconSrc = Clear;
    }
    return(
        <img src={iconSrc} alt='weather-icon' className = { iconClassName }></img>
    )
}