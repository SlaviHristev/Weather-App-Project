const inputField = document.getElementById('input');
inputField.addEventListener('keypress', getWeather);
import { createElement } from "./createEl.js";
import { createElement2 } from "./createEl.js";
import { clearWeatherInfo } from "./clearPage.js";

async function getWeather(e) {
    //Get the url needed and load the current and upcomming weather

    if (e.key === "Enter") {
        e.preventDefault();
        clearWeatherInfo();

        const currentWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=26b117396f9a48aeb0a164550231809&q=${inputField.value}`;
        const response = await fetch(currentWeatherUrl);
        const data = await response.json();
        console.log(data);

        //destructure the data
        let { current, forecast, location } = data;

        //making city name and condition and attaching it to the DOM
        const containerDiv = createElement('div', { class: 'container' }, null, document.body);
        const currentWeatherDiv = createElement('div', { class: 'box', id: 'currentWeatherDiv' }, null, containerDiv);
        const upcommingDiv = createElement('div', { class: 'box', id: 'upcommingWeatherDiv' }, null, containerDiv);
        const cityNamePel = createElement2('p', { id: 'name', class: 'slideRight' }, location.name + '<br>' + current.condition.text, currentWeatherDiv);

        //making temperature p and attaching it
        const temperaturePel = createElement('p', { id: 'degrees', class: 'slideRight' }, current.temp_c, currentWeatherDiv);

        // making the icon picture and attaching it
        const imgElem = createElement('img', { id: 'icon', class:'fadeIn', src: current.condition.icon }, null, currentWeatherDiv);
        imgElem.style.opacity = 1;

        //making a table about the hourly degrees
        const hourlyTable = createElement('table', { id: 'hourly' }, null, document.body);
        hourlyTable.classList.add('slideRight')
        const tbodyElement = createElement('tbody', { id: 'tbody' }, null, hourlyTable);
        const hours = forecast.forecastday[0].hour;
        hourlyTable.style.display = 'block';

        for (let i = 0; i < hours.length - 2; i += 3) {

            const newTheadEl = createElement('th', {}, hours[i].time, tbodyElement);
            const newTdEl = createElement('td', {}, hours[i].temp_c, newTheadEl);
            const newPicEl = createElement('img', { src: hours[i].condition.icon }, null, newTheadEl);
        }

        //getting the 7 day forecast
        const sevenDayForecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=26b117396f9a48aeb0a164550231809&q=${inputField.value}&days=7`
        const res = await fetch(sevenDayForecastUrl);
        const data2 = await res.json();

        console.log(data2);
        //TO DO: FIX destructuring here!
        let { current2 = data2.current, forecast2 = data2.forecast, location2 = data2.location } = data2;

        //filling the table with content
        const upcommingTableEl = createElement('table', { id: 'upcomming'}, null, upcommingDiv);
        const upcommingTbodyEl = createElement('tbody', { id: 'upcommingBody' }, null, upcommingTableEl);
        upcommingTableEl.classList.add('slideDown');

        for (let i = 0; i < forecast2.forecastday.length; i++) {
            const trEl = createElement('tr', {}, null, upcommingTbodyEl);
            const tdEl = createElement('td', {}, forecast2.forecastday[i].date, trEl);
            const imgTd = createElement('td', {}, null, trEl);
            const imgEl = createElement('img', { src: forecast2.forecastday[i].day.condition.icon }, null, imgTd);
            const infoTdEl = createElement('td', {}, forecast2.forecastday[i].day.condition.text, trEl);
            const tempInfoEl = createElement('td', {}, forecast2.forecastday[i].day.maxtemp_c + '/' + forecast2.forecastday[i].day.condition.text, trEl);
        }
        upcommingTableEl.style.display = 'table';

        //creating conditions for the day table and filling it with data


    }
}

