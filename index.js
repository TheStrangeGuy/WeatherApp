function getWeatherData(location) {
    const apiKey = "aa17c29dc48c2943219cf52bb1dec823";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherData = {
                temperature: data.main.temp,
                condition: data.weather[0].main,
                iconCode: data.weather[0].icon,
                location: data.name,
            };
            return weatherData;
        })
        .catch(error => {
            console.error(error);
            throw new Error('City not found');
        });
}

function updateUI(weatherData) {
    const temperature = document.querySelector("#temperature");
    const condition = document.querySelector("#condition");
    const location = document.querySelector("#location");
    const weatherIcon = document.querySelector("#weather-icon");

    temperature.textContent = `${weatherData.temperature}°C`;
    condition.textContent = weatherData.condition;
    location.textContent = weatherData.location;

    weatherIcon.style.visibility = 'visible';

    bgvideo(weatherData.condition);

    const iconUrl = `http://openweathermap.org/img/wn/${weatherData.iconCode}.png`;
    weatherIcon.src = iconUrl;
}

function bgvideo(weatherCondition) {
    var video = document.getElementById('background-video');
    var source = document.getElementById('video-source');

    var videoFileName;
    switch (weatherCondition.toLowerCase()) {
        case 'clear':
            videoFileName = 'Videos/sunny.mp4';
            break;
        case 'clouds':
            videoFileName = 'Videos/clouds.mp4';
            break;
        case 'smoke':
            videoFileName = 'Videos/smoke.mp4';
            break;
        case 'rain':
            videoFileName = 'Videos/rain.mp4';
            break;
        case 'snow':
            videoFileName = 'Videos/snow.mp4';
            break;
        case 'storm':
            videoFileName = 'Videos/storm.mp4';
            break;
        case 'mist':
            videoFileName = 'Videos/mist.mp4';
            break;
        default:
            videoFileName = 'Videos/intro.mp4';
    }

    source.src = videoFileName;
    video.load();
}

const searchBtn = document.querySelector("#search-btn");
const searchBar = document.querySelector("#search-bar");

searchBar.addEventListener("input", () => {
});

searchBtn.addEventListener("click", () => {
    const location = searchBar.value;
    getWeatherData(location)
        .then(weatherData => {
            updateUI(weatherData);
        })
        .catch(error => {
            console.error(error); 
            alert('City not found. Please enter a valid location.');
        });
});
