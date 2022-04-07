var getCityLocationElement = document.getElementById("city-location");
var getCurrentCityElement = document.querySelector(".current-city");
var searchCityLocation = document.querySelector(".btn");
var getCurrentWeatherConditionsElement = document.querySelector(".current-weather-conditions");
var getForecastInfo = document.querySelector(".future-forecast-info");
var getCityHistoryElement = document.querySelector(".city-history");
var getCity = getCityHistoryElement;
var apiKey = "2721e9284e13e8d9c9f8b97f5cb1de42";

function getCurrentWeather(data) {
    // get city location
    var lat = data[0].lat;
    var lon = data[0].lon;
    var city = data[0].name;
    
    // Format weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=metric&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    // select indexed to be used
                var temp = data.current.temp;
                var wind = data.current.wind_speed;
                var humidity = data.current.humidity;
                var uvIndex = data.current.uvi;
                var currentDate = moment().format("(MM/DD/YYYY)");  
                var futureForecast = '';

                // format UV style based on UV scale good/moderate/bad
                if (uvIndex <= 2) {
                    color = "#3cff00"
                } else if (uvIndex <= 5) {
                    color = "#ffff00"
                } else if (uvIndex <= 7) {
                    color = "#ff7518"
                } else if (uvIndex <= 10) {
                    color = "#ff0000"
                } else {
                    color = "#74018d"
                }

                // loop through data array and create DOM elements for current weather and future forecast
                data.daily.forEach((day, index) => {
                    if(index == 0) {
                        var setCityWeatherImage = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
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
                                        <p>UV Index: <span style="background-color:${color}" id="current-uv">${uvIndex}</span></p>
                                    </div>
                        `
                        getCityLocationElement.value = '';
                    } else if (index <= 5 ) {
                        futureForecast += `
                        <div div class="future-forecast" >
                            <p class="day">${window.moment(day.dt*1000).format("MM/DD/YYYY")}</p>
                            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Weather Icon">
                            <p>Temp: <span id="current-temp">${day.temp.day}&degC</span></p>
                            <p>Wind: <span id="current-wind">${day.wind_speed}km/h</span></p>
                            <p>Humidity: <span id="current-humidity">${day.humidity}%</span></p>
                        </div>
                        `
                    } 
                    
                })
                getForecastInfo.innerHTML = futureForecast;
            });
        } 
    })
    // Load save to local storage
    saveCityHistory(city);
};

function createCityHistoryButtonElement(data) { 
    var city = data[0].name;
    var createButton = document.createElement("button");
    createButton.className = "btn-history";
    createButton.type = "click";
    createButton.innerHTML = city;
    createButton.addEventListener("click", getButtonHistoryClickHandler, data);
    getCity.appendChild(createButton);
};

function getButtonHistoryClickHandler() {
    // gets users's input
    var city = this.innerHTML;
    getButtonClickHandler(city);
}

function getButtonClickHandler(city) {
    // gets users input, either via form or button from history
    var newCity = city
    var getCity = getCityLocationElement.value;

    if (getCity) {
        var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + getCity + "&limit=5&appid=" + apiKey;
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        getCurrentWeather(data);
                        createCityHistoryButtonElement(data);
                    });
                }
            })
    } else {
        var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + newCity + "&limit=5&appid=" + apiKey;
        fetch(apiUrl)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        getCurrentWeather(data);
                    });
                }
            })
    }
};

function saveCityHistory(city) {
    var cityObj = {
        name: city
    }
    var savedHistory = localStorage.getItem("cities");
    savedHistory = JSON.parse(savedHistory);

    if (!savedHistory) {
        savedHistory = [cityObj];
        localStorage.setItem("cities", JSON.stringify(savedHistory));
    } else { 
        savedHistory.push(cityObj);
    }
        var savedHistoryMap = savedHistory.map(findObject => findObject.name);
        var savedHistoryFiltered = savedHistory.filter(({name}, index) => !savedHistoryMap.includes(name, index + 1));    
        localStorage.setItem("cities", JSON.stringify(savedHistoryFiltered));
};

function loadCityHistory() {
 
    var savedHistory = localStorage.getItem("cities");
    savedHistory = JSON.parse(savedHistory);
    console.log("CityObj", savedHistory)

    for (cities in savedHistory) {
        var createButton = document.createElement("button");
        createButton.className = "btn-history";
        createButton.type = "click";
        createButton.innerHTML = savedHistory[cities].name;
        createButton.addEventListener("click", getButtonHistoryClickHandler, savedHistory[cities].name);
        getCity.appendChild(createButton);
    }
}

searchCityLocation.addEventListener("click", getButtonClickHandler);
loadCityHistory();