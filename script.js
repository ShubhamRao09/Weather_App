const apiKey = "19f175c397782f927e89a4261b9f3ac5";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchForm = document.querySelector(".navbar .searchbox");
const searchBox = searchForm.querySelector("input[type='search']");
const cityLinks = document.querySelectorAll(".nav-link[data-city]");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod== 404) {
            alert(`Error: ${data.message}`);
            return;
        }
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°c";
        document.getElementById("description").innerHTML = data.weather[0].description;
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("wind").innerHTML = data.wind.speed + " kmph";
        document.getElementById("clouds").innerHTML = data.clouds.all + "%";
        document.getElementById("pressure").innerHTML = data.main.pressure + " hPa";
        document.getElementById("feels-like").innerHTML = Math.round(data.main.feels_like) + "°c";
        document.getElementById("visibility").innerHTML = data.visibility + " m";

    } catch (error) {
        alert("Failed to fetch weather data. Please try again.");
    }
}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const cityName = searchBox.value.trim();
    checkWeather(cityName);
});

document.addEventListener("DOMContentLoaded", function() {
    checkWeather("Nashik");
});

cityLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        const cityName = this.getAttribute("data-city");
        checkWeather(cityName);
    });
});
