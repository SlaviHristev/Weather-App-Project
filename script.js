const cityName = document.getElementById('input');
document.getElementById('submitBtn').addEventListener('click',getWeather);
const currentWeatherDiv = document.getElementById('currentWeatherDiv');


async function getWeather(){
    const currentWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=26b117396f9a48aeb0a164550231809&q=${cityName.value}`;

    const response = await fetch(currentWeatherUrl);
    const data = await response.json();
    console.log(data);

    let {current, forecast, location} = data;

    let cityNamePEl = document.createElement('p');
    cityNamePEl.textContent = location.name;
    currentWeatherDiv.appendChild(cityNamePEl)
    
    console.log(location);

}

