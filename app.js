/* // let inputSearch = document.querySelector('.input-search');
// let interfacePanel = document.querySelector('.interface');
// let errorOutput = document.querySelector('.error');

//Funkcja przekazuje parametr do zapytania Ajax
const getWeather = (value) => {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.status === 404) {
            errorOutput.style.display = 'block';
        };
    };
    req.open("GET", `http://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=68bd5f4bb35ae2d156f101f9dfc3a4a0`, true);
    req.send();
    req.onload = function () {
        json = JSON.parse(req.responseText);
        console.log(json);
        // for (let i = 0; i < json.list.length; i += 8) {
        //     console.log(json.list[i]);
        // }
        let city = json.city.name,
            country = json.city.country,
            wind = `${json.list[0].wind.speed} mph`,
            humidity = `${json.list[0].main.humidity}%`,
            temperature = json.list[0].main["temp_max"],
            iconID = json.list[0].weather[0].icon,
            weatherDescription = json.list[0].weather[0].description;
        errorOutput.style.display = 'none';
        print(city, country, wind, humidity, temperature, iconID, weatherDescription);
    };
};

// //Funkcja zamienia wartość kelvina na celcjusza
// const convertKelvinToCelc = kelvin => {
//     return Math.round(kelvin - 273.15);
// };

//Funkcja zabiera value z inputa i przekazuje do funkcji getWeather następnie input jest czyszczony.
// const searchWeather = () => {
//     let inputValue = inputSearch.value;
//     if (!inputValue) {
//         errorOutput.style.display = 'block';
//     } else {
//         inputSearch.value = '';
//         return getWeather(inputValue);
//     };
// };
//Funkcja pobiera aktualny dzień tygodnia w stringu
// const getDay = () => {
//     let j = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     let d = new Date();
//     return j[d.getDay()];
// };

// //Funkcja tworzy ikone - Tu jest problem na początku powinien sprawdzić czy jest w divie img jeśli tak to go usuwa jeśli nie dodaje
// const createIcon = (iconId) => {
//     let icon = document.querySelector('.city-icon');
//     icon.setAttribute('src', `http://openweathermap.org/img/w/${iconId}.png`);
// };
//Funkcja wyświetlająca dane pogody
// const print = (city, country, wind, humidity, celcius, icon, description) => {

//     let cityOutput = document.querySelector('.city-name'),
//         windOutput = document.querySelector('.city-wind'),
//         humidityOutput = document.querySelector('.city-humidity'),
//         celciusOutput = document.querySelector('.city-celcius'),
//         descriptionOutput = document.querySelector('.city-desc');

//     cityOutput.textContent = city + ", " + country;
//     windOutput.textContent = `Wind : ${wind}`;
//     humidityOutput.textContent = `Humidity: ${humidity}`;
//     celciusOutput.innerHTML = `${convertKelvinToCelc(celcius)} &deg; C`;
//     descriptionOutput.textContent = description;

//     document.querySelector('.city-date').textContent = getDay();
//     document.querySelector('.col-middle').style.display = 'block';
//     createIcon(icon);
// };

//Nadłuchiwanie na kliknięcie Enter
document.querySelector('.search-button').addEventListener('click', searchWeather);
inputSearch.addEventListener('click', function () {
    this.placeholder = '';
});

inputSearch.addEventListener('blur', function () {
    this.placeholder = 'Enter the city or country';
}) */







































// printDataForFiveDays() {
//     let counterDays = 0;
//     const j = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const d = new Date();
//     console.log(d.getDay());
//     Elements.daysCome.forEach(el => {
//         counterDays++;
//         el.textContent = j[(d.getDay() + counterDays) % j.length];
//     });
// }