const inputField = document.getElementById('input');
inputField.addEventListener('keypress', handleKeyPress);

import { createElement } from "./createEl.js";
import { createElement2 } from "./createEl.js";
import { clearWeatherInfo } from "./clearPage.js";
import { fetchUserCity } from "./geolocation.js";



document.addEventListener('DOMContentLoaded', async() =>{
    const curCity = await fetchUserCity();
    const weatherData = await fetchWeatherData(curCity);
    const weatherData2 = await fetchWeatherData2(curCity);
    renderCurrentWeather(weatherData);
    renderSevenDayForecast(weatherData2);
    renderHourlyForecast(weatherData);
    renderConditionsForDay(weatherData);
})


async function handleKeyPress(e) {
    if (e.key === "Enter") {
        
        e.preventDefault();
        clearWeatherInfo();
        const weatherData = await fetchWeatherData(inputField.value);
        const weatherData2 = await fetchWeatherData2(inputField.value);
        console.log(weatherData);
        renderCurrentWeather(weatherData);
        renderSevenDayForecast(weatherData2);
        renderHourlyForecast(weatherData);
        renderConditionsForDay(weatherData);
    }
}

document.querySelector('.citiesNames').addEventListener('click', async (e) =>{
    e.preventDefault();
    clearWeatherInfo();
    const weatherData = await fetchWeatherData(e.target.textContent);
    const weatherData2 = await fetchWeatherData2(e.target.textContent);
    console.log(weatherData);
    renderCurrentWeather(weatherData);
    renderSevenDayForecast(weatherData2);
    renderHourlyForecast(weatherData);
    renderConditionsForDay(weatherData);
})

async function fetchWeatherData(cityName) {
    const currentWeatherUrl = `http://api.weatherapi.com/v1/forecast.json?key=26b117396f9a48aeb0a164550231809&q=${cityName}`;
    const response = await fetch(currentWeatherUrl);
    return await response.json();
}
async function fetchWeatherData2(cityName) {
    const sevenDayForecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=26b117396f9a48aeb0a164550231809&q=${cityName}&days=7`
    const res = await fetch(sevenDayForecastUrl);
    return await res.json();
}

function renderCurrentWeather(data) {
    const containerDiv = createElement('div', { class: 'container' }, null, document.body);
    const currentWeatherDiv = createElement('div', { class: 'box', id: 'currentWeatherDiv' }, null, containerDiv);
    const cityNamePel = createElement2('p', { id: 'name', class: 'slideRight' }, data.location.name + '<br>' + data.current.condition.text, currentWeatherDiv);
    const temperaturePel = createElement('p', { id: 'degrees', class: 'slideRight' }, data.current.temp_c, currentWeatherDiv);
    const imgElem = createElement('img', { id: 'icon', class: 'fadeIn', src: data.current.condition.icon }, null, currentWeatherDiv);
    imgElem.style.opacity = 1;
}

function renderHourlyForecast(data) {
    const hourlyTable = createElement('table', { id: 'hourly' }, null, document.body);
    hourlyTable.classList.add('slideRight');
    const tbodyElement = createElement('tbody', { id: 'tbody' }, null, hourlyTable);
    const hours = data.forecast.forecastday[0].hour;
    hourlyTable.style.display = 'block';

    for (let i = 0; i < hours.length - 2; i += 3) {
        const newTheadEl = createElement('th', {}, hours[i].time, tbodyElement);
        const newTdEl = createElement('td', {}, hours[i].temp_c, newTheadEl);
        const newPicEl = createElement('img', { src: hours[i].condition.icon }, null, newTheadEl);
    }
}

function renderSevenDayForecast(data) {
    const containerDiv = document.querySelector('.container');
    const upcommingDiv = createElement('div', { class: 'box', id: 'upcommingWeatherDiv' }, null, containerDiv);
    const upcommingTableEl = createElement('table', { id: 'upcomming' }, null, upcommingDiv);
    upcommingTableEl.classList.add('slideDown');
    const upcommingTbodyEl = createElement('tbody', { id: 'upcommingBody' }, null, upcommingTableEl);
    const forecast = data.forecast;
    
    for (let i = 0; i < forecast.forecastday.length; i++) {
        const trEl = createElement('tr', {}, null, upcommingTbodyEl);
        const tdEl = createElement('td', {}, forecast.forecastday[i].date, trEl);
        const imgTd = createElement('td', {}, null, trEl);
        const imgEl = createElement('img', { src: forecast.forecastday[i].day.condition.icon }, null, imgTd);
        const infoTdEl = createElement('td', {}, forecast.forecastday[i].day.condition.text, trEl);
        const tempInfoEl = createElement('td', {}, forecast.forecastday[i].day.maxtemp_c + '/' + forecast.forecastday[i].day.condition.text, trEl);
    }
    upcommingTableEl.style.display = 'table';
}

function renderConditionsForDay(data){
    const conditionTable = createElement('table',{id:'conditionsTable',class:'slideUp'},null,document.body);
    const conditionTbodyEl = createElement('tbody',{id:'condTbodyEl'},null,conditionTable);
    
        const condTrowEl1 = createElement('tr',{class:'tr1'},null,conditionTbodyEl);
        const condTheadEl1 = createElement('th',{},'🌡️ Real Feel', condTrowEl1);
        const condTdEl1 = createElement('td',{},data.current.feelslike_c,condTheadEl1);
        const condtThead2 = createElement('th',{},'💨 Wind', condTrowEl1);
        const condTdEl2 = createElement('td', {}, data.current.wind_kph + ' k/ph',condtThead2);
        const forecast = data.forecast;

        const condTrowEl2 = createElement('tr',{class:'tr2'},null,conditionTbodyEl);
        const condTheadEl3 = createElement('th',{},'☔ Chance Of Rain', condTrowEl2);
        const condTdEL3 = createElement('td',{},forecast.forecastday[0].day.daily_chance_of_rain + '%', condTheadEl3);
        const condTheadEl4 = createElement('th',{},'☀️ UV Index', condTrowEl2);
        const condTdEl4 = createElement('td',{},data.current.uv,condTheadEl4);
}
