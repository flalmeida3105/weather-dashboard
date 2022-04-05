var getCityLocationElement = document.getElementById("city-location");
var getCurrentCityElement = document.getElementById("current-city");
var searchCityLocation = document.querySelector(".btn");
var getCurrentWeatherConditionsElement = document.querySelector(".current-weather-conditions");
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                var temp = data.current.temp;
                console.log(temp)
                var wind = data.current.wind_speed;
                var humidity = data.current.humidity;
                var uvIndex = data.current.uvi;

                var currentDate = moment().format("(DD/MM/YYYY)");  
                var setCityLocation = getCityLocationElement.value = city + " " + currentDate;
                getCurrentCityElement.innerHTML = setCityLocation;
                    getCurrentWeatherConditionsElement.innerHTML = `
                        <div class="current-weather-conditions">
                            <p>Temperature: <span id="current-temp">${temp}</span></p>
                            <p>Wind: <span id="current-wind">${wind}</span></p>
                            <p>Humidity: <span id="current-humidity">${humidity}</span></p>
                            <p>UV Index: <span id="current-uv">${uvIndex}</span></p>
                        </div>
                    `
                getCityLocationElement.value = '';
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