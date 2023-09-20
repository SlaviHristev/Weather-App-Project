const cityName = document.getElementById('input');
document.getElementById('submitBtn').addEventListener('click',getWeather);
const currentWeatherDiv = document.getElementById('currentWeatherDiv');


async function getWeather(){
    //Get the url needed and load the current and upcomming weather
    const currentWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=26b117396f9a48aeb0a164550231809&q=${cityName.value}`;
    

    const response = await fetch(currentWeatherUrl);
    const data = await response.json();
    console.log(data);

    //destructure the data
    let {current, forecast, location} = data;

    //making city name and condition and attaching it to the DOM
    let cityNamePEl = document.createElement('p');
    cityNamePEl.id = 'name';
    let locationName = location.name;
    let condition = current.condition.text;
    cityNamePEl.innerHTML = locationName + "<br>" + condition;
    currentWeatherDiv.appendChild(cityNamePEl)

    //making temperature p and attaching it
    let temperaturePel = document.createElement('p');
    temperaturePel.id = 'degrees';
    temperaturePel.textContent = current.feelslike_c;
    currentWeatherDiv.appendChild(temperaturePel);

    // making the icon picture and attaching it
    let icon = document.getElementById('icon');
    icon.src = current.condition.icon;
    currentWeatherDiv.appendChild(icon);

    //making a table about the hourly degrees
    let hourlyTable = document.getElementById('hourly');
    let tbodyElement = document.getElementById('tbody')
    const hours = forecast.forecastday[0].hour;
    hourlyTable.style.display = 'block';

        for(let i = 0; i < hours.length - 2; i+=3){
        let newTrForHead = document.createElement('tr');
        let newTheadEl = document.createElement('th');
        let newTdEl = document.createElement('td');
        let newPicEl = document.createElement('img');

        newPicEl.src = hours[i].condition.icon;
        

        newTheadEl.textContent = hours[i].time;
        newTrForHead.appendChild(newTheadEl);
        
        newTdEl.textContent = hours[i].temp_c;
        newTheadEl.appendChild(newTdEl);
        newTheadEl.appendChild(newPicEl)

        tbodyElement.appendChild(newTheadEl);
    }
    console.log(hours);
    
}

