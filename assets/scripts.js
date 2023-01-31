// Assigning API to var to avoid having to paste it every time
var APIKey = "b9db1e7b867c3831419b0050f85dff03";
var city;
var todayWeatherEl = document.getElementById("today-weather");
var cityNameEl = document.getElementById("city-name");
var currentPicEl = document.getElementById("current-pic");
var currentTempEl = document.getElementById("temperature");
var currentHumidity = document.getElementById("humidity");
var currentWindEl = document.getElementById("wind-speed");
var historyEl = document.getElementById("history");
var fivedayEl = document.getElementById("fiveday-header");
let searchHistory= JSON.parse(localStorage.getItem("search")) || [];

// Base url for calling the Current Weather Data API
// The '?' marks teh boundary between the base URL and the query
// The 'q' is the query parameter with teh value following
// Concatenate user input stored in the var 'city'...
// ...and '&' indicating another paramter after the query...
// ...and 'appid=' a further parameter where we will add the API key and...
// finally the APIkey
function getWeather(city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {

            todayWeatherEl.classList.remove("d-none");

            // Parse response to display current weather
            let currentDate = newDate(response.data.dt * 1000);
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            cityNameEl.innerHTML = response.data.name + "(" + month + "/" + day + "/" + year + ") ";
            let weatherIcon = response.data.weather[0].icon;
            currentPicEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + "&#176F";
            currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " mph";
        }
            )};

            // Get the 5 day forecast for city
            let cityID = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
            fetch(forecastQueryURL)
                .then(function (response) {
                    fivedayEl.classList.remove("d-none");

                    // Parse response to display forecast for the next 5 days
                    let forecastEls = document.querySelectorAll(".forecast");
                    for (i = 0; i < forecastEls.length; i++) {
                        forecastEls[i].innerHTML = "";
                        // Calculates the forecastIndex by multiplying the current iteration by 8 and adding 4.
                        // The API's forecast endpoint returns a list of weather data for every 3 hours for a 5 day period. 8 forecasts per day, 8*5=40, so the forecastIndex is calculated to select the correct forecast data for each day.
                        // The data is structured in a way that forecasts are grouped in sets of 8, and the 4th forecast in each set is the forecast for that day's noon. So the 4 is added to select the forecast for noon of that day.
                        let forecastIndex = i * 8 + 4;
                        // creates a newDate object from the unix timestamp of the forecast data at the forecastIndex, specifically the property "list.dt" from 'response.data.list[forecastIndex].dt'
                        let forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                        let forecastDay = forecastDate.getDate();
                        let forecastMonth = forecastDate.getMonth() + 1;
                        let forecastYear = forecastDate.getFullYear();
                        let forecastDateEl = document.createElement("p");
                        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + " / " + forecastYear;
                        forecastEls[i].append(forecastDateEl);

                
                    }
                })
            
