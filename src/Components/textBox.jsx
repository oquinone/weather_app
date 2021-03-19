import React, { useState } from 'react';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { Input } from '@material-ui/core'
import { Typography } from '@material-ui/core';
import { CardMedia }  from '@material-ui/core';
import Slider from "react-slick";
// import AlertComp from './alert.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './textbox.css'

// import { render } from '@testing-library/react';


const useStyles = makeStyles((theme) => ({
    search:{
        margin: "15px 38% 0px 38%",
        width: "300px",
        backgroundColor: '#F3EC93'
    },
    cards:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignContent: 'space-around',
        width:"90%",
        height: "500px",
        textAlign: 'center',
        backgroundColor: 'transparent',
        margin: 'auto'
    },
    cardContainer:{
        width: "200px",
        border: "none"
    },
    city:{
        fontSize: '21px',
        fontVariant: 'small-caps',
        color: "white",
    },
    description:{
        fontSize:"15"
    },
    humidity:{
        paddingTop: 30,
        fontSize: '20px',
        lineHeight: 0,
        margin: 0,
        color: 'white'
    },
    humidityPercen:{
        color: 'white',
        fontSize: 30,
        fontWeight: "bold",
        margin: 0,
        padding: 0,
    },
    icon:{
        marginTop: 10,
        height: 60,
        width: 100,
        margin: 'auto'
    },
    main:{
        flex: '3 0 auto'
    },
    temp:{
        lineHeight: 0.6,
        fontSize: '50px',
        fontWeight: 'bold',
        color: "white",
        paddingTop: 10,
    },
    F:{
        fontSize: 25
    },
}));

function TextBox(){
    const apiBase = "https://api.openweathermap.org/data/2.5/weather?"
    const apiKey = "48f4742bda635e7e77c5204a0b25a736"
    const apiIcon = "https://openweathermap.org/img/wn"
    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState([])
    const classes = useStyles();
    
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: numSlidesToShow(),
      slidesToScroll: numSlidesToShow(),
      swipe: true,
      beforeChange: function(currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
      },

      afterChange: function(currentSlide) {
        console.log("after change", currentSlide);
      }
    }

    function handleSubmit(p){
        if(p.key === 'Enter'){
            const url = `${apiBase}q=${query}&APPID=${apiKey}`;
            fetch(url)
            .then(res => res.json())
            .then(response => updateHook(response));
        }
    }

    function updateHook(res){
        if(res.cod === 200){
            setWeather([{
                city: res.name,
                country: res.sys.country,
                description: res.weather[0].description,
                feelsLike: res.main.feels_like,
                humidity: res.main.humidity,
                icon: `${apiIcon}/${res.weather[0].icon}@2x.png`,
                key: weather.length,
                pressure: res.main.pressure,
                temp: res.main.temp,
            },...weather]);
            setQuery('');
            console.log(res);
        }
        else{
            setQuery('');
            cityNotFound();
        }
    }

    function getFahrenheit(kelvin){
        return Math.round((((Math.round(kelvin) - 273.15)* 9)/ 5)+ 32);
    }

    function cityNotFound(){
        alert("Whoops! That city doesn't exist.");
        // return <AlertComp/>
    }

    function numSlidesToShow(){
        return (weather.length < 5) ? weather.length : 5; 
    }

    function getCity(e){
        const split = e.split(" ");
        let city = `${split[0]} ${split[1]}`
        return (split.length === 1) ? e : city;
    }
    
    return (
        <div id="weather">
            <div id="search">
                <TextField 
                    className={classes.search} 
                    label="City"  
                    variant="outlined"
                    color="secondary"
                    type="string"
                    value={query}
                    placeholder="ex. Los Angeles"
                    onKeyPress={e => handleSubmit(e)}
                    onChange={e => setQuery(e.target.value)}
                />
            </div>
            <div id="api-data">
                <Slider {...settings}>
                {weather.map(info => (
                <div className={classes.cardContainer}>
                    <Card className={classes.cards} key={info.key}>
                        {/* <CardContent className={classes.main}>
                            <Typography className={classes.city}>
                                {getCity(info.city)}, {info.country}
                            </Typography>
                        </CardContent> */}
                        <CardContent >
                            <Typography className={classes.city}>
                                {getCity(info.city)}, {info.country}
                            </Typography>
                            <Typography className={classes.temp}>
                                {getFahrenheit(info.temp)}<span className={classes.F}>°F</span>
                                <CardMedia
                                    className={classes.icon}
                                    image={info.icon}
                                    title="Weather Icon"
                                />
                                <Typography className={classes.description}>
                                    {info.description}
                                </Typography>
                            </Typography>
                        </CardContent>
                        <CardContent className={classes.shrink}>
                            <Typography className={classes.humidity}>
                                Feels Like °F
                            </Typography>
                            <Typography className={classes.humidityPercen}>
                                {getFahrenheit(info.feelsLike)}
                            </Typography>
                        </CardContent>
                        <CardContent className={classes.shrink}>
                            <Typography className={classes.humidity}>
                                Humidity %
                            </Typography>
                            <Typography className={classes.humidityPercen}>
                                {info.humidity}
                            </Typography>
                        </CardContent>
                        <CardContent className={classes.shrink}>
                            <div>
                                <Typography className={classes.humidity}>
                                    Pressure Pa
                                </Typography>
                                <Typography className={classes.humidityPercen}>
                                    {info.pressure}
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                ))}
                </Slider>
            </div>
        </div>);
}
 
export default TextBox;