// set an array of all the possible days of the week
const wDay= ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']

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
        navigator.geolocation.getCurrentPosition(success,fail)
    }else{
        alert("Sorry, your browser does not support Geolocation")
    }
}

//success function
function success(position){
    // add api keys here
    console.log(position.cords)

    // use fetch function to find location
    fetchLocation(googleApiKey, position.cords.latitude, position.cords.longitude)  
}

// fail function
function fail(){
    alert("Sorry, your browser does not support Geolocation")
}

// 'fetch function'
function fetchLocation(key, latitude, longitude){
    // call api from google
    var googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(googleApiLink)
    .then(response => {
        return response.json()
    })
    .then(data => {
        //work json with data
        document.getElementById("location").innerHTML = data.results[4].formatted_address;
    })
    .catch( err => {
        throw(`Sorry, an error occured ${err}`);
    })
}