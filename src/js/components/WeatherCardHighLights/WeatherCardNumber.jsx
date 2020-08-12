import React from 'react';
import windIcon from "assets/images/wind.png";
import { humidityBar as HumidityBar } from 'js/components/HumidityBar/HumidityBar';

export const weatherCardNumber = ( props ) => {
    const { title, unit, number, showFigure, showHumidityBar } = props;
    return(
        <article className='card'>
            <div className='card__title'>{ title }</div>
            <div className='card__number'>
                <span>{ number }</span> 
                <span className = 'card__unit'>{ unit }</span>
            </div>
            {
                showFigure &&
                <figcaption className='card__figure'>
                    <span>
                        <img
                            src={windIcon}
                            alt="wind-icon"
                            className="card__icon"
                        />
                    </span>
                    
                    <span>WSW</span>
                </figcaption>
            }
            {
                showHumidityBar &&
                <HumidityBar/>
            }
        </article>
    )
}

weatherCardNumber.defaultProps = {
    showFigure: false,
    showHumidityBar: false
}
