// set an array of all the possible days of the week
const wDay= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

// set an array of all the possible months of the year
const wMonth = ["January","February","March","April",
"May","June","July", "August","September","October","November","December"];

// create an object of icon values based on current conditions
const iconValue = {
    CLEARDAY: 'clear-day',
    CLEARNIGHT: 'clear-night',
    RAIN: 'rain',
    SNOW: 'snow',
    SLEET: 'sleet',
    WIND: 'wind',
    FOG: 'fog',
    CLOUDY: 'cloudy',
    PARTLY_CLOUDY_DAY: 'partly-cloudy-day',
    PARTLY_CLOUDY_NIGHT: 'partly-cloudy-night'
}

// find the latitude and longitude of the user's location
function initGeoLocation(){
    console.log(googleApiKey)


    // use `built-in` browser tool "naviagtor" to locate the lat and long of the user

    if(navigator.geolocation){

        // use a success and fail callback function
        console.log(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(success,fail)
        
    }else{
        alert("Sorry, your browser does not support Geolocation")
    }
}

//success function
function success(position){
    // add api keys here
    // use fetch function to find location
    fetchLocation(googleApiKey, position.coords.latitude, position.coords.longitude);
    fetchWeather(openWeatherApiKey,position.coords.latitude, position.coords.longitude);
}

// fail function
function fail(){
    alert("Sorry, your browser does not support Geolocation")
}

// 'fetch function'
function fetchLocation(key, latitude, longitude){
    // call api from google
    var googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;

    fetch(googleApiLink)
    .then(response => {
        return response.json()
    })
    .then(data => {
        //work  with data
        console.log(data)
        document.getElementById("location").innerHTML = data.results[5].formatted_address;
    })
    .catch( err => {
        throw(`Sorry, an error occured ${err}`);
    })
}

function fetchWeather(key, lat, lon){
    //declare Open Weather API Link
    var openWeatherApiLink = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`

    // fetch Open Weather API link
    fetch(openWeatherApiLink)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data)
        //work with openWeather data
            // all CURRENT weather data
        var resultsHTML = "";
        var tableHTML = "";
        var weatherDescription = data.current.weather[0].description;
        //console.log
        console.log(weatherDescription)
        var temperature = data.current.temp;
        var icon = data.current.weather[0].icon;
        var uvi = data.current.uvi;
        var humidity = data.current.humidity;
        var windSpeed = data.current.wind_speed;
        var ts = new Date(data.current.dt * 1000);
        var forecastDate = `${wDay[ts.getDay()]} ${wMonth[ts.getMonth()]} ${ts.getDate()}`

    })
    .catch(err =>{
        throw(`Sorry, an error ocurred. ${err}`);
    })


    }
    