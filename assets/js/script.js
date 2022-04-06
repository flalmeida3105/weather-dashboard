var getCityLocationElement = document.getElementById("city-location");
var getCurrentCityElement = document.querySelector(".current-city");
var searchCityLocation = document.querySelector(".btn");
var getCurrentWeatherConditionsElement = document.querySelector(".current-weather-conditions");
var getForecastInfo = document.querySelector(".future-forecast-info");
var apiKey = "2721e9284e13e8d9c9f8b97f5cb1de42";

// function getCurrentDate() {
//     // get current date 
//     var currentDate = moment().format("dddd, MMMM Do");
//     return currentDate;
// };

function getCurrentWeather(data) {
    console.log("1", data)
    var lat = data[0].lat;
    var lon = data[0].lon;
    var city = data[0].name;
    console.log(lat, lon, city);

    
    // Format weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=metric&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                var temp = data.current.temp;
                var wind = data.current.wind_speed;
                var humidity = data.current.humidity;
                var uvIndex = data.current.uvi;
                var currentDate = moment().format("(MM/DD/YYYY)");  
                

                var futureForecast = '';
                data.daily.forEach((day, index) => {
                    if(index == 0) {
                        var setCityWeatherImage = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
                        var setCityLocation = getCityLocationElement.value = `
                            <h2 id="current-city-weather">${city} ${currentDate}</h2>
                            <img src='${setCityWeatherImage}' alt="Weather Icon">
                            `
                            getCurrentCityElement.innerHTML = setCityLocation;
                                getCurrentWeatherConditionsElement.innerHTML = `
                                    <div class="current-weather-conditions">
                                        <p>Temperature: <span id="current-temp">${temp}&degC</span></p>
                                        <p>Wind: <span id="current-wind">${wind}km/h</span></p>
                                        <p>Humidity: <span id="current-humidity">${humidity}%</span></p>
                                        <p>UV Index: <span id="current-uv">${uvIndex}</span></p>
                                    </div>
                        `
                        getCityLocationElement.value = '';
                    } else if (index <= 5 ) {
                        futureForecast += `
                        <div div class="future-forecast" >
                            <p class="day">${window.moment(day.dt*1000).format("MM/DD/YYYY")}</p>
                            <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Icon">
                            <p>Temp: <span id="current-temp">${temp}&degC</span></p>
                            <p>Wind: <span id="current-wind">${wind}km/h</span></p>
                            <p>Humidity: <span id="current-humidity">${humidity}%</span></p>
                        </div>
                        `
                    } 
                    
                })
                getForecastInfo.innerHTML = futureForecast;
            });
        } 
    })
};







function getButtonClickHandler() {
    var getCity = getCityLocationElement.value;
    console.log(getCity);

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + getCity + "&limit=5&appid=" + apiKey;
    console.log(apiUrl);

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    getCurrentWeather(data);
                });
            }
        })


    // console.log("This is from Input text: " + apiUrl);
    // getCity;


};

searchCityLocation.addEventListener("click", getButtonClickHandler);

// getButtonClickHandler()

// getCurrentWeather();