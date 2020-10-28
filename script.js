"use strict"
const ID = '0c9dd64498525695697df092add69bfb';
const url = `https://api.openweathermap.org/data/2.5/weather?&appid=${ID}&units=metric`;

const body = document.querySelector('body');
const nav = document.createElement('nav');
nav.classList.add('nav');
body.appendChild(nav).innerHTML = `<nav><h1><i class="fas fa-cloud-sun-rain"></i> Weather app</h1></nav>`
const inputContainer = document.createElement('div');
body.appendChild(inputContainer);
inputContainer.classList.add('input-container');
const input = document.createElement('input');
input.placeholder = 'Enter city name here...';
inputContainer.appendChild(input);
const searchBtn = document.createElement('button');
searchBtn.classList.add('search');
inputContainer.appendChild(searchBtn);
const searchText = document.createElement('span');
searchText.classList.add('search-text');
searchBtn.appendChild(searchText).textContent = 'Search';
const loader = document.createElement('span');
searchBtn.appendChild(loader).innerHTML = '<i class="fas fa-spinner"></i>';
loader.classList.add('loader');
const array = [];
const logo = document.createElement('img');




function getCityData(cityName) {

    return fetch(`${url}&q=${cityName}`)

        .then((response) => {
            return response.json();
        })
        .then((json) => {
            console.log(json)
            return showCityData(json);
        })
        .catch((error) => {
            console.log(error);
            return alert('Nothing found. Please, check your city name.'),
                window.location.reload('input');
        })
};



searchBtn.addEventListener('click', (e) => {
    if (array.indexOf(input.value) === -1) {
        array.push(input.value);
        console.log(array);
        return getCityData(input.value), input.value = '';
    } else if (array.indexOf(input.value) >= 0) {
        return alert(`${input.value} is already added!`);
    }
});


function showCityData(data) {

    const cityData = document.createElement('div');
    cityData.classList.add('card-container');
    body.appendChild(cityData);
    const exiteBtn = document.createElement('button');
    exiteBtn.classList.add('exite');
    cityData.appendChild(exiteBtn).textContent = 'X';

    logo.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    exiteBtn.addEventListener('click', (event) => {
        return cityData.remove(), array.pop(),
            console.log('removed');
    });

    return cityData.insertAdjacentHTML('beforeend', `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png"></img>
    
    <h2>${data.name} ${data.sys.country}</h2>
    <p> Temperature: ${data.main.temp} °C</p>
    <p> Description: ${data.weather[0].description}</p>
    <p> Humidity: ${data.main.humidity} %</p>
    <p> Wind speed: ${data.wind.speed} m/s</p> 
    <p> <b>${Date()} </b></p>`)

};


