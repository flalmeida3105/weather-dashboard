var buttonClickHandlerElement = document.getElementById("input-city");

function getCurrentWeather() {
    var apiKey = "44c8c32b855a4d8bf7787b66e726fa3e";
    var lat = "43.6532";
    var lon = "79.3832";
    
    // Format weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                });
            }
        })

}



function getButtonClickHandler(event) {
    var getCity = buttonClickHandlerElement.value;
    console.log(getCity)


}

// getButtonClickHandler()

// getCurrentWeather();