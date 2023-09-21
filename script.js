const inputField = document.getElementById('input');
const currentWeatherDiv = document.getElementById('currentWeatherDiv');
inputField.addEventListener('keypress',getWeather);

async function getWeather(e){
    //Get the url needed and load the current and upcomming weather
    if(e.key === "Enter"){
        e.preventDefault();

    
    const currentWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=26b117396f9a48aeb0a164550231809&q=${inputField.value}`;
    

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
    temperaturePel.textContent = current.temp_c;
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
    
    //getting the 7 day forecast
    const sevenDayForecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=26b117396f9a48aeb0a164550231809&q=${inputField.value}&days=7`
    const res = await fetch(sevenDayForecastUrl);
    const data2 = await res.json();

    console.log(data2);
    //TO DO: FIX destructuring here!
    let { current2 = data2.current, forecast2 = data2.forecast, location2 = data2.location} = data2;

    //filling the table with content
    const upcommingTableEl = document.getElementById('upcomming');
    const upcommingTbodyEl = document.getElementById('upcommingBody');

    for(let i = 0; i < forecast2.forecastday.length; i++){
        let trEl = document.createElement('tr');
        let tdEl = document.createElement('td');
        let imgTd = document.createElement('td');
        let imgEl = document.createElement('img');
        let infoTdEl = document.createElement('td');
        let tempInfoEl = document.createElement('td');

        let maxTemp = forecast2.forecastday[i].day.maxtemp_c;
        let minTemp = forecast2.forecastday[i].day.mintemp_c;
        tempInfoEl.textContent = maxTemp + '/' + minTemp;

        imgEl.src = forecast2.forecastday[i].day.condition.icon;
        infoTdEl.textContent = forecast2.forecastday[i].day.condition.text;
        tdEl.textContent = forecast2.forecastday[i].date;
        imgTd.appendChild(imgEl)
        trEl.appendChild(tdEl);
        trEl.appendChild(imgTd);
        trEl.appendChild(infoTdEl);
        trEl.appendChild(tempInfoEl);
        upcommingTbodyEl.appendChild(trEl);
    }
    upcommingTableEl.style.display = 'table';

    //creating conditions for the day table and filling it with data


    const trOneEl = document.createElement('tr');
    const trTwoEl = document.createElement('tr');
    const realFeelTd = document.createElement('td');
    const windTd = document.createElement('td');
    const rainTd = document.createElement('td');
    const uvTd = document.createElement('td');

    realFeelTd.textContent = current.feelslike_c;
    trOneEl.appendChild(realFeelTd);
    

}
}

